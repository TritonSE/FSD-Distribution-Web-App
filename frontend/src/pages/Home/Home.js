import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from '../../auth';
import {Row, Col} from 'react-bootstrap';

import CalendarView from '../../components/Calendar/CalendarView';
import CalendarToolbar from '../../components/Calendar/CalendarToolbar';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Landing page that contains a calender with corresponding events
 */
class Home extends Component {
  render() {
    if (!isAuthenticated()) {
      return <Redirect to="/login" />
    }

    return (
      <Row>
        <Col lg={2} md={2}>
          <CalendarToolbar />
        </Col>
        <Col>
          <CalendarView agency="The Shock" visible={false}/>
        </Col>
      </Row>
    );
  }
}

export default Home;