import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CreateAgencyBtn from "../../components/CreateAgencyBtn/CreateAgencyBtn";

import { isAuthenticated } from "../../auth";

/**
 * Page that contains a table that lists out all the agencies pulled from database
 */
class Agency extends Component {
  render() {
    return ((!isAuthenticated()) ? <Redirect to='login' /> :
      (<div>
        <h2>Agency</h2>
        <CreateAgencyBtn />
      </div>)
    );
  }
}

export default Agency;