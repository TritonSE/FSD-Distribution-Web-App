import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import RequiredAsterisk from "./RequiredAsterisk";
import "./formstyle.css";

class InputDate extends Component {
  render() {
    let groupClass = null;
    if (!this.props.leftmost) {
      groupClass = "form-col-gutter";
    }

    return (
      <Form.Group bsPrefix="form-input" className={groupClass}>
        <Form.Label className="form-input-label">
          {this.props.label}
          <RequiredAsterisk required={this.props.required} />
        </Form.Label>
        <Form.Control type="date" bsPrefix="form-input-box-date" />
      </Form.Group>
    );
  }
}

export default InputDate;
