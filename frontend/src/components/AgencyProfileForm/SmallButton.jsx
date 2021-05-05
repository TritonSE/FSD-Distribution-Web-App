import React, { Component } from "react";
import "./FormStyle.css";

/**
 * SmallButton represents minor buttons on the agency form, e.g. those attached
 * to the addresses and contacts lists for adding more fields.
 *
 * Expected props:
 * - {String} text: display text of the button
 * - {Function} onClick: event handler for when the button is clicked
 */
class SmallButton extends Component {
  render() {
    let buttonClass = "small-button";
    if (this.props.alignRight) {
      buttonClass += " align-right";
    }

    return (
      <button type="button" className={buttonClass} onClick={this.props.onClick}>
        <span className="small-button-text">{this.props.symbol + " "}</span>
        <span className="small-button-text underline">{this.props.text}</span>
      </button>
    );
  }
}

export default SmallButton;
