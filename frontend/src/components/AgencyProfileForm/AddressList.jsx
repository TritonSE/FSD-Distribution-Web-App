import React from "react";
import ExpandableList from "./ExpandableList";
import InputText from "../FormComponents/InputText";
import "./FormStyle.css";

/**
 * AddressList encapsulates the expandable list of additional addresses in the
 * agency form. It generates a series of InputText components corresponding to
 * each element in the addresses list.
 *
 * Expected props:
 * - {Array<String>} items: list of addresses
 * - {String} stateKey: key to pass into the onChange callback
 * - {Function} onChange: callback from the form page to handle input changes,
 * should take a String and an Array of Strings
 */
class AddressList extends ExpandableList {
  /**
   * Callback function to handle changes in one of the address inputs.
   * Creates an updated copy of the addresses list, then passes it up to the
   * onChange callback prop.
   * @param {Number} index Index of the address that was changed
   * @param {String} newAddress New value for the address
   */
  setAddress(index, newAddress) {
    const { items, stateKey, onChange } = this.props;
    let updatedAddresses = items.slice();
    updatedAddresses[index] = newAddress;
    onChange(stateKey, updatedAddresses);
  }

  render() {
    return (
      <React.Fragment>
        {this.props.items.map((address, index) => {
          return (
            <div className={this.getContactBodyStyle(index)} key={index}>
              <InputText
                label="Additional Address"
                value={address}
                onChange={(key, text) => this.setAddress(index, text)}
                leftmost
                wide
              />
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}

export default AddressList;
