import React from 'react';
import "./AgencyProfile.css";



function AgencyBar({agency}) {
  function deleteAgency(){
    console.log(agency._id);
    fetch(`http://localhost:8000/agency/${agency._id}`, { method: 'DELETE' }).then(response => response.json()).catch(err => { console.log(err);})
  }
  return (
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
      <button id="agency-delete" onClick={deleteAgency}>Delete Agency</button>
    </div>
  )
}

export default AgencyBar;
