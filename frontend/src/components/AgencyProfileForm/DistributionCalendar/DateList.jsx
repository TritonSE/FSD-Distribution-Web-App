import React, { Component } from "react";
import TimeBox from "../../FormComponents/TimeBox";
import "./CalendarStyle.css";
import "../FormStyle.css";

const MONTHS = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Aug",
  "09": "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

/**
 * DateList is the list of user-selected distribution dates in the agency form.
 * It provides time inputs to edit the start time of each date.
 *
 * Expected props:
 * - {Array<String>} dates: list of dates+times in ISO 8601 format
 * ("YYYY-MM-DDThh:mmZ")
 * - {String} stateKey: key to pass into the onChange callback
 * - {Function} onChange: callback for when the user changes a time. Should take
 * a string and an array of strings
 * - {Function} validCheck: callback from the form page to check whether times
 * passed validation, should take a String
 */
class DateList extends Component {
  handleTimeChange = (index, newTime) => {
    const { dates, onChange, stateKey } = this.props;

    let newSelectedDates = dates.slice();
    let newDateString = newSelectedDates[index].slice(0, 11); // YYYY-MM-DDT
    newDateString += `${newTime}Z`;
    newSelectedDates[index] = newDateString;

    onChange(stateKey, newSelectedDates);
  };

  render() {
    const { dates, validCheck, stateKey } = this.props;

    return (
      <div className="form-col-gutter">
        <label className="calendar-label">Custom-Selected Days</label>
        <div className="date-list">
          {dates.map((dateString, index) => (
            <div key={index} className="date-cell">
              <span className="date-text">
                {`${MONTHS[dateString.slice(5, 7)]} ${dateString.slice(8, 10)}`}
              </span>
              <TimeBox
                initialValue={dateString.slice(11, -1)}
                stateKey={index}
                onChange={this.handleTimeChange}
                valid={validCheck(`${stateKey}[${index}]`)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default DateList;
