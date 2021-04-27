import React from "react";
import edit from "./imgs/edit-icon.png";
import checkmark from "./imgs/check-circle-icon.png";
import xmark from "./imgs/x-circle-icon.png";

/**
 * Functional component for the location and distributions category
 *
 * @param {*} agency
 * @returns {*} Location and Distributions component
 */
function LocationAndDistributions({ agency }) {
  const distributionTypes = [
    agency.pantry,
    agency.mealProgram,
    agency.homeboundDeliveryPartner,
    agency.largeScaleDistributionSite,
    agency.residentialFacility,
  ];

  const distDays = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
  ];

  /**
   * Function adds the distribution types to a string if their
   * corresponding bool in the given array is true
   *
   * @param {*} types
   * @returns {string} String of the types
   */
  function displayTypes(types) {
    let displayedStr = "";
    if (types[0]) {
      displayedStr = displayedStr + "Pantry, ";
    }
    if (types[1]) {
      displayedStr = displayedStr + "Meal Program, ";
    }
    if (types[2]) {
      displayedStr = displayedStr + "Homebound Delivery, ";
    }
    if (types[3]) {
      displayedStr = displayedStr + "Large Scale Distribution, ";
    }
    if (types[4]) {
      displayedStr = displayedStr + "Residential Facility, ";
    }
    displayedStr = displayedStr.replace(/,\s*$/, "");
    return displayedStr;
  }

  /**
   * Function returns a checkmark if bool is true, otherwise returns a xmark
   *
   * @param {*} bool
   * @returns {*} Img elem
   */
  function displayCheckMark(bool) {
    if (bool) {
      return <img className="checks" src={checkmark} alt="checkmark"></img>;
    } else {
      return <img className="checks" src={xmark} alt="xmark"></img>;
    }
  }

  return (
    <>
      <div className="agency-category">
        <img id="edit-icon" src={edit} alt="edit"></img>
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
            &nbsp;{displayTypes(distributionTypes)}
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
          <div className="distribution-days-container">
            {distDays.map((day) => {
                return (
                  <div className="distribution-day">
                    <strong>
                      {day.charAt(0).toUpperCase() + day.slice(1)}
                    </strong>
                    <div className="img-check-container">
                      {displayCheckMark(agency.distributionDays[day])}
                    </div>
                  </div>
                );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default LocationAndDistributions;
