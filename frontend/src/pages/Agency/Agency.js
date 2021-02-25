import React, { Component } from 'react';
import CreateAgencyBtn from "../../components/CreateAgencyBtn/CreateAgencyBtn";

/**
 * Page that contains a table that lists out all the agencies pulled from database
 */
class Agency extends Component {
  render() {
    return (
      <div>
        <h2>Agency</h2>
        <CreateAgencyBtn />
      </div>
    );
  }
}

export default Agency;
