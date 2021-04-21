import React from "react";
import edit from "./imgs/edit-icon.png";
import primaryTab from "./imgs/contact-tab-primary.png";
import secondaryTab from "./imgs/contact-tab-secondary.png";
import AgencyBar from "./AgencyBar";

function Contacts({agency}) {

  let secondContact = (agency.contacts.length > 1) ? agency.contacts[1] : agency.contacts[0];

  return (
    <>
      <div className="agency-category">
        <img id="edit-icon" src={edit} alt="edit"></img>
        <h1 className="category-title">
          CONTACTS
        </h1>
        <div className="contacts-wrapper">
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
              <h3>{secondContact.contact}</h3>
              <p>Secondary Contact | {secondContact.position}</p>
              <p>{secondContact.phoneNumber}</p>
              <p>{secondContact.email}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contacts;
