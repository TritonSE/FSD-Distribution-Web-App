import { Component } from "react";
import "./formstyle.css";

/**
 * ExpandableList implements the functionality of lists in the agency form,
 * where the user can add/remove items. This class should be extended and the
 * render() method overridden to actually use it in the form.
 */
class ExpandableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusIndex: -1,
    };
  }

  /**
   * Returns the class name for a div around each component item.
   * @param {Number} index The index in the list of items
   */
  getContactBodyStyle(index) {
    if (index === 0) {
      return null;
    } else if (this.state.focusIndex === index) {
      return "form-focus-gray";
    }
    return "form-focusable";
  }

  /**
   * Callback for when one of the component items receives focus.
   * @param {Number} index The index in the list of items
   */
  handleFocus = (index) => {
    this.setState({ focusIndex: index });
  };

  /**
   * Callback for when one of the component items loses focus.
   */
  handleBlur = () => {
    this.setState({ focusIndex: -1 });
  };

  render() {
    return null;
  }
}

export default ExpandableList;
