import React from "react";
import Form from "react-bootstrap/Form";
import Checkbox from "./Checkbox";
import "./formstyle.css";

export default function CheckboxColumn(props) {
  return (
    <div className="checkbox-list-column selection-choice">
      {props.options.map((optionText, index) => {
        return (
          <Checkbox key={index} label={optionText} />
        );
      })}
    </div>
  );
}
