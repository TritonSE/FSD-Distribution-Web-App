import React from "react";
import edit from "./imgs/edit-icon.png";
import primaryTab from "./imgs/contact-tab-primary.png";
import secondaryTab from "./imgs/contact-tab-secondary.png";
import AgencyBar from "./AgencyBar";

function Contacts({agency}) {
  return (
    <>
      <div className="agency-category">
      <EditButton section="contacts" agency={agency} />
        <h1 className="category-title">
          CONTACTS
        </h1>
        <div className="contacts-container">
          <div className="primary-container">
            <img className="tabs" src={primaryTab} alt="primaryTab"></img>
            <div className="primary-text">
              Primary
            </div>
            <div className="contact-primary-container">
              <h3>{agency.contacts[0].contact}</h3>
              <p>Primary Contact | {agency.contacts[0].position}</p>
              <p>{agency.contacts[0].phoneNumber}</p>
              <p>{agency.contacts[0].email}</p>
            </div>
          </div>
          <div className="secondary-container">
            <img className="tabs" src={secondaryTab} alt="secondaryTab"></img>
            <div className="secondary-text">
              Secondary
            </div>
            <div className="contact-secondary-container">
              <h3>{agency.contacts[0].contact}</h3>
              <p>Secondary Contact | {agency.contacts[0].position}</p>
              <p>{agency.contacts[0].phoneNumber}</p>
              <p>{agency.contacts[0].email}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contacts;
