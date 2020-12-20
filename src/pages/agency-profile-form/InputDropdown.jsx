import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import RequiredAsterisk from "./RequiredAsterisk";
import "./formstyle.css";

class InputDropdown extends Component {
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
        <Form.Control as="select" custom>
          <option value=""></option>
          {this.props.options.map((optionText, index) => {
            return <option key={index} value={index}>{optionText}</option>
          })}
        </Form.Control>
      </Form.Group>
    );
  }
}

export default InputDropdown;
