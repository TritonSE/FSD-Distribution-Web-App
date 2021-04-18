import React from "react";
import { FormRow, FormCol } from "./FormLayout";
import ExpandableList from "./ExpandableList";
import InputText from "../FormComponents/InputText";
import "./FormStyle.css";

/**
 * ContactsList is a container encapsulating the expandable list of contact
 * information in the agency form. It generates a series of sets of InputTexts
 * which correspond to the elements in the contacts prop.
 *
 * Expected props:
 * - {Array<Object>} items: list of objects containing contact information
 * (contact, position, phoneNumber, and email)
 * - {String} stateKey: key to pass into the onChange callback
 * - {Function} onChange: callback from the form page to handle input changes,
 * should take a String and an Array of Objects
 * - {Function} validCheck: callback from the form page to check whether inputs
 * passed validation, should take a String
 */
class ContactsList extends ExpandableList {
  /**
   * Callback function to handle changes in one of the text boxes.
   * Creates an updated copy of the contacts list, then passes it back up to the
   * onChange callback prop.
   * @param {Number} index Index of the contact that was changed
   * @param {String} key Sub-key of the field that was changed (e.g.
   * "phoneNumber")
   * @param {String} newValue New value for the field
   */
  setContactInfo(index, key, newValue) {
    const { items, stateKey, onChange } = this.props;
    let updatedContacts = [];
    for (let contact of items) {
      let contactCopy = { ...contact }; // spread notation copies all fields
      updatedContacts.push(contactCopy);
    }
    updatedContacts[index][key] = newValue;
    onChange(stateKey, updatedContacts);
  }

  // validation note: Mongoose produces field names that look like
  // contacts.0.contact, while express-validator produces field names that look
  // like contacts[0].phoneNumber
  render() {
    const { items, stateKey, validCheck } = this.props;
    return (
      <React.Fragment>
        {items.map((contactInfo, index) => {
          return (
            <div className={this.getContactBodyStyle(index)} key={index}>
              <FormRow>
                <FormCol>
                  <InputText
                    label="Contact"
                    value={contactInfo.contact}
                    onChange={(key, text) => {
                      this.setContactInfo(index, "contact", text);
                    }}
                    leftmost
                    required
                    valid={validCheck(`${stateKey}.${index}.contact`)}
                  />
                </FormCol>
                <FormCol>
                  <InputText
                    label="Position"
                    value={contactInfo.position}
                    onChange={(key, text) => {
                      this.setContactInfo(index, "position", text);
                    }}
                    required
                    valid={validCheck(`${stateKey}.${index}.position`)}
                  />
                </FormCol>
                <FormCol>
                  <InputText
                    label="Phone #"
                    value={contactInfo.phoneNumber}
                    onChange={(key, text) => {
                      this.setContactInfo(index, "phoneNumber", text);
                    }}
                    required
                    valid={validCheck(`${stateKey}[${index}].phoneNumber`)}
                  />
                </FormCol>
              </FormRow>
              <FormRow>
                <FormCol>
                  <InputText
                    label="Email"
                    value={contactInfo.email}
                    onChange={(key, text) => {
                      this.setContactInfo(index, "email", text);
                    }}
                    leftmost
                    required
                    wide
                    valid={validCheck(`${stateKey}[${index}].email`)}
                  />
                </FormCol>
              </FormRow>
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}

export default ContactsList;
