import React, { Component } from "react";
import "./TimeBoxes.css";

/**
 * TimeBox is a 12-hour time input field (comprised of hour box, minute box, and
 * AM/PM selection).
 *
 * Note: not a controlled component. Sends updates only when the user exits an
 * input box/selects from the dropdown.
 *
 * Expected props:
 * - {String} initialValue: initial time value of the input (format: "hh:mm")
 * - {String} stateKey: key to use in the onChange callback
 * - {Function} onChange: callback to handle input changes, should take a String
 * and a String
 * - {Boolean} valid: whether the initial input value passed validation
 */
class TimeBox extends Component {
  constructor(props) {
    super(props);

    const timeValue = props.initialValue;
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
   * the given time (in 12-hour format); the hour is guaranteed to be either
   * empty or 2 digits (with leading 0 if needed)
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
   * @returns 24-hour time string of format "hh:mm"; hh and mm are each
   * guaranteed to be either empty or 2 digits
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

    if (hour.length === 1) {
      hour = `0${hour}`;
    }
    if (minute.length === 1) {
      minute = `0${minute}`;
    }

    return hour + ":" + minute;
  }

  /**
   * Recalculates state if there is a new time value.
   *
   * @param {Any} prevProps Previous props
   */
  componentDidUpdate(prevProps) {
    const timeValue = this.props.initialValue;
    if (timeValue !== prevProps.initialValue) {
      this.setState(this.buildTimeObject(timeValue));
    }
  }

  /**
   * Handler for changes in the hour/minute input fields in this TimeBox.
   * Updates component state with new value.
   *
   * This function ensures that the new hour/minute value, if nonempty, has
   * numerical value in the correct range for 12-hour time. If not, the change
   * is ignored.
   *
   * @param {String} key Which part of the time to update
   * @param {String} value Updated value
   */
  handleChange = (key, value) => {
    if (key !== "ampm" && value !== "") {
      // get up to first 2 digits at the beginning of value
      let match = value.match(/^[0-9]{1,2}/);
      if (!match) {
        return;
      } // else, match is an array of strings
      value = match[0];

      // make sure numerical value is in range
      // this allows 0 for the hour, even though that's not valid by itself,
      // because it might be a leading 0
      let numVal = parseInt(value);
      if (
        (key === "hour" && numVal > 12) ||
        (key === "minute" && numVal > 59)
      ) {
        return;
      }
    }

    this.setState({ [key]: value });
  };

  /**
   * Processes component state into a 24-hour time string (may be incomplete),
   * and calls the onChange callback.
   */
  sendUpdates = () => {
    const { stateKey, onChange } = this.props;

    let time = { ...this.state };
    if (parseInt(time.hour) === 0) {
      this.setState({ hour: "" }, this.sendUpdates);
    } else {
      onChange(stateKey, this.buildTimeString(time));
    }
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
          onBlur={this.sendUpdates}
        />
        :
        <input
          type="text"
          className={styleClass}
          placeholder="00"
          value={minute}
          onChange={(event) => this.handleChange("minute", event.target.value)}
          onBlur={this.sendUpdates}
        />
        &nbsp;
        <select
          value={ampm}
          onChange={(event) =>
            this.setState({ ampm: event.target.value }, this.sendUpdates)
          }
        >
          <option>AM</option>
          <option>PM</option>
        </select>
      </span>
    );
  }
}

export default TimeBox;
