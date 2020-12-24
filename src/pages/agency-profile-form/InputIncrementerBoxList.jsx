import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import IncrementerBoxColumn from "./IncrementerBoxColumn";
import "./formstyle.css";

class InputIncrementerBoxList extends Component {
  render() {
    let listColumns = null;
    if (this.props.twoColumns) {
      let numOptions = this.props.options.length;
      let midIndex = numOptions / 2; // index of first thing in second column
      if (numOptions % 2 === 1) midIndex++;

      let firstColumnOptions = this.props.options.slice(0, midIndex);
      let secondColumnOptions = this.props.options.slice(midIndex); // to end
      listColumns = (
        <Row className="no-gutters m-2">
          <Col xs="auto">
            <IncrementerBoxColumn options={firstColumnOptions} />
          </Col>
          <Col xs="auto">
            <IncrementerBoxColumn options={secondColumnOptions} />
          </Col>
        </Row>
      );
    } else {
      listColumns = (
        <Row className="no-gutters m-2">
          <IncrementerBoxColumn options={this.props.options} />
        </Row>
      );
    }

    return (
      <Form.Group bsPrefix="form-input">
        <Form.Label className="form-checkbox-list-header">
          {this.props.label}
        </Form.Label>
        <Form.Label className="form-incrementer-box-list-sub-header">
          {this.props.subLabel}
        </Form.Label>
        {listColumns}
      </Form.Group>
    );
  }
}

export default InputIncrementerBoxList;
