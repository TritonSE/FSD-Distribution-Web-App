import React, { Component } from "react";
import Checkbox from "./Checkbox";
import "./FormStyle.css";

/**
 * DistributionDays encapsulates the set of checkboxes and time inputs
 * corresponding to days of the week in the form distribution section.
 *
 * Expected props:
 * - {Array<Object>} values: list of objects containing data for each day of
 * the week (title, whether it is selected, start time, state key for the
 * selection, and state key for the time)
 * - {Function} onChange: callback from the form page to handle input changes,
 * should take a String and a Boolean or String
 */
class DistributionDays extends Component {
  render() {
    const { values, onChange } = this.props;
    return (
      <div className="form-input selection-choice">
        {values.map((item, index) => (
          <span key={index}>
            <Checkbox
              label={item.title}
              isChecked={item.selected}
              stateKey={item.stateKey}
              onChange={onChange}
            />
          </span>
        ))}
      </div>
    );
  }
}

export default DistributionDays;
