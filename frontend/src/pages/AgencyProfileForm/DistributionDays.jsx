import React, { Component } from "react";
import Checkbox from "./Checkbox";
import TimeBox from "./TimeBox";
import RequiredAsterisk from "./RequiredAsterisk";
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
 * - {Function} validCheck: callback from the form page to check whether inputs
 * passed validation, should take a String
 */
class DistributionDays extends Component {
  render() {
    const { values, onChange, validCheck } = this.props;
    return (
      <div className="form-input selection-choice form-col-width">
        <label className="form-input-label">
          Distribution Days and Start Times
          <RequiredAsterisk required={true} />
        </label>
        {values.map((item, index) => (
          <div key={index}>
            <Checkbox
              label={item.title}
              isChecked={item.selected}
              stateKey={item.stateKey}
              onChange={onChange}
            />
            <TimeBox
              value={item.time}
              stateKey={item.timeStateKey}
              onChange={onChange}
              valid={validCheck(`distributionStartTimes.${item.stateKey}`)}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default DistributionDays;
