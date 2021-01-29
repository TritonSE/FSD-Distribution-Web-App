import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CheckboxColumn from "./CheckboxColumn";
import "./formstyle.css";

/**
 * InputCheckboxList is a container for a column or columns of checkboxes as one
 * group/set in the agency form. It handles changes made by the user to any of
 * its checkboxes, and passes those changes up to the form page's callback.
 *
 * Expected props:
 * - {String} label: label to display above the whole checkbox group
 * - {Array<Object>} options: list of objects containing data about each
 * checkbox option (title, whether it is currently selected, and the sub-key to
 * use in the onChange callback)
 * - {String} stateKey: first part of the key to pass into the onChange callback
 * - {Function} onChange: callback to handle input changes, should take a String
 * and a Boolean
 * - {Boolean} twoColumns: whether the checkbox group should be split into two
 * columns
 */
class InputCheckboxList extends Component {
  /**
   * Callback for handling when the user toggles a checkbox. Passes it up to
   * the callback from the form page.
   * @param {Number} index Index (in options) of the checkbox that was toggled
   */
  onSelect = (index) => {
    const { options, stateKey, onChange } = this.props;
    const subkey = options[index].subkey;
    const fullKey = stateKey + "." + subkey;
    onChange(fullKey, !options[index].selected);
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
            <CheckboxColumn
              indexBuffer={0}
              options={firstColumnOptions}
              onChange={this.onSelect}
            />
          </Col>
          <Col xs="auto">
            <CheckboxColumn
              indexBuffer={firstColumnOptions.length}
              options={secondColumnOptions}
              onChange={this.onSelect}
            />
          </Col>
        </Row>
      );
    } else {
      listColumns = (
        <CheckboxColumn
          indexBuffer={0}
          options={this.props.options}
          onChange={this.onSelect}
        />
      );
    }

    return (
      <div className="form-input">
        <label className="form-input-list-header">{this.props.label}</label>
        {listColumns}
      </div>
    );
  }
}

export default InputCheckboxList;
