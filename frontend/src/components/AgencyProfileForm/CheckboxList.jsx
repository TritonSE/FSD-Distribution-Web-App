import React, { Component } from "react";
import { FormRow, FormCol } from "./FormLayout";
import CheckboxColumn from "../FormComponents/CheckboxColumn";

/**
 * CheckboxList is a container for a column or columns of checkboxes as one
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
class CheckboxList extends Component {
  render() {
    const { twoColumns, label, options, onChange } = this.props;

    let listColumns = null;
    if (twoColumns) {
      let numOptions = options.length;
      let midIndex = numOptions / 2; // index of first thing in second column
      if (numOptions % 2 === 1) midIndex++;

      let firstColumnOptions = options.slice(0, midIndex);
      let secondColumnOptions = options.slice(midIndex); // to end
      listColumns = (
        <FormRow>
          <FormCol>
            <CheckboxColumn options={firstColumnOptions} onChange={onChange} />
          </FormCol>
          <FormCol>
            <CheckboxColumn options={secondColumnOptions} onChange={onChange} />
          </FormCol>
        </FormRow>
      );
    } else {
      listColumns = <CheckboxColumn options={options} onChange={onChange} />;
    }

    let labelItem = null;
    if (label) {
      labelItem = <label className="form-input-list-header">{label}</label>;
    }

    return (
      <div className="form-input">
        {labelItem}
        {listColumns}
      </div>
    );
  }
}

export default CheckboxList;
