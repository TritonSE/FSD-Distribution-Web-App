import React, { Component } from "react";
import "./formstyle.css";

/**
 * Dropdown is a custom dropdown selection menu component, with support for both
 * single- and multi-select.
 *
 * Expected props:
 * - {Array<Object>} options: list of objects containing data about each option
 * (title and whether it is currently selected)
 * - {Boolean} multiple: whether the dropdown should allow multiple selections
 * - {Function} onSelect: callback to handle input changes, should take a
 * Number
 */
class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isListOpen: false,
      displayText: "",
    };

    this.toggleList = this.toggleList.bind(this);
    this.closeList = this.closeList.bind(this);
  }

  /**
   * Updates component's state based on new props.
   * @param {Any} nextProps The new props for the component
   */
  static getDerivedStateFromProps(nextProps) {
    // determine what text to display in the header
    const selectedItems = nextProps.options.filter((item) => item.selected);
    if (nextProps.multiple) {
      if (selectedItems.length === 0) {
        // none selected -> empty
        return { displayText: "" };
      } else {
        // some selected -> show the number
        return { displayText: `${selectedItems.length} selected` };
      }
    } else {
      if (selectedItems.length > 0) {
        // one selected -> show what it is
        return { displayText: selectedItems[0].title };
      } else {
        // none selected -> empty
        return { displayText: "" };
      }
    }
  }

  componentDidUpdate() {
    setTimeout(() => {
      if (this.state.isListOpen) {
        window.addEventListener("click", this.closeList);
      } else {
        window.removeEventListener("click", this.closeList);
      }
    }, 0); // 0 ms delay schedules this add/remove listener for next event loop
  }

  /**
   * Returns an svg for the triangle icon on the right side of the box.
   */
  triangleIcon() {
    return (
      <svg
        className="icon-triangle"
        width="12"
        height="10"
        viewBox="0 0 12 10"
        aria-hidden="true"
        focusable="false"
      >
        <polyline points="0,0 12,0 6,10" stroke="none" fill="#545252" />
      </svg>
    );
  }

  /**
   * Returns an svg for the checkmark icon next to selected items.
   */
  checkmarkIcon() {
    return (
      <svg
        className="icon-checkmark"
        width="23"
        height="23"
        viewBox="0 0 23 23"
        aria-hidden="true"
        focusable="false"
      >
        <polyline points="4,12 10,17 20,5" strokeWidth="4" fill="none" />
      </svg>
    );
  }

  toggleList() {
    this.setState((prevState) => ({
      isListOpen: !prevState.isListOpen,
    }));
  }

  closeList() {
    this.setState({
      isListOpen: false,
    });
  }

  /**
   * Callback function to handle selection/deselection of an option. Closes the
   * menu if it's set to single-select, and passes index up to the onSelect
   * callback.
   * @param {Number} index Index of the option that was selected/deselected
   */
  selectItem(index) {
    const { multiple, onSelect } = this.props;
    if (!multiple) {
      this.closeList();
    }
    onSelect(index);
  }

  render() {
    const { isListOpen, displayText } = this.state;
    const options = this.props.options;

    return (
      <div className="dropdown-wrapper">
        <button
          type="button"
          className="form-input-box selection-choice"
          onClick={this.toggleList}
        >
          {displayText}
          {this.triangleIcon()}
        </button>
        {isListOpen && (
          <div className="dropdown-list">
            {options.map((item, index) => (
              <button
                type="button"
                className="dropdown-list-item selection-choice"
                key={index}
                onClick={(event) => {
                  event.stopPropagation();
                  this.selectItem(index);
                }}
              >
                {item.title}
                {item.selected && this.checkmarkIcon()}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Dropdown;
