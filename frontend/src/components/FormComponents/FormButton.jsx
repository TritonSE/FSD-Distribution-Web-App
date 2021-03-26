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
    const { type } = this.props;
    let className = "form-button-";
    if (type) {
      className += type;
    }
    return className;
  }

  render() {
    const { onClick, title } = this.props;
    return (
      <button type="button" className={this.getClass()} onClick={onClick}>
        {title}
      </button>
    );
  }
}

export default FormButton;
