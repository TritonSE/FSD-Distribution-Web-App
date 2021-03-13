import React, { Component } from "react";
import Checkbox from "./Checkbox";
import "./FormStyle.css";

/**
 * CheckboxColumn is a container for Checkbox components in a single column.
 * Sets of checkboxes (InputCheckboxList) may come in either one or two of these
 * columns.
 *
 * Expected props:
 * - {Array<Object>} options: list of objects containing data about each
 * checkbox option (title, whether it is currently selected, and state key)
 * - {Function} onChange: callback to handle input changes, should take a
 * String and a Boolean
 */

class CheckboxColumn extends Component {
  render() {
    const { onChange, options } = this.props;
    return (
      <div className="checkbox-list-column selection-choice">
        {options.map((item, index) => {
          return (
            <Checkbox
              key={index}
              label={item.title}
              isChecked={item.selected}
              stateKey={item.stateKey}
              onChange={onChange}
            />
          );
        })}
      </div>
    );
  }
}

export default CheckboxColumn;
