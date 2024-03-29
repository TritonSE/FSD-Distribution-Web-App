import React, { Component } from "react";
import Dropdown from "./Dropdown";
import RequiredAsterisk from "./RequiredAsterisk";
import "./Inputs.css";
import "./Dropdowns.css";
import "./TextStyles.css";

/**
 * InputDropdown is a container for Dropdown components in the agency form. It
 * handles changes made by the user to the dropdown and passes them up to the
 * form page's callback.
 *
 * Expected props:
 * - {String} label: text to display above the dropdown
 * - {Array<String>} options: a list of strings representing each option
 * - {String} value: the currently selected option (empty string if none)
 * - {String} stateKey: first part of the key to pass into the onChange callback
 * - {Function} onChange: callback to handle input changes, should take a String
 * and a String or Boolean
 * - {Boolean} multiple: whether the dropdown should allow multiple selections
 * - {Boolean} leftmost: determines whether the component will have left padding
 * - {Boolean} required: whether the user is required to make a selection
 * - {Boolean} valid: whether the current input value passed validation
 */
class InputDropdown extends Component {
  /**
   * Callback for handling when the user selects an option. Passes it up to the
   * callback from the form page.
   * @param {Number} index The index of the option that was selected
   */
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

  /**
   * Returns the appropriate CSS class for the component's top-level DOM
   * element.
   */
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
          valid={this.props.valid}
        />
      );
    } else {
      dropdown = (
        <Dropdown
          options={this.props.options.map((optionName) => {
            return {
              title: optionName,
              selected: optionName === this.props.value,
            };
          })}
          onSelect={this.onSelect}
          valid={this.props.valid}
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
