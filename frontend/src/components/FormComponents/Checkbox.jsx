import React, { Component } from "react";
import "./Checkboxes.css";
import "./TextStyles.css";

/**
 * Checkbox is a custom checkbox component, including a label. It replaces
 * default browser checkboxes to better match the form style.
 *
 * Expected props:
 * - {Boolean} isChecked: whether it should be currently checked
 * - {String} label: text to display next to the checkbox
 * - {String} stateKey: key to use in the onChange callback
 * - {Function} onChange: callback to handle input changes, should take a
 * String and a Boolean
 */
class Checkbox extends Component {
  /**
   * Callback function to handle toggling the checkbox. Calls onChange with
   * new boolean value.
   */
  onChange = () => {
    const { isChecked, stateKey, onChange } = this.props;
    onChange(stateKey, !isChecked);
  };

  render() {
    return (
      <label className="custom-checkbox">
        <input type="checkbox" onChange={this.onChange} checked={this.props.isChecked} />
        <svg width="23" height="23" viewBox="0 0 23 23" aria-hidden="true" focusable="false">
          <rect
            className="custom-checkbox-bg"
            x="0"
            y="0"
            width="23"
            height="23"
            stroke="#000000"
            strokeWidth="1"
            fill="none"
            rx="2"
            ry="2"
          ></rect>
          <polyline
            className="custom-checkbox-checkmark"
            points="4,12 10,17 20,5"
            stroke="transparent"
            strokeWidth="4"
            fill="none"
          ></polyline>
        </svg>
        <span>{this.props.label}</span>
      </label>
    );
  }
}

export default Checkbox;
