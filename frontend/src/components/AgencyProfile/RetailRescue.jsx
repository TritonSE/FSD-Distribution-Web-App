import React from "react";
import edit from "./imgs/edit-icon.png";

/**
 * Functional component for the retail rescue category
 *
 * @param {*} agency
 * @returns {*} Retail Rescue component
 */
function RetailRescue({agency}) {
  const days = agency.retailRescueDays;
  const startTimes = agency.retailRescueStartTimes;
  const locations = agency.retailRescueLocations;

  /**
   * Function returns a string that contains data corresponding
   * the the given day if the day's bool is true
   * 
   * @param {*} day
   * @param {*} startTime
   * @param {*} location 
   * @returns {string} String of start time and location
   */
  function displayDay(day, startTime, location) {
    let displayStr = "";
    if(day) {
      displayStr = `${startTime.substring(11,16)}, ${location}`;
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
            &nbsp;{displayDay(days.monday, startTimes.monday, locations.monday)}
          </p>
          <p>
            <strong>Tuesday:</strong>
            &nbsp;{displayDay(days.tuesday, startTimes.tuesday, locations.tuesday)}
          </p>
          <p>
            <strong>Wednesday:</strong>
            &nbsp;{displayDay(days.wednesday, startTimes.wednesday, locations.wednesday)}
          </p>
          <p>
            <strong>Thursday:</strong>
            &nbsp;{displayDay(days.thursday, startTimes.thursday, locations.thursday)}
          </p>
          <p>
            <strong>Friday:</strong>
            &nbsp;{displayDay(days.friday, startTimes.friday, locations.friday)}
          </p>
          <p>
            <strong>Saturday:</strong>
            &nbsp;{displayDay(days.saturday, startTimes.saturday, locations.saturday)}
          </p>
          <p>
            <strong>Sunday:</strong>
            &nbsp;{displayDay(days.sunday, startTimes.sunday, locations.sunday)}
          </p>
        </div>
      </div>
    </>
  );
}

export default RetailRescue;
