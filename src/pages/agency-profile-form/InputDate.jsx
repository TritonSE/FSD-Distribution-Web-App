import React, { Component } from "react";
import InputText from "./InputText";
import "./formstyle.css";

class InputDate extends InputText {
  getPlaceholder() {
    return "MM/DD/YYYY";
  }
}

export default InputDate;
