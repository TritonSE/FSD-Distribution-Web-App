import "./formstyle.css";
import React, { Component } from "react";
import "typeface-roboto";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";

class InputText extends Component {
  state = {};

  
  render() {
    const { fieldWidth, fieldHeight, left, top, header } = this.props;
    
    return (
      <Form.Group>
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
          type="text"
          style={{
            position: "absolute",
            width: fieldWidth + "px",
            height: fieldHeight + "px",
            left: left + 7 + "px", 
            top: top + 30 + "px",
            borderRadius: "10px"
          }}
        />
      </Form.Group>
    );
  }
}

export default InputText;
