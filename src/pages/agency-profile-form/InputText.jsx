import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import RequiredAsterisk from "./RequiredAsterisk";
import "./formstyle.css";

class InputText extends Component {
  render() {
    let groupClass = "form-input";
    if (!this.props.leftmost) {
      groupClass += " form-col-gutter";
    }
    let boxClass = null;
    if (this.props.wide) {
      boxClass = "form-input-box-wide";
    }
    
    return (
      <Form.Group className={groupClass}>
        <Form.Label className="form-input-label">
          {this.props.label}
          <RequiredAsterisk required={this.props.required} />
        </Form.Label>
        <Form.Control type="text" bsPrefix="form-input-box" className={boxClass} />
      </Form.Group>
    );
  }
}

export default InputText;
