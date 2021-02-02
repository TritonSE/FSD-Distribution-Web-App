import React from 'react';
import { useHistory } from "react-router-dom";
import './CreateAgencyBtn.css'

export default function CreateAgencyBtn() {
    let history = useHistory();
  
    function handleClick() {
      history.push("/create-agency");
    }
  
    return (
      <button type="button" onClick={handleClick}>
        <div className="res-circle"><strong>+</strong></div>
        <span>Create New Agency Profile</span>
      </button>
    );
  }
