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
    const { alignRight, symbol, text, onClick } = this.props;

    let buttonClass = "small-button";
    if (alignRight) {
      buttonClass += " align-right";
    }

    return (
      <button type="button" className={buttonClass} onClick={onClick}>
        {symbol && <span className="small-button-text">{symbol + " "}</span>}
        <span className="small-button-text underline">{text}</span>
      </button>
    );
  }
}

export default SmallButton;
