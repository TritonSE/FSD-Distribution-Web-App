import React, { Component } from "react";
import "./formstyle.css";

class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = { isChecked: props.isChecked };
  }

  onChange = () => {
    const { index, onChange } = this.props;
    this.setState((prevState) => ({
      isChecked: !prevState.isChecked,
    }));
    onChange(index);
  };
  render() {
    return (
      <label className="custom-checkbox">
        <input
          type="checkbox"
          onChange={this.onChange}
          checked={this.props.isChecked}
        />
        <svg
          width="23"
          height="23"
          viewBox="0 0 23 23"
          aria-hidden="true"
          focusable="false"
        >
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
