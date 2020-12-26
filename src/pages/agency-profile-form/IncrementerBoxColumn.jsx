import React, { Component } from "react";
import IncrementerBox from "./IncrementerBox";

class IncrementerBoxColumn extends Component {
  render() {
    return (
      <div className="incrementer-box-list-column selection-choice">
        {this.props.options.map((optionsText, index) => {
          return <IncrementerBox key={index} label={optionsText} />;
        })}
      </div>
    );
  }
}

export default IncrementerBoxColumn;
