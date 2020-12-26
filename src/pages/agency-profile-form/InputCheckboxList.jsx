import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CheckboxColumn from "./CheckboxColumn";
import "./formstyle.css";

class InputCheckboxList extends Component {
  onSelect = (index) => {
    const { options, stateKey, onChange } = this.props;
    const subkey = options[index].subkey;
    const fullKey = stateKey + "." + subkey;
    onChange(fullKey, !options[index].selected);
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
            <CheckboxColumn
              indexBuffer={0}
              options={firstColumnOptions}
              onChange={this.onSelect}
            />
          </Col>
          <Col xs="auto">
            <CheckboxColumn
              indexBuffer={firstColumnOptions.length}
              options={secondColumnOptions}
              onChange={this.onSelect}
            />
          </Col>
        </Row>
      );
    } else {
      listColumns = (
        <CheckboxColumn
          indexBuffer={0}
          options={this.props.options}
          onChange={this.onSelect}
        />
      );
    }

    return (
      <div className="form-input">
        <label className="form-input-list-header">{this.props.label}</label>
        {listColumns}
      </div>
    );
  }
}

export default InputCheckboxList;
