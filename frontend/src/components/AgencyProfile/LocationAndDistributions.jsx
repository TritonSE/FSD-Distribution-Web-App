import React from "react";
import EditButton from "./EditButton";

function LocationAndDistributions({ agency, onEdit }) {
  return (
    <>
      <div className="agency-category">
        <EditButton section="location" onClick={onEdit} />
        <h1 className="category-title">LOCATION AND DISTRIBUTION HOURS</h1>
        <div className="region-container">
          <p>
            <strong>Region:</strong>
            &nbsp;{agency.tableContent.region}
          </p>
          <p>
            <strong>San Diego District:</strong>
            &nbsp;{agency.sanDiegoDistrict} | &nbsp;
            <strong>County District:</strong>
            &nbsp;{agency.countyDistrict} | &nbsp;
            <strong>State Assembly District:</strong>
            &nbsp;{agency.stateAssemblyDistrict}
          </p>
          <p>
            <strong>State Senate District:</strong>
            &nbsp;{agency.stateSenateDistrict} | &nbsp;
            <strong>Federal Congressional District:</strong>
            &nbsp;{agency.federalCongressionalDistrict}
          </p>
        </div>
        <div className="address-container">
          <p>
            <strong>Additional Site:</strong>
            &nbsp;
            {agency.additionalAddresses.map((add, index) => {
              if (agency.additionalAddresses.length - 1 <= index) {
                return add + "";
              } else {
                return add + ", ";
              }
            })}
          </p>
          <p>
            <strong>Billing Address and Zipcode:</strong>
            &nbsp;{agency.billingAddress}, {agency.billingZipcode}
          </p>
          <p>
            <strong>Distribution Type:</strong>
            &nbsp;{agency.pantry && !agency.mealProgram && "Pantry"}
            {!agency.pantry && agency.mealProgram && "Meal Program"}
            {agency.pantry && agency.mealProgram && "Pantry, Meal Program"}
          </p>
        </div>
        <div className="distributions-container">
          <div className="distributions-label">
            <p>
              <strong>Distribution Days:</strong>
            </p>
            <p>
              <strong>Frequency: </strong>
              &nbsp;{agency.distributionFrequency}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LocationAndDistributions;
