import React, { Component } from "react";
import TimeBox from "../../FormComponents/TimeBox";
import "./CalendarStyle.css";
import deleteIcon from "./trash-can.svg";

/**
 * TimeInputPopup is the popup box for inputting start times for user-selected
 * dates in the distribution calendar. It also provides a delete button to
 * deselect the date.
 *
 * Expected props:
 * - {String} value: initial time value "hh:mm"
 * - {Boolean} valid: whether this time failed validation
 * - {Boolean} shown: whether this date is focused in the calendar
 * - {Function} onChange: callback for when the user edits the TimeBox, should
 * take a String
 * - {Function} onDelete: callback for when the user clicks the delete button,
 * should take no arguments
 * - {Function} onHide: callback for when the user clicks outside of the
 * TimeBox, should take no arguments
 */
class TimeInputPopup extends Component {
  constructor(props) {
    super(props);

    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidUpdate() {
    setTimeout(() => {
      if (this.props.shown) {
        window.addEventListener("click", this.handleClickOutside);
      } else {
        window.removeEventListener("click", this.handleClickOutside);
      }
    }, 0); // 0 ms delay schedules this add/remove listener for next event loop
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (!event.target.closest(".calendar")) {
      this.props.onHide();
    }
  }

  render() {
    const { value, valid, shown, onChange, onDelete, onHide } = this.props;

    if (!shown) {
      return null;
    }
    return (
      <div className="calendar-time-popup">
        <div>
          Start time for custom day:
          <button
            type="button"
            className="delete-button"
            onClick={() => {
              onHide();
              onDelete();
            }}
          >
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
