import React, { Component } from "react";
import InputText from "./InputText";
import "./formstyle.css";

/**
 * AddressList encapsulates the expandable list of additional addresses in the
 * agency form. It generates a series of InputText components corresponding to
 * each element in the addresses list.
 *
 * Expected props:
 * - {Array<String>} addresses: list of addresses
 * - {String} stateKey: key to pass into the onChange callback
 * - {Function} onChange: callback from the form page to handle input changes,
 * should take a String and an Array of Strings
 */
class AddressList extends Component {
  /**
   * Callback function to handle changes in one of the address inputs.
   * Creates an updated copy of the addresses list, then passes it up to the
   * onChange callback prop.
   * @param {Number} index Index of the address that was changed
   * @param {String} newAddress New value for the address
   */
  setAddress(index, newAddress) {
    const { addresses, stateKey, onChange } = this.props;
    let updatedAddresses = addresses.slice();
    updatedAddresses[index] = newAddress;
    onChange(stateKey, updatedAddresses);
  }

  render() {
    return (
      <React.Fragment>
        {this.props.addresses.map((address, index) => {
          return (
            <InputText
              label="Additional Address"
              value={address}
              onChange={(key, text) => this.setAddress(index, text)}
              key={index}
              leftmost
              wide
            />
          );
        })}
      </React.Fragment>
    );
  }
}

export default AddressList;
