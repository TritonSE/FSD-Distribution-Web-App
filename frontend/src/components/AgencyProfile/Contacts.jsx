import React from "react";
import edit from "./imgs/edit-icon.png";
import primaryTab from "./imgs/contact-tab-primary.png";
import secondaryTab from "./imgs/contact-tab-secondary.png";
import AgencyBar from "./AgencyBar";

/**
 * Functional component for the contacts category
 *
 * @param {*} agency
 * @returns {*} Contacts component
 */
function Contacts({ agency }) {
  /**
   * Function takes in an array of contacts and returns the components for each
   * contact
   *
   * @param {*} contacts
   * @returns {*} Individual contact components
   */
  function displayContacts(contacts) {
    let contactElems = [];
    contacts.map((person, index) => {
      let contactType = "Other";
      let tab = secondaryTab;
      if (index === 0) {
        contactType = "Primary";
        tab = primaryTab;
      }
      if (index === 1) {
        contactType = "Secondary";
      }

      contactElems.push(
        <div className="contact-container">
          <img className="tabs" src={tab} alt="tab"></img>
          <div className={`${contactType.toLowerCase()}-text`}>
            {contactType}
          </div>
          <div
            className={`contact-info-container ${contactType.toLowerCase()}`}
          >
            <h3>{person.contact}</h3>
            <p>
              {contactType} Contact | {person.position}
            </p>
            <p>{person.phoneNumber}</p>
            <p>{person.email}</p>
          </div>
        </div>
      );
    });

    let contactRows = contactElems.reduce((rows, key, index) => {
      return (
        (index % 2 === 0
          ? rows.push([key])
          : rows[rows.length - 1].push(key)) && rows
      );
    }, []);

    let displayedContacts = contactRows.map((elem, index) => {
      if (elem[1]) {
        return (
          <div className="contacts-wrapper">
            {elem[0]}
            {elem[1]}
          </div>
        );
      } else {
        return <div className="contacts-wrapper">{elem[0]}</div>;
      }
    });

    return displayedContacts;
  }

  return (
    <>
      <div className="agency-category">
        <img id="edit-icon" src={edit} alt="edit"></img>
        <h1 className="category-title">CONTACTS</h1>
        {displayContacts(agency.contacts)}
      </div>
    </>
  );
}

export default Contacts;
