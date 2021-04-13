import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from '../../auth';
import { Row, Col } from 'react-bootstrap';
import { getJWT } from "../../auth";
import CalendarToolbar from '../../components/Calendar/CalendarToolbar';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import rrulePlugin from '@fullcalendar/rrule'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'
const config = require("../../config");

/**
 * Landing page that contains a calender with corresponding events
 */
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      distribution: [{name: "Agency A", color: "#fc02db"}, {name: "Agency B", color: "#71fc07"}, {name: "Agency C", color: "#fc1307"}],
      rescue: [],
      events: [],
      map: {
        "Agency A": [{
          groupId: "distribution",
          title: "Agency A",
          rrule: {
            freq: "weekly",
            interval: 1,
            byweekday: ['mo', 'we', 'fr'],
            dtstart: new Date().toISOString(),
          },
          backgroundColor: "#fc02db",
          exdate: ['2021-04-28', '2021-04-19'],
          duration: '02:00',
        }],
        "Agency B": [{
          groupId: "distribution",
          title: "Agency B",
          rrule: {
            freq: "weekly",
            interval: 2,
            byweekday: ['tu', 'th'],
            dtstart: new Date().toISOString(),
          },
          backgroundColor: "#71fc07",
          exdate: ['2021-04-20', '2021-04-29'],
          duration: '02:00',
        }],
        "Agency C": [{
          groupId: "distribution",
          title: "Agency C",
          rrule: {
            freq: "weekly",
            interval: 2,
            byweekday: ['sa', 'su'],
            dtstart: new Date().toISOString(),
          },
          backgroundColor: "#fc1307",
          exdate: ['2021-04-18', '2021-04-24'],
          duration: '02:00',
        }]
      }
    }
    this.updateCalendar = this.updateCalendar.bind(this);
  }

  // componentDidMount() {
  //   fetch(`${config.backend.uri}/agency`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + getJWT(),
  //     }
  //   })
      // .then((response) => {
      //   response.json().then((data) => {
      //     if (response.ok) {
      //       const hsvInterval = 360 / data.agencies.length;
      //       data.agencies.forEach((agency, index) => {
      //         const name = agency.tableContent.name;
      //         const color = `hsl(${index * hsvInterval}, 50%, 50%)`;

      //         // TODO add agency to retail rescue category

      //         // add agency to distribution category
      //         this.setState({
      //           distribution: [...this.state.distribution, { name: name, color: color }]
      //         });

      //         // generate events
      //         const days = Object.values(agency.distributionDays); // {monday: true, tuesday, false}
      //         for (let i = 0; i < 7; i++) {
      //           if (days[i]) {
      //             if (this.state.map[`${name} - distribution`]) {
      //               this.state.map[name].push({
      //                 // TODO add distribution/retail rescue to name/group 
      //                 groupdId: name,
      //                 title: name,
      //                 rrule: {
      //                   freq: 'weekly',
      //                   interval: agency.distributionFrequency,
      //                   byweekday: i,
      //                   dtstart: agency.distributionStartDate, // the day this was created at the start time 
      //                 },
      //                 duration: '02:00',
      //                 backgroundColor: color
      //               });
      //             } else {
      //               this.state.map[name] = [{
      //                 // TODO add distribution/retail rescue to name/group 
      //                 groupdId: name,
      //                 title: name,
      //                 rrule: {
      //                   freq: 'weekly',
      //                   interval: agency.distributionFrequency,
      //                   byweekday: i,
      //                   dtstart: agency.distributionStartDate,
      //                 },
      //                 duration: '02:00',
      //                 backgroundColor: color
      //               }]
      //             }
      //           }
      //         }
      //       });
      //     }
      //   });
      // })
  //     .catch((error) => console.error(error));
  // }

  updateCalendar(agency, checked) {
    switch(agency) {
      case "distribution":
        if (checked) {
          let events = []
          Object.keys(this.state.map).forEach((agencyName) => {
            events = events.concat(this.state.map[agencyName]);
          });
          this.setState({events: events.concat(this.state.events)});
        } else {
          const filteredArray = this.state.events.filter(event => { return !this.state.map[event.title] });
          this.setState({ events: filteredArray });
        }
        break;
      case "rescue":
        if (checked) {

        } else {

        }
        break;
      default:
        const newEvents = this.state.map[agency];
        if (checked) {
          this.setState({ events: [].concat(newEvents, this.state.events) });
        } else {
          const filteredArray = this.state.events.filter(event => { return newEvents.indexOf(event) < 0 });
          this.setState({ events: filteredArray });
        }
        break;
    }
  }

  render() {
    if (!isAuthenticated()) {
      return <Redirect to="/login" />
    }

    return (
      <Row>
        <Col lg={2} md={2} style={{ height: "100%" }}>
            <CalendarToolbar
              distribution={this.state.distribution}
              rescue={this.state.rescue}
              updateCalendar={this.updateCalendar}
            />
        </Col>
        <Col>
          <div style={{ marginTop: "5vh", marginRight: "10vw", marginBottom: "15vh", height: "50%" }}>
            <FullCalendar
              plugins={[rrulePlugin, dayGridPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,dayGridWeek,dayGridDay'
              }}
              initialView="dayGridMonth"
              events={this.state.events}
              expandRows={true}
              fixedWeekCount={false}
            />
          </div>
        </Col>
      </Row>
    );
  }
}

export default Home;