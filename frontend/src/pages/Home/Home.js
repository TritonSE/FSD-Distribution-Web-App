import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../../auth";
/**
 * Landing page that contains a calender with corresponding events
 */
class Home extends Component {
  render() {
    if (!isAuthenticated()) {
      return <Redirect to="/login" />;
    }

    return (
      <div>
        <h2>Home</h2>
      </div>
    );
  }
}

export default Home;
