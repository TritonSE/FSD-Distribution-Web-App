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
 */
class TimeBox extends Component {
  constructor(props) {
    super(props);

    const timeValue = props.value;
    if (timeValue !== undefined) {
      this.state = this.buildTimeObject(timeValue);
    }
  }

  buildTimeObject(timeString) {
    const index1 = timeString.indexOf(":");
    const index2 = timeString.indexOf(" ");
    return {
      hour: timeString.slice(0, index1),
      minute: timeString.slice(index1 + 1, index2),
      ampm: timeString.slice(index2 + 1),
    };
  }

  componentDidUpdate(prevProps) {
    const timeValue = this.props.value;
    if (timeValue !== prevProps.value) {
      this.setState(this.buildTimeObject(timeValue));
    }
  }

  handleChange = (key, value) => {
    const { stateKey, onChange } = this.props;
    if (value.length > 2) {
      value = value.slice(-2); // last 2 chars
    }

    let time = { ...this.state };
    time[key] = value;
    let timeString = time.hour + ":" + time.minute + " " + time.ampm;
    onChange(stateKey, timeString);
  };

  render() {
    const { hour, minute, ampm } = this.state;
    return (
      <span>
        <input
          type="text"
          className="number-field"
          placeholder="00"
          value={hour}
          onChange={(event) => this.handleChange("hour", event.target.value)}
        />
        :
        <input
          type="text"
          className="number-field"
          placeholder="00"
          value={minute}
          onChange={(event) => this.handleChange("minute", event.target.value)}
        />{" "}
        <select
          value={ampm === "PM" ? "PM" : "AM"}
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
