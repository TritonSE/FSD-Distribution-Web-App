import React, { Component } from "react";
import IncrementerBox from "./IncrementerBox";
import { Col } from "react-bootstrap";

class IncrementerBoxColumn extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="incrementer-box-list-column">
        {this.props.options.map((optionsText, index) => {
          return <IncrementerBox key={index} label={optionsText} />;
        })}
      </div>
    );
  }
}

export default IncrementerBoxColumn;
