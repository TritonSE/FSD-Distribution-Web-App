import React, { Component } from "react";
import { FormRow, FormCol } from "./FormLayout";
import IncrementerBoxColumn from "../FormComponents/IncrementerBoxColumn";

/**
 * IncrementerBoxList is a container for a column or columns of incrementer
 * boxes as one group/set in the agency form. It handles changes made by the
 * user to any of its incrementer boxes, and passes those changes up to the form
 * page's callback.
 *
 * Expected props:
 * - {String} label: label to display above the whole incrementer box group
 * - {String} subLabel: subheading to display
 * - {Array<Object>} options: list of objects containing data about each
 * numeric option (title, current value, and the state key to use in the
 * onChange callback)
 * - {Function} onChange: callback to handle input changes, should take a String
 * and a Number
 * - {Boolean} twoColumns: whether the incrementer box group should be split
 * into two columns
 */
class IncrementerBoxList extends Component {
  render() {
    const { twoColumns, label, subLabel, options, onChange } = this.props;
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
            <IncrementerBoxColumn
              options={firstColumnOptions}
              indexBuffer={0}
              onChange={onChange}
            />
          </FormCol>
          <FormCol>
            <IncrementerBoxColumn
              options={secondColumnOptions}
              indexBuffer={firstColumnOptions.length}
              onChange={onChange}
            />
          </FormCol>
        </FormRow>
      );
    } else {
      listColumns = (
        <IncrementerBoxColumn
          options={options}
          indexBuffer={0}
          onChange={onChange}
        />
      );
    }

    return (
      <div className="form-input">
        <label className="form-input-list-header">
          <span>{label + " "}</span>
          <span className="form-input-list-subheader">{subLabel}</span>
        </label>
        {listColumns}
      </div>
    );
  }
}

export default IncrementerBoxList;
