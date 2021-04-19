import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AgencyProfileForm from "../../components/AgencyProfileForm/AgencyProfileForm";

import { isAuthenticated } from "../../auth";

/**
 * Page that contains the agency profile form
 */
class AgencyEditPage extends Component {
  render() {

    
    
    console.log(this.props)
    if (!isAuthenticated()) {
      return <Redirect to="login" />;
    }
    else if (this.props.location.state) {
      const { agencyData, editSection, onEndEditing } = this.props.location.state;
      return (
        <div>
          <AgencyProfileForm agencyData={agencyData} editSection={editSection} onEndEditing={onEndEditing}/>
        </div>
      );
    }
    // Delete later
    else {
      return (
        <div>
          <AgencyProfileForm />
        </div>
      ); 
    }

    
  }
}

export default AgencyEditPage;
