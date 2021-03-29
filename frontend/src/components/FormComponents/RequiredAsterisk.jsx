import React, { Component } from "react";
import "./RequiredAsterisks.css";
import "./TextStyles.css";

/**
 * RequiredAsterisk is the indicator for form inputs that are required. It
 * expects a prop `required`: if true, it will appear; otherwise, the component
 * will turn into null.
 */
class RequiredAsterisk extends Component {
  render() {
    if (this.props.required) {
      return <h3 className="asterisk"> *</h3>;
    }
    return null;
  }
}

export default RequiredAsterisk;
