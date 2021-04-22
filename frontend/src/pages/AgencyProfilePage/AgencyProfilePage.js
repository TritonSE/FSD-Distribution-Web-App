import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AgencyProfile from "../../components/AgencyProfile/AgencyProfile";
import { isAuthenticated } from "../../auth";

/**
 * Page that contains the agency profile page
 */
class AgencyProfilePage extends Component {
  render() {
    if (!isAuthenticated()) {
      return <Redirect to="login" />;
    }
    const { data } = this.props.location;
    return (
      <div>
        <AgencyProfile data={data} />
      </div>
    );
  }
}

export default AgencyProfilePage;
