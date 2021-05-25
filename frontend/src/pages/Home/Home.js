import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import rrulePlugin from "@fullcalendar/rrule";
import interactionPlugin from "@fullcalendar/interaction";

import { getJWT, isAuthenticated } from "../../auth";
import CalendarToolbar from "../../components/Calendar/CalendarToolbar";
import "./Home.css";

const config = require("../../config");

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
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      distribution: [], // Example: [{color: "", name: ""}, {color: "", name: ""}]
      rescue: [],
      distributionEvents: [], // Example: [{}, {}, {}]
      rescueEvents: [],
      distributionMap: {}, // Example: {"Agency" : [{}, {}, {}]}
      rescueMap: {},
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
    const authorizationToken = `Bearer ${getJWT()}`;
    fetch(`${config.backend.uri}/agency`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorizationToken,
      },
    })
      .then((response) => {
        response.json().then((data) => {
          if (response.ok || this.props.testData) {
            if(this.props.testData) {
              data = this.props.testData;
            }
            const { agencies } = data;
            const hsvInterval = 360 / agencies.length;
            agencies.forEach((agency, index) => {
              const { name } = agency.tableContent;
              // generating the color of the agency
              const color = `hsl(${index * hsvInterval}, 50%, 50%)`;

              // add agency to distribution category
              this.setState(prevState => ({
                distribution: [
                  ...prevState.distribution,
                  { name, color }, 
                ],
              }));

              // generate events to populate the distribution map
              for (const [day, isMarked] of Object.entries(
                agency.distributionDays
              )) {
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
                    exdate: agency.excludedDates,
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
              for (const [day, isMarked] of Object.entries(
                agency.retailRescueDays
              )) {
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
                this.setState(prevState => ({
                  rescue: [
                    ...prevState.rescue,
                    {
                      name,
                      color: `hsl(${index * hsvInterval}, 75%, 75%)`,
                    },
                  ],
                }));
              }
            });
          }
        });
      })
      .catch((error) => console.error(error));
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
      this.setState(prevState => ({
        distributionEvents: prevState.distributionEvents.concat(
          newDistributionEvents
        ),
      }));
    } else {
      const { distributionEvents } = this.state;
      const filteredArray = distributionEvents.filter((distribution) => newDistributionEvents.indexOf(distribution) < 0);
      this.setState({ distributionEvents: filteredArray });
    }
  }

  /**
   * Callback that will be passed onto the calendar toolbar. If true, it will show all events in the rescue field.
   * Otherwise, it will hide all events in the rescue field.
   * @param {Boolean} checked: Boolean determining whether the ALL checkbox in rescue section is checked
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
      this.setState( prevState => ({
        rescueEvents: prevState.rescueEvents.concat(newRescueEvents),
      }));
    } else {
      const { rescueEvents } = this.state
      const filteredArray = rescueEvents.filter((rescue) => newRescueEvents.indexOf(rescue) < 0);
      this.setState({ rescueEvents: filteredArray });
    }
  }

  render() {
    if (!isAuthenticated()) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="home">
        <div
          style={{ minHeight: Math.ceil((window.screen.height - 185) * 0.76) }}
        >
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
            plugins={[
              rrulePlugin,
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
            ]}
            timeZone="local"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="dayGridMonth"
            eventDisplay="block"
            events={this.state.distributionEvents.concat(
              this.state.rescueEvents
            )}
            fixedWeekCount={false}
            contentHeight = "auto"
          />
        </div>
      </div>
    );
  }
}

export default Home;
