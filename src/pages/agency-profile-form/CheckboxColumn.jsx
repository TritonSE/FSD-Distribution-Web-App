import React, { Component } from "react";
import Checkbox from "./Checkbox";
import "./formstyle.css";

/**
 * CheckboxColumn is a container for Checkbox components in a single column.
 * Sets of checkboxes (InputCheckboxList) may come in either one or two of these
 * columns.
 *
 * Expected props:
 * - {Array<Object>} options: list of objects containing data about each
 * checkbox option (title and whether it is currently selected)
 * - {Number} indexBuffer: value to add to indices (accounts for multiple
 * columns)
 * - {Function} onChange: callback to handle input changes, should take a
 * Number
 */

class CheckboxColumn extends Component {
  render() {
    const { indexBuffer, onChange, options } = this.props;
    return (
      <div className="checkbox-list-column selection-choice">
        {options.map((item, index) => {
          return (
            <Checkbox
              key={index}
              label={item.title}
              index={index + indexBuffer}
              isChecked={item.selected}
              onChange={onChange}
            />
          );
        })}
      </div>
    );
  }
}

export default CheckboxColumn;

