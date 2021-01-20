import React, { Component } from "react";
import "./formstyle.css";

/**
 * RequiredAsterisk is the indicator for form inputs that are required. It
 * expects a prop `required`: if true, it will appear; otherwise, the component
 * will turn into null.
 */
class RequiredAsterisk extends Component {
  renderAsterisk = () => {
    if (this.props.required) {
      return <h3 className="form-input-label asterisk"> *</h3>;
    }
    return null;
  };

  render() {
    const { required } = this.props;
    return (this.renderAsterisk());
  }
}
 
export default RequiredAsterisk;


