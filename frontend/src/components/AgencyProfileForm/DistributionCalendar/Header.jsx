import React, { Component } from "react";
import moment from "moment";

/**
 * Header containing the calendar month and navigation arrows.
 *
 * Expected props:
 * - {Object} value: Moment object corresponding with current date
 * - {Function} handlePrev: Callback function to calendar handlePrev. (Handles
 * backward navigation)
 * - {Function} handleNext: Callback function to calendar handleNext. (Handles
 * forward navigation)
 */
class Header extends Component {
  /**
   * Helper function to render navigation arrows
   */
  renderArrow = () => {
    return <div className="arrow" />;
  };

  render() {
    const { value, handlePrev, handleNext } = this.props;
    const { renderArrow } = this;
    const currDate = moment();

    return (
      <div className="header">
        <div className="previous" onClick={!value.isBefore(currDate) ? handlePrev : null}>
          {!value.isBefore(currDate) && renderArrow()}
        </div>
        <div className="current">{value.format("MMMM")}</div>
        <div className="next" onClick={handleNext}>
          {renderArrow()}
        </div>
      </div>
    );
  }
}

export default Header;
