import React, { Component } from "react";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Container } from "react-bootstrap";

class IncrementerBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      /*topBtnColor: "black",
      btmBtnColor: "black",
      topBtnHover: false,
      btmBtnHover: false,*/
    };
  }

  /*toggleTopBtnHover = () => {
    if (!this.state.topBtnHover) {
      this.setState({ topBtnColor: "gray", topBtnHover: true });
    } else {
      this.setState({ topBtnColor: "black", topBtnHover: false });
    }
  };

  toggleBtmBtnHover = () => {
    if (!this.state.btmBtnHover) {
      this.setState({ btmBtnColor: "gray", btmBtnHover: true });
    } else {
      this.setState({ btmBtnColor: "black", btmBtnHover: false });
    }
  };*/

  handleIncrement = () => {
    this.setState({ count: ++this.state.count });
  };

  handleDecrement = () => {
    if (this.state.count != 0) {
      this.setState({ count: --this.state.count });
    }
  };

  handleInputChange = (event) => {
    this.setState({ count: event.target.value });
  };
  render() {
    return (
      <label className="incrementer-box">
        <div className="incrementer-box-container">
          <input
            type="text"
            className="incrementer-box-input"
            value={this.state.count}
            onChange={this.handleInputChange}
          />
          <svg
            className="incrementer-buttons"
            width="7"
            height="16"
            viewBox="0 0 8 16"
            aria-hidden="true"
            focusable="false"
          >
            <polyline
              className="up-button"
              points="0,6 3.5,0 7,6"
              stroke="none"
              onClick={this.handleIncrement}
            />
            <polyline
              className="down-button"
              points="0,10 3.5,16 7,10"
              stroke="none"
              onClick={this.handleDecrement}
            />
          </svg>
        </div>
        <span>{this.props.label}</span>
      </label>
    );
  }
}

export default IncrementerBox;
