import React, { Component } from "react";
import "./Inputs.css";
import "./LocationBoxes.css";

/**
 *
 */
class LocationBox extends Component {
  /**
   * Event handler for when the user types in the text field. Allows any value
   * (subclasses may want to override this). Passes it up to the form page's
   * callback.
   * @param {SyntheticEvent} event Event object to handle
   */
  onChange = (event) => {
    const { stateKey, onChange } = this.props;
    onChange(stateKey, event.target.value);
  };

  render() {
    const { value, valid } = this.props;

    let className = "location-field";
    if (!valid && valid !== undefined) {
      className += " form-invalid";
    }

    return (
      <span className="location-input">
        <input
          type="text"
          className={className}
          placeholder="Location"
          value={value}
          onChange={this.onChange}
        />
      </span>
    );
  }
}

export default LocationBox;
