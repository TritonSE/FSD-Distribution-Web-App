import React, { Component } from "react";
import Checkbox from "../FormComponents/Checkbox";
import TimeBox from "../FormComponents/TimeBox";
import RequiredAsterisk from "../FormComponents/RequiredAsterisk";
import "./FormStyle.css";
import LocationBox from "../FormComponents/LocationBox";

/**
 * RetailRescueDays encapsulates the set of checkboxes, time inputs, and
 * location inputs corresponding to days of the week in the form retail rescue
 * section.
 *
 * Expected props:
 * - {Array<Object>} values: list of objects containing data for each day of
 * the week (title, whether it is selected, start time, location, and state keys
 * for the selection, time, and location)
 * - {Function} onChange: callback from the form page to handle input changes,
 * should take a String and a Boolean or String
 * - {Function} validCheck: callback from the form page to check whether inputs
 * passed validation, should take a String
 */
class RetailRescueDays extends Component {
  render() {
    const { values, onChange, validCheck } = this.props;
    return (
      <div className="form-input selection-choice form-col-double-width">
        <label className="form-input-label">
          Retail Rescue Day(s), Start Times (24-Hour), and Locations
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
            <LocationBox
              value={item.location}
              stateKey={item.locationStateKey}
              onChange={onChange}
              valid={validCheck(item.locationStateKey)}
            />
            <TimeBox
              initialValue={item.time}
              stateKey={item.timeStateKey}
              onChange={onChange}
              valid={validCheck(item.timeStateKey)}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default RetailRescueDays;
