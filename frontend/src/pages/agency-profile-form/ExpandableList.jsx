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
   * Invoked immediately after updating occurs. The ExpandableList component
   * will determine whether to highlight its last item. If the new items prop
   * is longer than it was previously, then the last item will be highlighted.
   * @param {Any} prevProps The previous props of this component
   */
  componentDidUpdate(prevProps) {
    const length = this.props.items.length;
    if (length > prevProps.items.length) {
      this.setState({ focusIndex: length - 1 });
    }
  }

  /**
   * Returns the class name for a div around each component item.
   * @param {Number} index The index in the list of items
   */
  getContactBodyStyle(index) {
    if (this.state.focusIndex === index) {
      return "form-focus-gray";
    }
    return null;
  }

  render() {
    return null;
  }
}

export default ExpandableList;
