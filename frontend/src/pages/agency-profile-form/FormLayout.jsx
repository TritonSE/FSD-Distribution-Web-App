import React, { Component } from "react";
import "./formstyle.css";

class FormRow extends Component {
  render() {
    return <div className="form-row">{this.props.children}</div>;
  }
}

class FormCol extends Component {
  render() {
    return <div className="form-col">{this.props.children}</div>;
  }
}

export { FormRow, FormCol };
