import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from '../../auth';
import { Row, Col } from 'react-bootstrap';
import { getJWT } from "../../auth";

import CalendarView from '../../components/Calendar/CalendarView';
import CalendarToolbar from '../../components/Calendar/CalendarToolbar';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import rrulePlugin from '@fullcalendar/rrule'
import 'bootstrap/dist/css/bootstrap.min.css';
const config = require("../../config");

/**
 * Landing page that contains a calender with corresponding events
 */
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /*
        [
          {
            name: '',
            color: ''
          }
        ]
      */
      distribution: [],
      rescue: [],
      events: [],
      map: {
        "Food": [{
          groupdId: "Steves best",
          title: "Today's Task",
          rrule: {
            freq: "weekly",
            interval: 2,
            byweekday: ['mo', 'we', 'fr'],
            dtstart: '2021-03-08T09:30:00',
            until: '2021-05-20'
          },
          duration: '02:00',
          extendedProps: {
            note: "Here is a note",
            type: 3
          }
        }],
        "The Shock": [{
          groupdId: "The Shock",
          title: "wow another task here",
          startTime: "11:30",
          endTime: "13:30",
          startRecur: "2021-03-28",
          endRecur: "2021-07-20",
          daysOfWeek: ["2", "4", "6"],
          extendedProps: {
            note: "Here is a note",
            type: 4
          }
        }]
      }
    }
    this.updateCalendar = this.updateCalendar.bind(this);
  }

  componentDidMount() {
    fetch(`${config.backend.uri}/agency`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getJWT(),
      }
    })
      .then((response) => {
        response.json().then((data) => {
          if (response.ok) {
            const hsvInterval = 360 / data.agencies.length;
            data.agencies.forEach((agency, index) => {
              const name = agency.tableContent.name;
              const color = `hsl(${index * hsvInterval}, 50%, 50%)`;
              // TODO add agency to retail rescue category

              // add agency to distribution category
              this.setState({
                distribution: [...this.state.distribution, { name: name, color: color }]
              });

              // generate events
              // const days = Object.values(agency.distributionDays);
              // for (let i = 0; i < 7; i++) {
              //   if (days[i]) {
              //     this.setState({
              //       events: [...this.state.events, {
              //         // TODO add distribution/retail rescue to name/group 
              //         groupdId: name,
              //         title: name,
              //         rrule: {
              //           freq: 'weekly',
              //           interval: agency.distributionFrequency,
              //           byweekday: i,
              //           dtstart: new Date(),
              //         },
              //         duration: '02:00',
              //         backgroundColor: color
              //       }]
              //     });
              //   }
              // }
            });
          }
        });
      })
      .catch((error) => console.error(error));
  }

  updateCalendar(agency, checked) {
    const newEvents = this.state.map[agency];

    if (checked) {
      console.log(newEvents);
      this.setState({ events: [].concat(newEvents, this.state.events)});
    } else {
      const toRemoveMap = newEvents.reduce((memo, item) => ({
        ...memo,
        [item]: true
      }), {});

      const filteredArray = this.state.events.filter(x => toRemoveMap[x]);
      this.setState({ events: filteredArray });
    }
  }

  render() {
    if (!isAuthenticated()) {
      return <Redirect to="/login" />
    }

    return (
      <Row>
        <Col lg={2} md={2}>
          <CalendarToolbar
            distribution={this.state.distribution}
            rescue={this.state.rescue}
            updateCalendar={this.updateCalendar}
          />
        </Col>
        <Col>
          <FullCalendar
            plugins={[rrulePlugin, dayGridPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,dayGridWeek,dayGridDay'
            }}
            initialView="dayGridMonth"
            events={this.state.events}
          />
        </Col>
      </Row>
    );
  }
}

export default Home;