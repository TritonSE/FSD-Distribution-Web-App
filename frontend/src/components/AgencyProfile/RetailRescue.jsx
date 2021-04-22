import React from "react";
import edit from "./imgs/edit-icon.png";

/**
 * Functional component for the retail rescue category
 *
 * @param {*} agency
 * @returns {*} Retail Rescue component
 */
function RetailRescue({ agency }) {
  /**
   * Function returns a string that contains data corresponding
   * the the given day if the day's bool is true
   *
   * @param {*} day
   * @returns {string} String of start time and location
   */
  function displayDay(day) {
    let displayStr = "";
    if (day[0]) {
      displayStr = `${day[1].substring(11, 16)}, ${day[2]}`;
    } else {
      displayStr = "N/A";
    }
    return displayStr;
  }

  return (
    <>
      <div className="agency-category">
        <img id="edit-icon" src={edit} alt="edit"></img>
        <h1 className="category-title">RETAIL RESCUE</h1>
        <div className="rescue-wrapper">
          <p>
            <strong>Monday:</strong>
            &nbsp;
            {displayDay([
              agency.retailRescueDays.monday,
              agency.retailRescueStartTimes.monday,
              agency.retailRescueLocations.monday,
            ])}
          </p>
          <p>
            <strong>Tuesday:</strong>
            &nbsp;
            {displayDay([
              agency.retailRescueDays.tuesday,
              agency.retailRescueStartTimes.tuesday,
              agency.retailRescueLocations.tuesday,
            ])}
          </p>
          <p>
            <strong>Wednesday:</strong>
            &nbsp;
            {displayDay([
              agency.retailRescueDays.wednesday,
              agency.retailRescueStartTimes.wednesday,
              agency.retailRescueLocations.wednesday,
            ])}
          </p>
          <p>
            <strong>Thursday:</strong>
            &nbsp;
            {displayDay([
              agency.retailRescueDays.thursday,
              agency.retailRescueStartTimes.thursday,
              agency.retailRescueLocations.thursday,
            ])}
          </p>
          <p>
            <strong>Friday:</strong>
            &nbsp;
            {displayDay([
              agency.retailRescueDays.friday,
              agency.retailRescueStartTimes.friday,
              agency.retailRescueLocations.friday,
            ])}
          </p>
          <p>
            <strong>Saturday:</strong>
            &nbsp;
            {displayDay([
              agency.retailRescueDays.saturday,
              agency.retailRescueStartTimes.saturday,
              agency.retailRescueLocations.saturday,
            ])}
          </p>
          <p>
            <strong>Sunday:</strong>
            &nbsp;
            {displayDay([
              agency.retailRescueDays.sunday,
              agency.retailRescueStartTimes.sunday,
              agency.retailRescueLocations.sunday,
            ])}
          </p>
        </div>
      </div>
    </>
  );
}

export default RetailRescue;
