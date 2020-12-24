import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormSectionHeader from "./FormSectionHeader";
import InputText from "./InputText";
import InputDate from "./InputDate";
import InputDropdown from "./InputDropdown";
import InputCheckboxList from "./InputCheckboxList";
import InputIncrementerBoxList from "./InputIncrementerBoxList";
import FormButton from "./FormButton";
//import "bootstrap/dist/css/bootstrap.min.css";
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

class AgencyProfileForm extends Component {
  render() {
    return (
      <div className="form-body">
        <h1 className="form-title">Add a New Agency Profile.</h1>

        <Form>
          <div className="form-section">
            <FormSectionHeader title="Quick Information" />
            <Row noGutters={true}>
              <Col xs="auto">
                <InputText label="Agency Number" leftmost required />
              </Col>
              <Col xs="auto">
                <InputText label="Agency Name" required wide />
              </Col>
            </Row>

            <Row noGutters={true}>
              <Col xs="auto">
                <InputText label="Primary Contact" leftmost required />
              </Col>
              <Col xs="auto">
                <InputText label="Main Site Address" required wide />
              </Col>
            </Row>

            <Row noGutters={true}>
              <Col xs="auto">
                <InputDropdown
                  label="Agency Status"
                  options={["Onboarding", "Active", "Inactive", "On Hold"]}
                  leftmost
                  required
                />
              </Col>
            </Row>
          </div>
          <div className="form-section">
            <FormSectionHeader title="Location and Addresses" />
            <Row noGutters={true}>
              <Col xs="auto">
                <InputText label="Region" leftmost required />
              </Col>
            </Row>

            <Row noGutters={true}>
              <Col xs="auto">
                <InputText label="San Diego District" leftmost required />
              </Col>
              <Col xs="auto">
                <InputText label="County District" required />
              </Col>
              <Col xs="auto">
                <InputText label="State Assembly District" required />
              </Col>
            </Row>

            <Row noGutters={true}>
              <Col xs="auto">
                <InputText label="State Senate District" leftmost required />
              </Col>
              <Col xs="auto">
                <InputText label="Federal Congressional District" required />
              </Col>
            </Row>

            <Row noGutters={true}>
              <Col xs="auto">
                <InputText label="Main Site Address" leftmost required wide />
              </Col>
            </Row>

            <Row noGutters={true}>
              <Col xs="auto">
                <InputText label="Additional Address" leftmost wide />
              </Col>
            </Row>

            <Row noGutters={true}>
              <Col xs="auto">
                <InputText label="Billing Address" leftmost required wide />
              </Col>
              <Col xs="auto">
                <InputText label="Billing Zipcode" required />
              </Col>
            </Row>
          </div>
          <div className="form-section">
            <FormSectionHeader title="Contacts" />
            <Row noGutters={true}>
              <Col xs="auto">
                <InputText label="Contact" leftmost required />
              </Col>
              <Col xs="auto">
                <InputText label="Position" required />
              </Col>
              <Col xs="auto">
                <InputText label="Phone #" />
              </Col>
            </Row>

            <Row noGutters={true}>
              <Col xs="auto">
                <InputText label="Email" leftmost required wide />
              </Col>
            </Row>
          </div>
          <div className="form-section">
            <FormSectionHeader title="Compliance" />
            <Row noGutters={true}>
              <Col xs="auto">
                <InputDate label="Scheduled Next Visit" leftmost required />
              </Col>
              <Col xs="auto">
                <InputDate label="Date of Most Recent Agreement" required />
              </Col>
              <Col xs="auto">
                <InputDate label="Date of Initial Partnership" required />
              </Col>
            </Row>

            <Row noGutters={true}>
              <Col xs="auto">
                <InputDate label="File Audit" leftmost />
              </Col>
              <Col xs="auto">
                <InputDate label="Monitored" required />
              </Col>
              <Col xs="auto">
                <InputDate label="Food Safety Certification" required />
              </Col>
            </Row>
          </div>
          <div className="form-section">
            <FormSectionHeader title="Distribution" />
            <Row noGutters={true}>
              <Col xs="auto">
                <InputText label="Main Site Phone #" leftmost />
              </Col>
              <Col xs="auto">
                <InputDropdown
                  label="Distribution Day(s)"
                  options={[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ]}
                  required
                />
              </Col>
              <Col xs="auto">
                <InputText label="Distribution Frequency" required />
              </Col>
            </Row>

            <Row noGutters={true}>
              <Col xs="auto">
                <InputDate label="Distribution" leftmost />
              </Col>
              <Col xs="auto">
                <InputDate label="Monitored" required />
              </Col>
              <Col xs="auto">
                <InputDate label="Food Safety Certification" required />
              </Col>
              <Col xs="auto">
                <InputText label="Monitored" required />
              </Col>
              <Col xs="auto">
                <InputText label="Food Safety Certification" required />
              </Col>
            </Row>

            <Row noGutters={true}>
              <Col xs="auto">
                <InputCheckboxList
                  label="Check Boxes if Available/Correct."
                  options={[
                    "Pantry",
                    "Meal Program",
                    "Homebound Delivery Partner",
                    "Large Scale Distribution Site",
                    "Residential Facility or Group Home",
                  ]}
                />
              </Col>
            </Row>
          </div>
          <div className="form-section">
            <FormSectionHeader title="Capacity" />
            <Row noGutters={true}>
              <Col xs="auto">
                <InputIncrementerBoxList
                  label="Storage and Type:"
                  subLabel="Select Quantity if Storage Type is Available"
                  options={[
                    "Stand Alone Freezer",
                    "Freezer Fridge",
                    "Chest Freezer",
                    "Single-Door Stand Alone Freezer",
                    "Freezer-Refrigerator Combo",
                    "Walk-in Freezer",
                    "Double-Door Stand Alone Fridge",
                    "Side By Side Fridge",
                    "Single-Door Stand ALone Fridge",
                    "Walk-in Fridge",
                    " Dry Storage (Climate Controlled",
                    "Dry Storage (Non-Climate Controlled)",
                  ]}
                  twoColumns
                />
              </Col>
            </Row>
            <Row noGutters={true}>
              <Col xs="auto">
                <InputIncrementerBoxList
                  label="Transport and Type:"
                  subLabel="Select Quantity if Transport Type is Available"
                  options={[
                    "Retail Rescue",
                    "Prepared Food Capacity",
                    "Capacity with RR with Delivery",
                  ]}
                />
              </Col>
            </Row>
          </div>
          <div className="form-section">
            <FormSectionHeader title="Retail Rescue" />
            <Row noGutters={true}>
              <Col xs="auto">
                <InputCheckboxList
                  label="Check Boxes if Available."
                  options={[
                    "Retail Rescue",
                    "Prepared Food Capacity",
                    "Capacity with RR with Delivery",
                  ]}
                />
              </Col>
            </Row>
          </div>
          <div className="form-section">
            <FormSectionHeader title="Demographics" />
            <Row noGutters={true}>
              <Col xs="auto">
                <InputCheckboxList
                  label="Check Boxes if Applicable."
                  options={[
                    "Youth",
                    "Senior",
                    "Homeless",
                    "Veteran/Military",
                    "Healthcare",
                    "College/University",
                    "Disability Specific (Physical or Mental)",
                    "Residential",
                    "Immigrant",
                  ]}
                  twoColumns
                />
              </Col>
            </Row>
          </div>

          {/*BUTTON
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
          />*/}
        </Form>
      </div>
    );
  }
}

export default AgencyProfileForm;