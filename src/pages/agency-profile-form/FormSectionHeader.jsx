import React from "react";
import "./formstyle.css";

export default function FormSectionHeader(props) {
  return (
    <h2 className="form-section-title">
      {props.title}
      <div className="form-section-title-underline" />
    </h2>
  );
}
