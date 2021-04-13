import React, { Component } from "react";
import RequiredAsterisk from "./RequiredAsterisk";
import "./Inputs.css";
import "./TextStyles.css";

/**
 * InputText is a container for text input fields in the agency form. It handles
 * changes made by the user to the text in the field and passes them up to the
 * form page's callback.
 *
 * Expected props:
 * - {String} label: text to display above the input field
 * - {String} value: text currently in the input field
 * - {String} stateKey: key to pass into the onChange callback
 * - {Function} onChange: callback to handle input changes, should take a String
 * and a String
 * - {Boolean} leftmost: determines whether the component will have left padding
 * - {Boolean} required: whether the user is required to make a selection
 * - {Boolean} wide: if true, the input field will be approximately twice as
 * wide as normal
 * - {Boolean} valid: whether the current input value passed validation
 */
class InputText extends Component {
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

  /**
   * Returns the placeholder for the text field. Subclasses may want to override
   * this.
   */
  getPlaceholder() {
    return null;
  }

  render() {
    const { label, value, leftmost, wide, valid } = this.props;
    let groupClass = "form-input";
    if (!leftmost) {
      groupClass += " form-col-gutter";
    }
    let boxClass = "form-input-box selection-choice";
    if (wide) {
      boxClass += " form-input-box-wide";
    }
    if (valid !== undefined && !valid) {
      boxClass += " form-invalid";
    }

    return (
      <div className={groupClass}>
        <label className="form-input-label">
          {label}
          <RequiredAsterisk required={required} />
        </label>
        <input
          type="text"
          className={boxClass}
          placeholder={this.getPlaceholder()}
          value={value}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default InputText;
