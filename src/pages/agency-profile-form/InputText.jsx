import "./formstyle.css";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";

class InputText extends Component {
  state = {};

  
  render() {
    return (
      <Form.Group className="form-input">
        <Form.Label className="form-input-label">
          {this.props.label}
        </Form.Label>
        <Form.Control type="text" className="form-input-textbox" />
      </Form.Group>
    );
  }
}

export default InputText;
