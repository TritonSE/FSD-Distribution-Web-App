import React, { Component } from "react";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Container } from "react-bootstrap";

class IncrementerBox extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

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
  }
  render() {
    return (
      <Container className="incrementer-box-container">
        <Row>
          <Col>
            <input className="incrementer-box-input" value={this.state.count} onChange={this.handleInputChange}/>
          </Col>
          <Col>
            <div className="triangle-up" onClick={this.handleIncrement} />
            <div className="triangle-down" onClick={this.handleDecrement} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default IncrementerBox;
