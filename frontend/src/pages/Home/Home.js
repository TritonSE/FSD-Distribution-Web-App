import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import rrulePlugin from "@fullcalendar/rrule";
import interactionPlugin from "@fullcalendar/interaction";
import NotesModal from "../../components/Calendar/NotesModal";
import { getJWT, isAuthenticated } from "../../auth";
import CalendarToolbar from "../../components/Calendar/CalendarToolbar";
import "./Home.css";
import { BACKEND_URL } from "../../config";
/**
 * Landing page that contains a calender with corresponding events from the side toolbar.
 *
 * State:
 * - {Array<Objects>} distribution: list of agencies in the distribution category, contains name and color
 * - {Array<Objects>} rescue: list of agencies in the rescue category, contains name and color
 * - {Array<Objects>} distributionEvents: list of events containing the criteria and rules for rendering distribution
 *                    events on the calendar; will be populated by events mapped from distributionMap
 * - {Array<Objects>} rescueEvents: list of events containing the criteria and rules for rendering rescue events
 *                    on the calendar; will be populated by events mapped from rescueMap
 * - {Hashmap} distributionMap: hashmap that maps the distribution agency name to a set of events containing the criteria
 *             and rules for calendar rendering
 * - {Hashmap} rescueMap: hashmap that maps the rescue agency name to a set of events containing the criteria
 *             and rules for calendar rendering
 */
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      distribution: [], // Example: [{color: "", name: ""}, {color: "", name: ""}]
      rescue: [],
      distributionEvents: [], // Example: [{}, {}, {}]
      rescueEvents: [],
      distributionMap: {}, // Example: {"Agency" : [{}, {}, {}]}
      rescueMap: {},
      showModal: false,
      selectedEvent: undefined,
      agencyId: undefined,
    };
    this.updateDistributionAll = this.updateDistributionAll.bind(this);
    this.updateDistribution = this.updateDistribution.bind(this);
    this.updateRescueAll = this.updateRescueAll.bind(this);
    this.updateRescue = this.updateRescue.bind(this);
  }

  /**
   * Fetches all agencies from the database that will be used to populate the state
   */
  componentDidMount() {
    if (!this.props.testData) {
      const authorizationToken = `Bearer ${getJWT()}`;
      fetch(`${BACKEND_URL}/agency`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
      })
        .then((response) => {
          response.json().then((data) => {
            if (response.ok) {
              this.populateEvents(data);
            }
          });
        })
        .catch((error) => console.error(error));
    } else {
      this.populateEvents(this.props.testData);
    }
  }

  populateEvents(data) {
    const { agencies } = data;
    const hsvInterval = 360 / agencies.length;
    agencies.forEach((agency, index) => {
      const { name } = agency.tableContent;
      // generating the color of the agency
      const color = `hsl(${index * hsvInterval}, 50%, 70%)`;

      // add agency to distribution category
      this.setState((prevState) => ({
        distribution: [...prevState.distribution, { name, color }],
      }));

      // generate events to populate the distribution map
      for (const [day, isMarked] of Object.entries(agency.distributionDays)) {
        if (day !== "_id" && isMarked) {
          const event = {
            title: name,
            rrule: {
              freq: "weekly",
              interval: agency.distributionFrequency,
              byweekday: day.substring(0, 2),
              wkst: day.substring(0, 2),
              dtstart: agency.distributionStartTimes[day], // the day this was created at the start time
            },
            duration: "02:00",
            color,
            distribution: "D",
            retailrescue: "",
            agencyID: agency._id,
            recurringID: `${agency._id}${agency.distributionStartTimes[day]}${day.substring(
              0,
              2
            )}D`,
            exdate: agency.userExcludedDDates,
            exrule: {
              freq: "weekly",
              interval: agency.distributionFrequency,
              byweekday: day.substring(0, 2),
              wkst: day.substring(0, 2),
              dtstart: agency.distributionExcludedTimes[day],
            },
          };

          if (this.state.distributionMap[name]) {
            // Agency already exists in distribution map
            this.state.distributionMap[name].push(event);
          } else {
            // Agency does not yet exist in distribution map
            this.state.distributionMap[name] = [event];
          }
        }
      }

      // adding user selected dates for the agency
      for (const day of agency.userSelectedDates) {
        const event = {
          title: name,
          start: day,
          end: day,
          duration: "02:00",
          color,
          distribution: "D",
          retailrescue: "",
          agencyID: agency._id,
          recurringID: "",
        };

        if (this.state.distributionMap[name]) {
          // Agency exists in distribution map
          this.state.distributionMap[name].push(event);
        } else {
          // Agency does not yet exist in distribution map
          this.state.distributionMap[name] = [event];
        }
      }

      // generate events to populate the rescue map
      for (const [day, isMarked] of Object.entries(agency.retailRescueDays)) {
        if (day !== "_id" && isMarked) {
          const event = {
            title: name,
            rrule: {
              freq: "weekly",
              interval: 1,
              byweekday: day.substring(0, 2),
              wkst: day.substring(0, 2),
              dtstart: agency.retailRescueStartTimes[day], // the day this was created at the start time
            },
            duration: "01:00",
            backgroundColor: "#FFFFFF",
            color,
            distribution: "",
            retailrescue: "R",
            agencyID: agency._id,
            recurringID: `${agency._id}${agency.retailRescueStartTimes[day]}${day.substring(
              0,
              2
            )}R`,
            exdate: agency.userExcludedRDates,
            exrule: {
              freq: "weekly",
              interval: 1,
              byweekday: day.substring(0, 2),
              wkst: day.substring(0, 2),
              dtstart: agency.retailRescueExcludedTimes[day],
            },
          };

          if (this.state.rescueMap[name]) {
            // Agency already exists in rescue map
            this.state.rescueMap[name].push(event);
          } else {
            // Agency does not yet exist in rescue map
            this.state.rescueMap[name] = [event];
          }
        }
      }

      // handling agencies without any rescue events
      if (this.state.rescueMap[name]) {
        this.setState((prevState) => ({
          rescue: [
            ...prevState.rescue,
            {
              name,
              color: `hsl(${index * hsvInterval}, 50%, 50%)`,
            },
          ],
        }));
      }
    });
  }

  /**
   * Callback that will be passed onto the calendar toolbar. If true, it will show all events in the distribution field.
   * Otherwise, it will hide all events in the distribution field.
   * @param {Boolean} checked: Boolean determining whether the ALL checkbox in distribution section is checked
   */
  updateDistributionAll(checked) {
    this.setState({ distributionEvents: [] });
    if (checked) {
      let events = [];
      Object.keys(this.state.distributionMap).forEach((agencyName) => {
        events = events.concat(this.state.distributionMap[agencyName]);
      });
      this.setState({ distributionEvents: events });
    }
  }

  /**
   * Callback that will be passed onto the calendar toolbar to handle the rendering of a single distribution event.
   * @param {Object} event: event object containing the information of the selected distribution event
   */
  updateDistribution(event) {
    const { checked } = event.target;
    const agency = event.target.value;
    const newDistributionEvents = this.state.distributionMap[agency];
    if (checked) {
      this.setState((prevState) => ({
        distributionEvents: prevState.distributionEvents.concat(newDistributionEvents),
      }));
    } else {
      const { distributionEvents } = this.state;
      const filteredArray = distributionEvents.filter(
        (distribution) => newDistributionEvents.indexOf(distribution) < 0
      );
      this.setState({ distributionEvents: filteredArray });
    }
  }

  toggleModal = () => {
    this.setState((prevState) => ({ showModal: !prevState.showModal }));
  };

  /**
   * Callback that will be passed onto the calendar toolbar. If true, it will show all events in the rescue field.
   * Otherwise, it will hide all events in the rescue field.
   * @param {Boolean} checked Boolean determining whether the ALL checkbox in rescue section is checked
   */
  updateRescueAll(checked) {
    this.setState({ rescueEvents: [] });
    if (checked) {
      let events = [];
      Object.keys(this.state.rescueMap).forEach((agencyName) => {
        events = events.concat(this.state.rescueMap[agencyName]);
      });
      this.setState({ rescueEvents: events });
    }
  }

  /**
   * Callback that will be passed onto the calendar toolbar to handle the rendering of a single rescue event.
   * @param {Object} event: event object containing the information of the selected rescue event
   */
  updateRescue(event) {
    const { checked } = event.target;
    const agency = event.target.value;
    const newRescueEvents = this.state.rescueMap[agency];
    if (checked) {
      this.setState((prevState) => ({
        rescueEvents: prevState.rescueEvents.concat(newRescueEvents),
      }));
    } else {
      const { rescueEvents } = this.state;
      const filteredArray = rescueEvents.filter((rescue) => newRescueEvents.indexOf(rescue) < 0);
      this.setState({ rescueEvents: filteredArray });
    }
  }

  handleClick = (arg) => {
    this.selectedEvent = arg;
    this.toggleModal();
    this.setState({ selectedEvent: arg });
  };

  render() {
    if (!isAuthenticated() && !this.props.testData) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="home">
        <div style={{ minHeight: Math.ceil((window.screen.height - 185) * 0.76) }}>
          <CalendarToolbar
            distribution={this.state.distribution}
            rescue={this.state.rescue}
            updateDistribution={this.updateDistribution}
            updateDistributionAll={this.updateDistributionAll}
            updateRescue={this.updateRescue}
            updateRescueAll={this.updateRescueAll}
          />
        </div>
        <div className="home-calendar">
          <FullCalendar
            plugins={[rrulePlugin, dayGridPlugin, timeGridPlugin, interactionPlugin]}
            timeZone="utc"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="dayGridMonth"
            eventDisplay="block"
            eventClick={this.handleClick}
            events={this.state.distributionEvents.concat(this.state.rescueEvents)}
            fixedWeekCount={false}
            contentHeight="auto"
          />
        </div>
        <NotesModal
          showModal={this.state.showModal}
          toggleModal={this.toggleModal}
          selectedEvent={this.state.selectedEvent}
          agencyId={this.state.agencyId}
          deleted={this.props.deleted}
          changeDeleted={this.props.changeDeleted}
        />
      </div>
    );
  }
}
