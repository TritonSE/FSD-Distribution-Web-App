import React from "react";
import Checkbox from "./Checkbox";
import "./formstyle.css";

export default function CheckboxColumn(props) {
  return (
    <div className="checkbox-list-column selection-choice">
      {props.options.map((item, index) => {
        return (
          <Checkbox
            key={index}
            label={item.title}
            index={index + props.indexBuffer}
            isChecked={item.selected}
            onChange={props.onChange}
          />
        );
      })}
    </div>
  );
}
