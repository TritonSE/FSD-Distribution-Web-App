import React, { Component } from "react";
import Dropdown from "./Dropdown";
import RequiredAsterisk from "./RequiredAsterisk";
import "./formstyle.css";

class InputDropdown extends Component {
  onSelect = (index) => {
    const { options, stateKey, onChange } = this.props;
    if (this.props.multiple) {
      const subkey = options[index].subkey;
      const fullKey = stateKey + "." + subkey;
      onChange(fullKey, !options[index].selected);
    } else {
      onChange(stateKey, options[index]);
    }
  };

  groupClass() {
    let groupClass = "form-input";
    if (!this.props.leftmost) {
      groupClass += " form-col-gutter";
    }
    return groupClass;
  }

  render() {
    let dropdown = null;
    if (this.props.multiple) {
      dropdown = (
        <Dropdown
          options={this.props.options.map((item) => {
            return {
              title: item.title,
              selected: item.selected,
            };
          })}
          multiple
          onSelect={this.onSelect}
        />
      );
    } else {
      dropdown = (
        <Dropdown
          options={this.props.options.map((optionName) => {
            return {
              title: optionName,
              selected: optionName === this.props.initial,
            };
          })}
          onSelect={this.onSelect}
        />
      );
    }

    return (
      <div className={this.groupClass()}>
        {this.props.label && (
          <label className="form-input-label">
            {this.props.label}
            <RequiredAsterisk required={this.props.required} />
          </label>
        )}
        {dropdown}
      </div>
    );
  }
}

export default InputDropdown;
