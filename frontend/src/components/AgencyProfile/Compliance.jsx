import React from "react";
import edit from "./imgs/edit-icon.png";

function Compliance({agency}) {
  return (
    <>
      <div className="agency-category">
        <img id="edit-icon" src={edit} alt="edit"></img>
        <h1 className="category-title">
          COMPLIANCE
        </h1>
        <div className="compliance-wrapper">
          <div className="compliance-col-1">
            <p>
              <strong>Scheduled Next Visit:</strong>
              &nbsp;{agency.scheduledNextVisit}
            </p>
            <p>
              <strong>Date of Most Recent Agreement:</strong>
              &nbsp;{agency.dateOfMostRecentAgreement}
            </p>
            <p>
              <strong>Initial Date of Partnership:</strong>
              &nbsp;{agency.tableContent.dateOfInitialPartnership}
            </p>
          </div>
          <div className="compliance-col-2">
            <p>
              <strong>File Audit:</strong>
              &nbsp;{agency.fileAudit}
            </p>
            <p>
              <strong>Monitored:</strong>
              &nbsp;{agency.monitored}
            </p>
            <p>
              <strong>Food Safety Certification:</strong>
              &nbsp;{agency.foodSafetyCertification}
            </p>
          </div>
        </div>
        <div className="notes-wrapper">
          <strong>Notes:</strong>
        </div>
      </div>
    </>
  )
}

export default Compliance;