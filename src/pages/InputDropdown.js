import "./styles.css";
import React, { Component } from "react";
import "typeface-roboto";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";

class InputDropdown extends Component {
  state = {};
  render() {
    const { width, height, left, top, header } = this.props;
    return (
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label
          className="input-field-header"
          style={{
            position: "absolute",
            left: left + "px",
            top: top + "px",
          }}
        >
          {header}
        </Form.Label>
        <Form.Control
          as="select"
          style={{
            position: "absolute",
            width: fieldWidth + "px",
            height: fieldHeight + "px",
            left: left + 7 + "px",
            top: top + 30 + "px",
          }}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Form.Control>
      </Form.Group>
    );
  }
}

export default InputDropdown;
