import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputText from "./InputText";
import "./formstyle.css"

class ContactsList extends Component {
  setContactInfo(index, key, newValue) {
    const { contacts, stateKey, onChange } = this.props;
    let updatedContacts = [];
    for (let contact in contacts) {
      let contactCopy = {...contact};
      updatedContacts.push(contactCopy);
    }
    updatedContacts[index][key] = newValue;
    onChange(stateKey, updatedContacts);
  }

  render() {
    return (
      <React.Fragment>
        {this.props.contacts.map((contactInfo, index) => {
          return (
            <div key={index}>
              <Row noGutters={true}>
                <Col xs="auto">
                  <InputText label="Contact" value={contactInfo.contact}
                    onChange={(key, text) => {
                      this.setContactInfo(index, "contact", text)
                    }} leftmost required />
                </Col>
                <Col xs="auto">
                  <InputText label="Position" value={contactInfo.position}
                    onChange={(key, text) => {
                      this.setContactInfo(index, "position", text)
                    }} required />
                </Col>
                <Col xs="auto">
                  <InputText label="Phone #" value={contactInfo.phoneNumber}
                    onChange={(key, text) => {
                      this.setContactInfo(index, "phoneNumber", text)
                    }} />
                </Col>
              </Row>
              <Row noGutters={true}>
                <Col xs="auto">
                  <InputText label="Email" value={contactInfo.email}
                    onChange={(key, text) => {
                      this.setContactInfo(index, "email", text)
                    }} leftmost required wide />
                </Col>
              </Row>
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}

export default ContactsList;
