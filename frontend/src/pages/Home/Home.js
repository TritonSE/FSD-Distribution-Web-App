import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../../auth";
import { Row, Col } from "react-bootstrap";
import { getJWT } from "../../auth";
import CalendarToolbar from "../../components/Calendar/CalendarToolbar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import rrulePlugin from "@fullcalendar/rrule";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
const config = require("../../config");

/**
 * Landing page that contains a calender with corresponding events
 */
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      distribution: [
        // { name: "Agency A", color: "#fc02db" },
        // { name: "Agency B", color: "#71fc07" },
        // { name: "Agency C", color: "#fc1307" },
      ],
      rescue: [],
      distributionEvents: [{}, {}, {}],
      rescueEvents: [{}, {}],
      distributionMap: {}, // {"Agency" : [{}, {}, {}]}
      rescueMap: {},
    };
    this.updateCalendar = this.updateCalendar.bind(this);
  }

  componentDidMount() {
    fetch(`${config.backend.uri}/agency`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getJWT(),
      },
    })
      .then((response) => {
        response.json().then((data) => {
          if (response.ok) {
            const hsvInterval = 360 / data.agencies.length;
            data.agencies.forEach((agency, index) => {
              const name = agency.tableContent.name;
              const color = `hsl(${index * hsvInterval}, 50%, 50%)`;

              // add agency to distribution category
              this.setState({
                distribution: [
                  ...this.state.distribution,
                  { name: name, color: color },
                ],
              });

              // generate events for distribution
              for (const [day, isMarked] of Object.entries(agency.distributionDays)) {
                if (day != "_id" && isMarked) {
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
                    backgroundColor: color,
                    exdate: agency.excludedDates,
                  };

                  // Agency already exists in map
                  if (this.state.distributionMap[name]) {
                    this.state.distributionMap[name].push(event);
                  } else {
                    // Agency does not yet exist in map
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
                  backgroundColor: color,
                };

                if (this.state.distributionMap[name]) {
                  this.state.distributionMap[name].push(event);
                } else {
                  // Agency does not yet exist in map
                  this.state.distributionMap[name] = [event];
                }
              }

              // generate events for retail rescue
              for (const [day, isMarked] of Object.entries(agency.retailRescueDays)) {
                if (day != "_id" && isMarked) {
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
                    backgroundColor: color,
                  };

                  if (this.state.rescueMap[name]) {
                    this.state.rescueMap[name].push(event);
                  } else {
                    this.state.rescueMap[name] = [event];
                  }
                }
              }

              if (this.state.rescueMap[name]) {
                this.setState({
                  rescue: [
                    ...this.state.rescue,
                    { name: name, color: color },
                  ]
                });
              }
            });
          }
        });
      })
      .catch((error) => console.error(error));
  }

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

  updateDistribution(checked, agency) {
    const newDistributionEvents = this.state.distributionMap[agency];
    if (checked) {
      this.setState({ distributionEvents: this.state.distributionEvents.concat(newDistributionEvents) });
    } else {
      const filteredArray = this.state.distributionEvents.filter((event) => {
        return newDistributionEvents.indexOf(event) < 0;
      });
      this.setState({ distributionEvents: filteredArray });
    }
  }

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

  updateRescue(checked, agency) {
    const newRescueEvents = this.state.rescueMap[agency]; // [{}, {}, {}]
    if (checked) {
      this.setState({ rescueEvents: this.state.rescueEvents.concat(newRescueEvents) });
    } else {
      const filteredArray = this.state.rescueEvents.filter((event) => {
        return newRescueEvents.indexOf(event) < 0;
      });
      this.setState({ rescueEvents: filteredArray });
    }
  }

  // type, agency, checked
  // d, r, da, ra
  updateCalendar(type, agency, checked) {
    switch (type) {
      // toggle all distribution events
      case "da":
        this.setState({ distributionEvents: [] });
        if (checked) {
          let events = [];
          Object.keys(this.state.distributionMap).forEach((agencyName) => {
            events = events.concat(this.state.distributionMap[agencyName]);
          });
          this.setState({ distributionEvents: events });
        }
        break;
      // toggle all retail rescue events
      case "ra":
        this.setState({ rescueEvents: [] });
        if (checked) {
          let events = [];
          Object.keys(this.state.rescueMap).forEach((agencyName) => {
            events = events.concat(this.state.rescueMap[agencyName]);
          });
          this.setState({ rescueEvents: events });
        }
        break;
      // toggle a retail rescue event
      case "r":
        const newRescueEvents = this.state.rescueMap[agency]; // [{}, {}, {}]
        if (checked) {
          this.setState({ rescueEvents: this.state.rescueEvents.concat(newRescueEvents) });
        } else {
          const filteredArray = this.state.rescueEvents.filter((event) => {
            return newRescueEvents.indexOf(event) < 0;
          });
          this.setState({ rescueEvents: filteredArray });
        }
        break;
      // toggle a distribution event
      case "d":
        const newDistributionEvents = this.state.distributionMap[agency];
        if (checked) {
          this.setState({ distributionEvents: this.state.distributionEvents.concat(newDistributionEvents) });
        } else {
          const filteredArray = this.state.distributionEvents.filter((event) => {
            return newDistributionEvents.indexOf(event) < 0;
          });
          this.setState({ distributionEvents: filteredArray });
        }
        break;
      default:
        console.log("broken code");
        break;
    }
  }

  render() {
    if (!isAuthenticated()) {
      return <Redirect to="/login" />;
    }

    return (
      <Row>
        <Col lg={2} md={2}>
          <CalendarToolbar
            distribution={this.state.distribution}
            rescue={this.state.rescue}
            updateCalendar={this.updateCalendar}
            updateDistribution={this.updateDistribution}
            updateDistributionAll={this.updateDistributionAll}
            updateRescue={this.updateRescue}
            updateRescueAll={this.updateRescueAll}
          />
        </Col>
        <Col>
          <div
            style={{
              marginTop: "5vh",
              marginRight: "10vw",
              marginBottom: "15vh",
            }}
          >
            <FullCalendar
              plugins={[rrulePlugin, dayGridPlugin, timeGridPlugin]}
              timeZone="UTC"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              initialView="dayGridMonth"
              eventDisplay="block"
              events={this.state.distributionEvents.concat(this.state.rescueEvents)}
              fixedWeekCount={false}
              allDaySlot={false}
            />
          </div>
        </Col>
      </Row>
    );
  }
}

export default Home;
