import React, { Component } from "react";
import "./formstyle.css";

class SmallButton extends Component {
  render() {
    return (
      <button
        type="button"
        className="small-button"
        onClick={this.props.onClick}
      >
        <span className="small-button-text">{"+ "}</span>
        <span className="small-button-text underline">{this.props.text}</span>
      </button>
    );
  }
}

export default SmallButton;
