import React, { useState } from "react";
import "./AgencyProfile.css";
import DeleteModal from "./DeleteModal";

/**
 * Functional component for the Agency Bar
 *
 * @param {*} agency
 * @returns {*} Agency Bar component
 */
function AgencyBar({ agency }) {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  // test comment
  return (
    <div className="agency-bar">
      <div className="agency-bar-info">
        <p className="agency-bar-title">
          <strong>
            {agency.tableContent.agencyNumber} - {agency.tableContent.name}
          </strong>
          &nbsp;(Partnered since {agency.tableContent.dateOfInitialPartnership})
        </p>
        <p className="agency-p-info">
          <strong>Status:</strong>
          &nbsp;
          <span className={agency.tableContent.status.toLowerCase()}>
            {agency.tableContent.status.toUpperCase()}
          </span>
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
      <button id="agency-delete" onClick={toggleModal}>
        Delete Agency
      </button>
      <DeleteModal
        showModal={showModal}
        toggleModal={toggleModal}
        agencyName={agency.tableContent.name}
        agencyNumber={agency.tableContent.agencyNumber}
        agencyId={agency._id}
      />
    </div>
  );
}

export default AgencyBar;
