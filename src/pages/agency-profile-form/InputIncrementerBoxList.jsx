import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import IncrementerBoxColumn from "./IncrementerBoxColumn";
import "./formstyle.css";

class InputIncrementerBoxList extends Component {
  onChange = (index, newNumber) => {
    const { options, stateKey, onChange } = this.props;
    const subkey = options[index].subkey;
    const fullKey = stateKey + "." + subkey;
    onChange(fullKey, newNumber);
  };

  render() {
    let listColumns = null;
    if (this.props.twoColumns) {
      let numOptions = this.props.options.length;
      let midIndex = numOptions / 2; // index of first thing in second column
      if (numOptions % 2 === 1) midIndex++;

      let firstColumnOptions = this.props.options.slice(0, midIndex);
      let secondColumnOptions = this.props.options.slice(midIndex); // to end
      listColumns = (
        <Row noGutters={true}>
          <Col xs="auto">
            <IncrementerBoxColumn
              options={firstColumnOptions}
              indexBuffer={0}
              onChange={this.onChange}
            />
          </Col>
          <Col xs="auto">
            <IncrementerBoxColumn
              options={secondColumnOptions}
              indexBuffer={firstColumnOptions.length}
              onChange={this.onChange}
            />
          </Col>
        </Row>
      );
    } else {
      listColumns = (
        <IncrementerBoxColumn
          options={this.props.options}
          indexBuffer={0}
          onChange={this.onChange}
        />
      );
    }

    return (
      <div className="form-input">
        <label className="form-input-list-header">
          <span>{this.props.label + " "}</span>
          <span className="form-input-list-subheader">
            {this.props.subLabel}
          </span>
        </label>
        {listColumns}
      </div>
    );
  }
}

export default InputIncrementerBoxList;
