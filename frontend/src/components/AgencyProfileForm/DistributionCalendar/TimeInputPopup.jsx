import React, { Component } from "react";
import TimeBox from "../../FormComponents/TimeBox";
import SmallButton from "../SmallButton";
import "./CalendarStyle.css";
import deleteIcon from "./trash-can.svg";

/**
 * TimeInputPopup is the popup box for inputting start times for user-selected
 * dates in the distribution calendar. It also provides a delete button to
 * deselect the date.
 *
 * Expected props:
 * - {String} value: initial time value
 * - {Boolean} valid: whether this time failed validation
 * - {Function} onChange: callback for when the user edits the TimeBox, should
 * take a String
 * - {Function} onDelete: callback for when the user clicks the delete button,
 * should take no arguments
 */
class TimeInputPopup extends Component {
  render() {
    const { value, valid, onChange, onDelete } = this.props;

    return (
      <div className="calendar-time-popup">
        <div>
          Start time for custom day:
          <button type="button" className="delete-button" onClick={onDelete}>
            <img src={deleteIcon} alt="delete" />
          </button>
        </div>
        <TimeBox
          initialValue={value}
          onChange={(key, newValue) => onChange(newValue)}
          valid={valid}
        />
      </div>
    );
  }
}

export default TimeInputPopup;
