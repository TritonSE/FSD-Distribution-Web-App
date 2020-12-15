import React from "react";
import "./formstyle.css";

export default function RequiredAsterisk(props) {
  if (props.required) {
    return <h3 className="form-input-label asterisk"> *</h3>;
  }
  return null;
}
