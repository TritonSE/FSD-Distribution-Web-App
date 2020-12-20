import React from "react";
import Form from "react-bootstrap/Form";
import "./formstyle.css";

export default function CheckboxColumn(props) {
  return (
    <div className="checkbox-list-column selection-choice">
      {props.options.map((optionText, index) => {
        return (
          <Form.Check
            type="checkbox"
            key={index}
            id={optionText}
            label={optionText}
            custom
          />
        );
      })}
    </div>
  );
}
