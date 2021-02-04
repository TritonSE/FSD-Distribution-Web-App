import React, { Component } from "react";

/**
 * IncrementerBox is a custom text field for numerical inputs, with increment/
 * decrement arrow buttons.
 *
 * Expected props:
 * - {String} label: text to display alongside the box
 * - {Number} value: current value in the box (limited to range [0,99])
 * - {Number} index: index to pass into the onChange callback
 * - {Function} onChange: callback to handle input changes, should take a Number
 * and a Number
 */
class IncrementerBox extends Component {
  /**
   * Event handler for when the increment button is clicked.
   */
  handleIncrement = () => {
    const { onChange, index, value } = this.props;
    if (value < 99) {
      onChange(index, value + 1);
    }
  };

  /**
   * Event handler for when the decrement button is clicked.
   */
  handleDecrement = () => {
    const { onChange, index, value } = this.props;
    if (value > 0) {
      onChange(index, value - 1);
    }
  };

  /**
   * Event handler for when the user types directly in the text box. Only allows
   * numbers in the range [0,99] or the empty string as values.
   * @param {SyntheticEvent} event Event object to handle
   */
  handleInputChange = (event) => {
    const { onChange, index } = this.props;
    if (event.target.value === "") {
      onChange(index, "");
    } else {
      const newNumber = parseInt(event.target.value);
      if (!isNaN(newNumber) && isFinite(newNumber)) {
        if (newNumber >= 0 && newNumber <= 99) {
          onChange(index, newNumber);
        }
      }
    }
  };

  render() {
    const { value, label } = this.props;
    return (
      <label className="incrementer-box">
        <div className="incrementer-box-container">
          <input
            type="text"
            className="incrementer-box-input"
            value={value}
            onChange={this.handleInputChange}
          />
          <svg
            className="incrementer-buttons"
            width="7"
            height="16"
            viewBox="0 0 8 16"
            aria-hidden="true"
            focusable="false"
          >
            <polyline
              className="up-button"
              points="0,6 3.5,0 7,6"
              stroke="none"
              onClick={this.handleIncrement}
            />
            <polyline
              className="down-button"
              points="0,10 3.5,16 7,10"
              stroke="none"
              onClick={this.handleDecrement}
            />
          </svg>
        </div>
        <span>{label}</span>
      </label>
    );
  }
}

export default IncrementerBox;
