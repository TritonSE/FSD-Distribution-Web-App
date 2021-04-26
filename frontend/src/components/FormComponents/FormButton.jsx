import React, { Component } from "react";
import "./FormButtons.css";
import "./TextStyles.css";

/**
 * FormButton is a styled button for forms.
 *
 * Expected props:
 * - {String} title: The text on the button
 * - {String} type: The type of the button ("primary", "secondary")
 * - {Function} onClick: handler for when the button is clicked
 */
class FormButton extends Component {
  getClass() {
    const { type, size } = this.props;
    let className = "form-button-";
    if (type) {
      className += type;
    }
    if (size) {
      className += ` form-button-${size}`;
    }
    return className;
  }

  render() {
    const { onClick, title } = this.props;
    return (
      <button
        type="button"
        className={this.getClass()}
        onClick={onClick}
        style={this.props.style}
      >
        {title}
      </button>
    );
  }
}

export default FormButton;
