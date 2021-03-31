import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from '../../auth';
import { Row, Col } from 'react-bootstrap';
import { getJWT } from "../../auth";

import CalendarView from '../../components/Calendar/CalendarView';
import CalendarToolbar from '../../components/Calendar/CalendarToolbar';
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
      events: []
    }
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
              const days = Object.values(agency.distributionDays);
              for (let i = 0; i < 7; i++) {
                if (days[i]) {
                  this.setState({
                    events: [...this.state.events, {
                      // TODO add distribution/retail rescue to name/group 
                      groupdId: name,
                      title: name,
                      rrule: {
                        freq: 'weekly',
                        interval: agency.distributionFrequency,
                        byweekday: i,
                        dtstart: new Date(),
                      },
                      duration: '02:00',
                      backgroundColor: color
                    }]
                  });
                }
              }
            });
          }
        });
      })
      .catch((error) => console.error(error));
  }

  // updateCalendar(agency, hide) {

  // }

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
          />
        </Col>
        <Col>
          <CalendarView agency="The Shock" visible={false} />
        </Col>
      </Row>
    );
  }
}

export default Home;