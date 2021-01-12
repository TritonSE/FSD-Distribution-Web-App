import React from "react";
import "./formstyle.css";

/**
 * Header for each section in the agency form.
 * Expected props:
 * - {String} title: title of the section
 */
export default function FormSectionHeader(props) {
  return (
    <h2 className="form-section-title">
      {props.title}
      <div className="form-section-title-underline" />
    </h2>
  );
}
