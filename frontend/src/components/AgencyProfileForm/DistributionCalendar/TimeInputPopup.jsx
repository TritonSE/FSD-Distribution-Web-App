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
 * Note: not a controlled component.
 *
 * Expected props:
 * - {String} value: initial time value
 * - {Boolean} valid: whether this time failed validation
 * - {Function} onSave: callback for when the user clicks the OK button, should
 * take a String
 * - {Function} onDelete: callback for when the user clicks the delete button,
 * should take no input
 */
class TimeInputPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  handleChange = (key, newValue) => {
    this.setState({ value: newValue });
  };

  handleSave = () => {
    this.props.onSave(this.state.value);
  };

  handleDelete = () => {
    this.props.onDelete();
  };

  render() {
    return (
      <div className="calendar-time-popup">
        <span>
          Start time for custom day:
          <button
            type="button"
            className="delete-button"
            onClick={this.handleDelete}
          >
            <img src={deleteIcon} alt="delete" />
          </button>
        </span>
        <span>
          <TimeBox
            value={this.state.value}
            onChange={this.handleChange}
            valid={this.props.valid}
          />
          <SmallButton text="OK" onClick={this.handleSave} alignRight />
        </span>
      </div>
    );
  }
}

export default TimeInputPopup;
