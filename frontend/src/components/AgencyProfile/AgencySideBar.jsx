import React from 'react'
import "./AgencyProfile.css";

function AgencySideBar() {
  return (
    <div className="agency-sidebar">
      <div className="header-side-active-container">
        <h3>Main</h3>
      </div>
      <div className="header-side-container">
        <h3>Contacts</h3>
      </div>
      <div className="header-side-container">
        <h3>Compliance</h3>
      </div>
      <div className="header-side-container">
        <h3>Demographics</h3>
      </div>
      <div className="header-side-container">
        <h3>Retail Rescue</h3>
      </div>
      <div className="header-side-container">
        <h3>Tasks</h3>
      </div>
    </div>
  )
}

export default AgencySideBar;