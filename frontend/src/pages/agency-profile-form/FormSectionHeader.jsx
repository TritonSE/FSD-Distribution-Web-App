import React, { Component } from "react";
import "./formstyle.css";

/**
 * Header for each section in the agency form.
 * Expected props:
 * - {String} title: title of the section
 */
class FormSectionHeader extends Component {
  render() {
    const { title } = this.props;
    return (
      <h2 className="form-section-title">
        {title}
        <div className="form-section-title-underline" />
      </h2>
    );
  }
}

export default FormSectionHeader;
