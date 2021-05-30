import React, { Component } from "react";
import Checkbox from "./Checkbox";
import "./Checkboxes.css";
import "./TextStyles.css";

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
 * - {Boolean} wide: whether this column should expand in width
 */

class CheckboxColumn extends Component {
  render() {
    const { onChange, options, wide } = this.props;
    let className = "checkbox-column selection-choice";
    if (wide) {
      className += " wide";
    }

    return (
      <div className={className}>
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
