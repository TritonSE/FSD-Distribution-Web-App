import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AgencyProfileForm from "../AgencyProfileForm/AgencyProfileForm";

import { isAuthenticated } from "../../auth";

/**
 * Page that contains the agency profile form
 */
class AgencyForm extends Component {
  render() {
    if (!isAuthenticated()) {
      return <Redirect to="login" />
    }

    return (
      <div>
        <AgencyProfileForm />
      </div>
    );
  }
}

export default AgencyForm;
