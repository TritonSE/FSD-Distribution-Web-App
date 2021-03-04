import React, { Component } from "react";
import "./FormStyle.css";

/**
 * TimeBox is a time input field (actually multiple boxes - hour, minute, and
 * AM/PM selection).
 *
 * Expected props:
 * - {String} value: current time value of the input (format: "HH:MM AM")
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
   * Returns an object containing the hour, minute, and AM/PM strings from the
   * given time string.
   * @param {String} timeString Time string of format "HH:MM AM"
   */
  buildTimeObject(timeString) {
    const index1 = timeString.indexOf(":");
    const index2 = timeString.indexOf(" ");
    return {
      hour: timeString.slice(0, index1),
      minute: timeString.slice(index1 + 1, index2),
      ampm: timeString.slice(index2 + 1) === "PM" ? "PM" : "AM",
    };
  }

  /**
   * Returns a time string of format "HH:MM AM" using the data from the given
   * object.
   * @param {Object} timeObject Time object like that returned from
   * buildTimeObject()
   */
  buildTimeString(timeObject) {
    return timeObject.hour + ":" + timeObject.minute + " " + timeObject.ampm;
  }

  /**
   * Recalculates state if there is a new time value.
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
   * @param {String} key Which part of the time to update
   * @param {String} value Updated value
   */
  handleChange = (key, value) => {
    const { stateKey, onChange } = this.props;
    if (value.length > 2) {
      value = value.slice(-2); // last 2 chars
    }

    let time = { ...this.state };
    time[key] = value;
    onChange(stateKey, this.buildTimeString(time));
  };

  /**
   * Handler for losing focus in either of the numerical inputs in this TimeBox.
   * Processes the value to ensure it is either empty or a two-digit numerical
   * string. If the value is updated, calls the onChange callback.
   * Note: Do not use this for the AM/PM selection.
   * @param {String} key Which part of the time input lost focus
   * @param {String} value Current value of the input
   */
  handleBlur = (key, value) => {
    if (value === "") {
      return;
    }
    const { stateKey, onChange } = this.props;
    const numVal = parseInt(value);
    if (isNaN(numVal)) {
      // reject values that are not numbers
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
      styleClass += " form-invalid";
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
        />{" "}
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
