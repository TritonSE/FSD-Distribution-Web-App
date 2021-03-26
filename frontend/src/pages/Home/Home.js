import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from '../../auth';

import CalendarView from '../../components/Calendar/Calendar';

/**
 * Landing page that contains a calender with corresponding events
 */
class Home extends Component {
  render() {
    if (!isAuthenticated()) {
      return <Redirect to="/login" />
    }

    return (
      <div>
        <CalendarView />
      </div>
    );
  }
}

export default Home;