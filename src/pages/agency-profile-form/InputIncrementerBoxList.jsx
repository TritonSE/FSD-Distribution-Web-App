import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import IncrementerBoxColumn from "./IncrementerBoxColumn";
import "./formstyle.css";

/**
 * InputIncrementerBoxList is a container for a column or columns of incrementer
 * boxes as one group/set in the agency form. It handles changes made by the
 * user to any of its incrementer boxes, and passes those changes up to the form
 * page's callback.
 *
 * Expected props:
 * - {String} label: label to display above the whole incrementer box group
 * - {Array<Object>} options: list of objects containing data about each
 * numeric option (title, current value, and the sub-key to use in the onChange
 * callback)
 * - {String} stateKey: first part of the key to pass into the onChange callback
 * - {Function} onChange: callback to handle input changes, should take a String
 * and a Number
 * - {Boolean} twoColumns: whether the incrementer box group should be split
 * into two columns
 */
class InputIncrementerBoxList extends Component {
  /**
   * Callback for handling when the user changes a number. Passes it up to
   * the callback from the form page.
   * @param {Number} index Index (in options) of the number that was changed
   */
  onChange = (index, newNumber) => {
    const { options, stateKey, onChange } = this.props;
    const subkey = options[index].subkey;
    const fullKey = stateKey + "." + subkey;
    onChange(fullKey, newNumber);
  };

  render() {
    let listColumns = null;
    if (this.props.twoColumns) {
      let numOptions = this.props.options.length;
      let midIndex = numOptions / 2; // index of first thing in second column
      if (numOptions % 2 === 1) midIndex++;

      let firstColumnOptions = this.props.options.slice(0, midIndex);
      let secondColumnOptions = this.props.options.slice(midIndex); // to end
      listColumns = (
        <Row noGutters={true}>
          <Col xs="auto">
            <IncrementerBoxColumn
              options={firstColumnOptions}
              indexBuffer={0}
              onChange={this.onChange}
            />
          </Col>
          <Col xs="auto">
            <IncrementerBoxColumn
              options={secondColumnOptions}
              indexBuffer={firstColumnOptions.length}
              onChange={this.onChange}
            />
          </Col>
        </Row>
      );
    } else {
      listColumns = (
        <IncrementerBoxColumn
          options={this.props.options}
          indexBuffer={0}
          onChange={this.onChange}
        />
      );
    }

    return (
      <div className="form-input">
        <label className="form-input-list-header">
          <span>{this.props.label + " "}</span>
          <span className="form-input-list-subheader">
            {this.props.subLabel}
          </span>
        </label>
        {listColumns}
      </div>
    );
  }
}

export default InputIncrementerBoxList;
