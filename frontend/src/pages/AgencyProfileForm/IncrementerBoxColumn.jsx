import React, { Component } from "react";
import IncrementerBox from "./IncrementerBox";
import "./FormStyle.css";

/**
 * IncrementerBoxColumn is a container for IncrementerBox components in a single
 * column. Sets of checkboxes (InputIncrementerBoxList) may come in either one
 * or two of these columns.
 *
 * Expected props:
 * - {Array<Object>} options: list of objects containing data about each
 * numeric option (title, current value, and state key)
 * - {Function} onChange: callback to handle input changes, should take a
 * String and a Number
 */
class IncrementerBoxColumn extends Component {
  render() {
    return (
      <div className="incrementer-box-list-column selection-choice">
        {this.props.options.map((item, index) => {
          return (
            <IncrementerBox
              key={index}
              label={item.title}
              value={item.value}
              stateKey={item.stateKey}
              onChange={this.props.onChange}
            />
          );
        })}
      </div>
    );
  }
}

export default IncrementerBoxColumn;
