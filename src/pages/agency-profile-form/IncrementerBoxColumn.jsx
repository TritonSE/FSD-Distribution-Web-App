import React, { Component } from "react";
import IncrementerBox from "./IncrementerBox";

/**
 * IncrementerBoxColumn is a container for IncrementerBox components in a single
 * column. Sets of checkboxes (InputIncrementerBoxList) may come in either one
 * or two of these columns.
 *
 * Expected props:
 * - {Array<Object>} options: list of objects containing data about each
 * numeric option (title and current value)
 * - {Number} indexBuffer: value to add to indices (accounts for multiple
 * columns)
 * - {Function} onChange: callback to handle input changes, should take a
 * Number and a Number
 */
class IncrementerBoxColumn extends Component {
  render() {
    return (
      <div className="incrementer-box-list-column selection-choice">
        {this.props.options.map((item, index) => {
          return (
            <IncrementerBox
              key={index}
              index={index + this.props.indexBuffer}
              label={item.title}
              value={item.value}
              onChange={this.props.onChange}
            />
          );
        })}
      </div>
    );
  }
}

export default IncrementerBoxColumn;
