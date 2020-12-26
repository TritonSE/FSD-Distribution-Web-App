import React, { Component } from "react";
import IncrementerBox from "./IncrementerBox";

class IncrementerBoxColumn extends Component {
  render() {
    return (
      <div className="incrementer-box-list-column selection-choice">
        {this.props.options.map((item, index) => {
          return (
            <IncrementerBox
              key={index}
              index={index + this.props.indexBuffer}
              label={item.title}
              value={item.value}
              onChange={this.props.onChange}
            />
          );
        })}
      </div>
    );
  }
}

export default IncrementerBoxColumn;
