import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CheckboxColumn from "./CheckboxColumn";
import "./formstyle.css";

class InputCheckboxList extends Component {
  render() {
    let listColumns = null;
    if (this.props.twoColumns) {
      let numOptions = this.props.options.length;
      let midIndex = numOptions / 2; // index of first thing in second column
      if (numOptions % 2 === 1) midIndex++;

      let firstColumnOptions = this.props.options.slice(0, midIndex);
      let secondColumnOptions = this.props.options.slice(midIndex); // to end
      listColumns = (
        <Row noGutters={true}>
          <Col xs="auto">
            <CheckboxColumn options={firstColumnOptions} />
          </Col>
          <Col xs="auto">
            <CheckboxColumn options={secondColumnOptions} />
          </Col>
        </Row>
      );
    } else {
      listColumns = <CheckboxColumn options={this.props.options} />;
    }

    return (
      <div className="form-input">
        <label className="form-input-list-header">{this.props.label}</label>
        {listColumns}
      </div>
    );
  }
}

export default InputCheckboxList;
