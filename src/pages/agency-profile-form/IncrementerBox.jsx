import React, { Component } from "react";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Container } from "react-bootstrap";

class IncrementerBox extends Component {
  handleIncrement = () => {
    const { onChange, index, value } = this.props;
    if (value < 99) {
      onChange(index, value + 1);
    }
  };

  handleDecrement = () => {
    const { onChange, index, value } = this.props;
    if (value > 0) {
      onChange(index, value - 1);
    }
  };

  handleInputChange = (event) => {
    const { onChange, index } = this.props;
    const newNumber = parseInt(event.target.value);
    if (!isNaN(newNumber) && isFinite(newNumber)) {
      if (newNumber >= 0 && newNumber <= 99) {
        onChange(index, newNumber);
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
