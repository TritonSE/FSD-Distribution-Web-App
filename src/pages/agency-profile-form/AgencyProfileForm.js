import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormSectionHeader from "./FormSectionHeader";
import InputText from "./InputText";
import InputDropdown from "./InputDropdown";
import FormButton from "./FormButton";
import "bootstrap/dist/css/bootstrap.min.css";
import "./formstyle.css";


//For pulling: git pull (once you are in proper branch)
// For pushing: git add -A .; git commit -m '<COMMENT>'; git push

// Page name
// Section headers
// Input components (label + required mark + input):
// Text field (placeholders) - EF (make sure that the style is right)
// Single-select dropdown - WW
// Checkbox list - WW
// Number field / counter - EF/WW
// Button - EF/WW

// TODO 12-14-20: look into using SASS to modify default Bootstrap styling, so we don't have to always do className="..."

class AgencyProfileForm extends Component {
  render() {
    return (
      <div className="form-body">
        <h1 className="form-title">
          Add a New Agency Profile.
        </h1>

        <Form>
          <div className="form-section">
            <FormSectionHeader title="Quick Information" />
            <Row>
              <Col>
                <InputText label="Agency Number" />
              </Col>
              <Col xs={2}>
                <InputText label="Agency Name" />
              </Col>
            </Row>
            <Row>
              <Col>
                <InputText label="Primary Contact" />
              </Col>
              <Col xs={2}>
                <InputText label="Main Site Address" />
              </Col>
            </Row>
            <Row>
              <Col>
                <InputDropdown label="Agency Status" options={["Onboarding", "Active", "Inactive", "On Hold"]} />
              </Col>
            </Row>
          </div>

          {/*SELECT DROPDOWN*/}
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Example select</Form.Label>
            <Form.Control as="select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>

          <FormSectionHeader
            width={271}
            height={29}
            left={130}
            top={791}
            header={"Location and Addresses"}
          />

          <FormSectionHeader
            width={101}
            height={29}
            left={130}
            top={1540}
            header={"Contacts"}
          />

          {/*CHECKBOX*/}
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Check me out"
              className="checkbox-label"
            />
          </Form.Group>

          {/*BUTTON*/}
          <FormButton
            left={"calc(50% - 376px/2 - 216.5px)"}
            top={"4030px"}
            label={"Create Profile"}
            labelColor={"#FFFFFF"}
            borderColor={"#54682F"}
            backgroundColor={"#54682F"}
          />

          <FormButton
            left={"calc(50% - 376px/2 + 223.5px)"}
            top={"4030px"}
            label={"Cancel"}
            labelColor={"#000000"}
            borderColor={"#000000"}
            backgroundColor={"#FFFFFF"}
          />
        </Form>
      </div>
    );
  }
}

export default AgencyProfileForm;
