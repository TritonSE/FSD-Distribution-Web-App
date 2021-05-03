import React, { Component } from "react";
import "./TimeBoxes.css";

/**
 * TimeBox is a 24-hour time input field (comprised of hour box and minute box).
 *
 * Expected props:
 * - {String} value: current time value of the input (format: "hh:mm")
 * - {String} stateKey: key to use in the onChange callback
 * - {Function} onChange: callback to handle input changes, should take a String
 * and a String
 * - {Boolean} valid: whether the current input value passed validation
 */
class TimeBox extends Component {
  constructor(props) {
    super(props);

    const timeValue = props.value;
    if (timeValue !== undefined) {
      this.state = this.buildTimeObject(timeValue);
    }
  }

  /**
   * Returns an object representing the given time. The time string may be
   * incomplete or even empty.
   *
   * @param {String} timeString Time string of format "hh:mm" (24-hour)
   * @returns An object with hour, minute, and ampm string fields representing
   * the given time (in 12-hour format)
   */
  buildTimeObject(timeString) {
    const index = timeString.indexOf(":");
    let hour = timeString.slice(0, index);
    let minute = timeString.slice(index + 1);
    let ampm = "AM";

    // convert 24-hour to 12-hour
    if (hour) {
      let hourVal = parseInt(hour);
      if (hourVal === 0) {
        // 00:mm --> 12:mm AM
        hour = "12";
      } else if (hourVal === 12) {
        // 12:mm --> 12:mm PM
        ampm = "PM";
      } else if (hourVal > 12) {
        // (hh>12):mm --> (hh-12):mm PM
        ampm = "PM";
        hour = `${hourVal - 12}`;
        if (hour.length === 1) {
          hour = `0${hour}`;
        }
      } // else, (00<hh<12):mm --> hh:mm AM
    }

    return {
      hour: hour,
      minute: minute,
      ampm: ampm,
    };
  }

  /**
   * Returns a 24-hour time string of format "hh:mm" using the data from the
   * given object. The time object may contain empty strings, but its nonempty
   * fields should follow 12-hour format.
   *
   * @param {Object} timeObject Time object like that returned from
   * buildTimeObject()
   */
  buildTimeString(timeObject) {
    let { hour, minute, ampm } = timeObject;

    // convert 12-hour to 24-hour
    if (hour) {
      let hourVal = parseInt(hour);
      if (ampm === "AM" && hourVal === 12) {
        // 12:mm AM --> 00:mm
        hour = "00";
      } else if (ampm === "PM" && hourVal < 12) {
        // (hh<12):mm PM --> (hh+12):mm
        hour = `${hourVal + 12}`;
      }
    }

    return hour + ":" + minute;
  }

  /**
   * Recalculates state if there is a new time value.
   *
   * @param {Any} prevProps Previous props
   */
  componentDidUpdate(prevProps) {
    const timeValue = this.props.value;
    if (timeValue !== prevProps.value) {
      this.setState(this.buildTimeObject(timeValue));
    }
  }

  /**
   * Handler for changes in any of the input fields in this TimeBox. Assembles a
   * new time string and passes it to the onChange callback.
   *
   * This function ensures that the new hour/minute value, if nonempty, has
   * exactly two numerical digits (adding a leading 0 if needed) and has
   * numerical value in the correct range for 12-hour time. If either of these
   * conditions is not met, the change is ignored.
   *
   * @param {String} key Which part of the time to update
   * @param {String} value Updated value
   */
  handleChange = (key, value) => {
    const { stateKey, onChange } = this.props;

    if (key !== "ampm" && value !== "") {
      // get up to first 2 digits at the beginning of value
      let match = value.match(/^[0-9]{1,2}/);
      if (!match) {
        return;
      } // else, match is an array of strings
      value = match[0];

      // make sure numerical value is in range
      let numVal = parseInt(value);
      if (
        (key === "hour" && numVal > 12) ||
        (key === "minute" && numVal > 59)
      ) {
        return;
      }
    }

    let time = { ...this.state };
    time[key] = value;
    onChange(stateKey, this.buildTimeString(time));
  };

  /**
   * Handler for losing focus in either of the numerical inputs in this TimeBox.
   * Processes the value to ensure it is either empty or a two-digit (nonzero if
   * hour) numerical string. If the value is updated, calls the onChange
   * callback.
   *
   * @param {String} key Which part of the time input lost focus
   * @param {String} value Current value of the input
   */
  handleBlur = (key, value) => {
    if (value === "") {
      return;
    }

    const { stateKey, onChange } = this.props;
    const numVal = parseInt(value);

    if (isNaN(numVal) || (key === "hour" && numVal === 0)) {
      // reject values that are not nonzero numbers
      onChange(stateKey, "");
    } else if (value.length === 1) {
      // prepend a 0 if there's only one digit
      let time = { ...this.state };
      time[key] = "0" + value;
      onChange(stateKey, this.buildTimeString(time));
    }
    // else, no change needed
  };

  render() {
    const { hour, minute, ampm } = this.state;
    const { valid } = this.props;

    let styleClass = "number-field";
    if (valid !== undefined && !valid) {
      styleClass += " number-field-invalid";
    }
    return (
      <span className="time-input">
        <input
          type="text"
          className={styleClass}
          placeholder="00"
          value={hour}
          onChange={(event) => this.handleChange("hour", event.target.value)}
          onBlur={(event) => this.handleBlur("hour", event.target.value)}
        />
        :
        <input
          type="text"
          className={styleClass}
          placeholder="00"
          value={minute}
          onChange={(event) => this.handleChange("minute", event.target.value)}
          onBlur={(event) => this.handleBlur("minute", event.target.value)}
        />
        &nbsp;
        <select
          value={ampm}
          onChange={(event) => this.handleChange("ampm", event.target.value)}
        >
          <option>AM</option>
          <option>PM</option>
        </select>
      </span>
    );
  }
}

export default TimeBox;
