import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import "./AgencyProfile.css";

function AgencyProfile({ data }) {
  const [agency, setAgency] = useState(undefined);

  let history = useHistory();

  useEffect(() => {
    fetch(`http://localhost:8000/agency/${data}`, { method: 'GET' })
    .then(res => res.json())
    .then(agency => {
      setAgency(agency.agency);
    })
    .catch(err => {
      console.log(err);
    });
  }, []);
  
  if (!data) {
    history.push("/agency");
  }
  
  if(agency) {
    return (
      <>
        <div className="agency-bar">
          <div className="agency-bar-info">
            <p className="agency-bar-title">
              <strong>{agency.tableContent.agencyNumber} - {agency.tableContent.name}</strong>
              &nbsp;(Partnered since {agency.tableContent.dateOfInitialPartnership})
            </p>
            <p className="agency-p-info">
              <strong>Status:</strong> 
              &nbsp;<span className={agency.tableContent.status.toLowerCase()}>{agency.tableContent.status.toUpperCase()}</span>
            </p>
            <p className="agency-p-info">
              <strong>Primary Contact:</strong>
              &nbsp;{agency.contacts[0].contact} - {agency.contacts[0].phoneNumber}
            </p>
            <p className="agency-p-info">
              <strong>Main Site:</strong>
              &nbsp;{agency.mainSiteAddress}
            </p>
            <p className="agency-p-info">
              <strong>Assigned Staff:</strong>
              &nbsp;{agency.tableContent.staff}
            </p>
          </div>
          <button id="agency-delete">Delete Agency</button>
        </div>
        <div className="agency-profile">
          <div className="agency-sidebar"></div>
          <div className="agency-profile-info"></div>
        </div>
      </>
    )
  } else {
    return null;
  }

}

export default AgencyProfile;
