import React, { Component } from "react";
import InputText from "./InputText";
import "./formstyle.css"

class AddressList extends Component {
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
              onChange={(text) => this.setAddress(index, text)}
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
