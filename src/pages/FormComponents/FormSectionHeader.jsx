import React, { Component } from "react";
import "./styles.css";

class FormSectionHeader extends Component {
  render() {
    const { width, height, left, top, header } = this.props;
    return (
      <div>
        <label
          className="form-section-header"
          style={{
            width: width + "px",
            height: height + "px",
            left: left + "px",
            top: top + "px",
          }}
        >
          {header}
        </label>
        <div
          className="form-section-header-underline"
          style={{
            width: width + "px",
            height: "4px",
            left: left + "px",
            top: top + 32 + "px",
          }}
        />
      </div>
    );
  }
}

export default FormSectionHeader;
