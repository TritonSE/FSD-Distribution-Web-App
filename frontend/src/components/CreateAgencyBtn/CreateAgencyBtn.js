import React from 'react';
import { useHistory, Redirect } from "react-router-dom";
import './CreateAgencyBtn.css';

import { isAuthenticated } from '../../auth';

function CreateAgencyBtn() {
  let history = useHistory();
  
  function handleClick() {
    history.push("/create-agency");
  }
  
  return ( (!isAuthenticated()) ? <Redirect to="/login" /> :
    (<button type="button" className="create-agency-btn" onClick={handleClick}>
      <div className="res-circle"><strong>+</strong></div>
      <span>Create New Agency Profile</span>
    </button>)
  );
}

export default CreateAgencyBtn;
