import React, { Component } from "react";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Container } from "react-bootstrap";

class IncrementerBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      topBtnColor: "black",
      btmBtnColor: "black",
      topBtnHover: false,
      btmBtnHover: false,
    };
  }

  toggleTopBtnHover = () => {
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
  };

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
      <Row>
        <Col
          className="remove-all-margin-padding center-col-contents"
          xs="auto"
        >
          <Container
            className="incrementer-box-container remove-all-margin-padding"
            xs="auto"
          >
            <Row className="no-gutters">
              <Col className="no-gutters center-col-contents" xs="auto">
                <input
                  className="incrementer-box-input"
                  value={this.state.count}
                  onChange={this.handleInputChange}
                />
              </Col>
              <Col className="no-gutters" xs="auto">
                <div
                  className="btn-triangle-up"
                  style={{ "border-bottom-color": this.state.topBtnColor }}
                  onMouseEnter={this.toggleTopBtnHover}
                  onMouseLeave={this.toggleTopBtnHover}
                  onClick={this.handleIncrement}
                />
                <div
                  className="btn-triangle-down"
                  style={{ "border-top-color": this.state.btmBtnColor }}
                  onMouseEnter={this.toggleBtmBtnHover}
                  onMouseLeave={this.toggleBtmBtnHover}
                  onClick={this.handleDecrement}
                />
              </Col>
            </Row>
          </Container>
        </Col>
        <Col className="remove-all-margin-padding center-col-contents  ">
          <label className="incrementer-box-label m-2">{this.props.label}</label>
        </Col>
      </Row>
    );
  }
}

export default IncrementerBox;
