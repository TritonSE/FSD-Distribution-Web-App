import React, { Component } from "react";
import IncrementerBox from "./IncrementerBox";
import { Col } from "react-bootstrap";

class IncrementerBoxColumn extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Col className="no-gutters  m-4" xs="auto">
        {this.props.options.map((optionsText, index) => {
          return <IncrementerBox key={index} label={optionsText} />;
        })}
      </Col>
    );
  }
}

export default IncrementerBoxColumn;
