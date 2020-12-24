import React, { Component } from "react";
import "./formstyle.css";

class FormSectionHeader extends Component {
  constructor(props) {
    super(props);
  }
  renderUnderline = () => {
    if (!this.props.noUnderline) {
      return <div className="form-section-title-underline" />;
    }
  };

  render() {
    return (
      <div>
        <h2 className="form-section-title">
          {this.props.title}
          {this.renderUnderline()}
        </h2>
      </div>
    );
  }
}

export default FormSectionHeader;
