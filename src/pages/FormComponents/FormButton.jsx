import "./styles.css";
import React, { Component } from "react";
import "typeface-roboto";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

class FormButton extends Component {
  state = {};

  render() {
    const {
      left,
      top,
      label,
      labelColor,
      borderColor,
      backgroundColor,
    } = this.props;

    return (
      <Button
        style={{
          background: backgroundColor,

          position: "absolute",
          width: "376px",
          height: "67px",
          left: left,
          top: top,

          "font-family": "Roboto",
          "font-style": "normal",
          "font-weight": "500",
          "font-size": "30px",
          color: labelColor,
          "line-height": "35px",
          "letter-spacing": "-0.01em",
          "border-color": borderColor,
          borderRadius: "10px",
        }}
      >
        {label}
      </Button>
    );
  }
}

export default FormButton;
