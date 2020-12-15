import React, { Component } from "react";
import "./formstyle.css";

class FormSectionHeader extends Component {
  render() {
    return (
      <div>
        <h2 className="form-section-title">
          {this.props.title}
          <div className="form-section-title-underline" />
        </h2>
      </div>
    );
  }
}

export default FormSectionHeader;
