import React, { Component } from "react";
import moment from "moment";


class Header extends Component {


  renderArrow = () => {
    return (<div className="arrow"/>)
  }

  render() {
    const { value, handlePrev, handleNext } = this.props;
    const { renderArrow } = this;
    const currDate = moment();

    return (
      <div className="header">
        <div className="previous" onClick={!value.isBefore(currDate) ?  handlePrev : null }>{!value.isBefore(currDate) && renderArrow()}</div>
        <div className="current">
            {value.format("MMMM")}
        </div>
        <div className="next" onClick={handleNext}>{renderArrow()}</div>
      </div>
    );
  }
}

export default Header;
