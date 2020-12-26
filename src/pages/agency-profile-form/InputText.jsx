import React, { Component } from "react";
import RequiredAsterisk from "./RequiredAsterisk";
import "./formstyle.css";

class InputText extends Component {
  onChange = (event) => {
    const { stateKey, onChange } = this.props;
    onChange(stateKey, event.target.value);
  };

  getPlaceholder() {
    return null;
  }

  render() {
    let groupClass = "form-input";
    if (!this.props.leftmost) {
      groupClass += " form-col-gutter";
    }
    let boxClass = "form-input-box selection-choice";
    if (this.props.wide) {
      boxClass += " form-input-box-wide";
    }

    return (
      <div className={groupClass}>
        <label className="form-input-label">
          {this.props.label}
          <RequiredAsterisk required={this.props.required} />
        </label>
        <input
          type="text"
          className={boxClass}
          placeholder={this.getPlaceholder()}
          value={this.props.value}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default InputText;
