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
import SmallButton from "./SmallButton";
import AddressList from "./AddressList";
import ContactsList from "./ContactsList";
import InlineDropdown from "./InlineDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "typeface-roboto";
import "./formstyle.css";

/**
 * AgencyProfileForm describes the whole agency form page.
 * Expected props: ???
 *
 * TODO: determine if adding new agency or editing existing one - need to change
 * some text and pre-populate fields. also need to do form validation :(
 */
class AgencyProfileForm extends Component {
  constructor(props) {
    super(props);
    let data = props.agencyData; // TODO: should this be a prop or come from
    // some function call??
    if (!data) {
      data = {
        agencyNumber: "",
        agencyName: "",
        primaryContact: "",
        mainSiteAddress1: "",
        agencyStatus: "",
        region: "",
        sanDiegoDistrict: "",
        countyDistrict: "",
        stateAssemblyDistrict: "",
        stateSenateDistrict: "",
        federalCongressionalDistrict: "",
        mainSiteAddress2: "",
        additionalAddresses: [""],
        billingAddress: "",
        billingZipcode: "",
        contacts: [
          {
            contact: "",
            position: "",
            phoneNumber: "",
            email: "",
          },
        ],
        scheduledNextVisit: "",
        dateOfMostRecentAgreement: "",
        dateOfInitialPartnership: "",
        fileAudit: "",
        monitored1: "",
        foodSafetyCertification1: "",
        mainSitePhoneNumber: "",
        "distributionDay.monday": false,
        "distributionDay.tuesday": false,
        "distributionDay.wednesday": false,
        "distributionDay.thursday": false,
        "distributionDay.friday": false,
        "distributionDay.saturday": false,
        "distributionDay.sunday": false,
        distributionFrequency: "",
        distributionHours: "",
        monitored2: "",
        foodSafetyCertification2: "",
        "distributionType.pantry": false,
        "distributionType.mealProgram": false,
        "distributionType.homeboundDeliveryPartner": false,
        "distributionType.largeScaleDistributionSite": false,
        "distributionType.residentialFacilityOrGroupHome": false,
        "storageCapacity.standAloneFreezer": 0,
        "storageCapacity.freezerFridge": 0,
        "storageCapacity.chestFreezer": 0,
        "storageCapacity.singleDoorStandAloneFreezer": 0,
        "storageCapacity.freezerRefrigeratorCombo": 0,
        "storageCapacity.walkInFreezer": 0,
        "storageCapacity.doubleDoorStandAloneFridge": 0,
        "storageCapacity.sideBySideFridge": 0,
        "storageCapacity.singleDoorStandAloneFridge": 0,
        "storageCapacity.walkInFridge": 0,
        "storageCapacity.dryStorageClimateControlled": 0,
        "storageCapacity.dryStorageNonClimateControlled": 0,
        "transportationCapacity.pickupTruck": 0,
        "transportationCapacity.van": 0,
        "transportationCapacity.car": 0,
        "retailRescueType.retailRescue": false,
        "retailRescueType.preparedFoodCapacity": false,
        "retailRescueType.capacityWithRRWithDelivery": false,
        "demographicType.youth": false,
        "demographicType.senior": false,
        "demographicType.homeless": false,
        "demographicType.veteranMilitary": false,
        "demographicType.healthcare": false,
        "demographicType.collegeUniversity": false,
        "demographicType.disability": false,
        "demographicType.residential": false,
        "demographicType.immigrant": false,
        assignedStaff: "", // single or multi select?
      };
    }
    this.state = data;
  }

  /**
   * Callback to handle when the user makes changes to any input field. Updates
   * the state with the given key and value, if the key already exists in the
   * state.
   * @param {String} key The key to update in the state
   * @param {Any} newValue The new value to set for the key
   */
  handleInputChange = (key, newValue) => {
    if (this.state.hasOwnProperty(key)) {
      this.setState({
        [key]: newValue,
      });
    }
  };

  /**
   * Appends an empty string to the array of addresses in the component's state.
   */
  addAddress = () => {
    const addresses = this.state.additionalAddresses;
    let updatedAddresses = addresses.slice();
    updatedAddresses.push("");
    this.setState({
      additionalAddresses: updatedAddresses,
    });
  };

  /**
   * Appends a blank contact object to the array of contacts in the component's
   * state.
   */
  addContact = () => {
    const contacts = this.state.contacts;
    let updatedContacts = contacts.slice();
    updatedContacts.push({
      contact: "",
      position: "",
      phoneNumber: "",
      email: "",
    });
    this.setState({
      contacts: updatedContacts,
    });
  };

  submitForm = () => {
    // TODO
    alert("Submitting dat form");
  };

  cancelForm = () => {
    // TODO
    alert("Form do be canceled");
  };

  render() {
    const data = this.state;
     
    return (
      <div className="form-body">
        <h1 className="form-title">Add a New Agency Profile.</h1>

        <Form>
          <div className="form-section">
            <FormSectionHeader title="Quick Information" />
            <Row noGutters={true}>
              <Col xs="auto">
                <InputText
                  label="Agency Number"
                  value={data.agencyNumber}
                  stateKey="agencyNumber"
                  onChange={this.handleInputChange}
                  leftmost
                  required
                />
              </Col>
              <Col xs="auto">
                <InputText
                  label="Agency Name"
                  value={data.agencyName}
                  stateKey="agencyName"
                  onChange={this.handleInputChange}
                  required
                  wide
                />
              </Col>
            </Row>

            <Row noGutters={true}>
              <Col xs="auto">
                <InputText
                  label="Primary Contact"
                  value={data.primaryContact}
                  stateKey="primaryContact"
                  onChange={this.handleInputChange}
                  leftmost
                  required
                />
              </Col>
              <Col xs="auto">
                <InputText
                  label="Main Site Address"
                  value={data.mainSiteAddress1}
                  stateKey="mainSiteAddress1"
                  onChange={this.handleInputChange}
                  required
                  wide
                />
              </Col>
            </Row>

            <Row noGutters={true}>
              <Col xs="auto">
                <InputDropdown
                  label="Agency Status"
                  options={["Onboarding", "Active", "Inactive", "On Hold"]}
                  initial={data.agencyStatus}
                  stateKey="agencyStatus"
                  onChange={this.handleInputChange}
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
                <InputText
                  label="Region"
                  value={data.region}
                  stateKey="region"
                  onChange={this.handleInputChange}
                  leftmost
                  required
                />
              </Col>
            </Row>

            <Row noGutters={true}>
              <Col xs="auto">
                <InputText
                  label="San Diego District"
                  value={data.sanDiegoDistrict}
                  stateKey="sanDiegoDistrict"
                  onChange={this.handleInputChange}
                  leftmost
                  required
                />
              </Col>
              <Col xs="auto">
                <InputText
                  label="County District"
                  value={data.countyDistrict}
                  stateKey="countyDistrict"
                  onChange={this.handleInputChange}
                  required
                />
              </Col>
              <Col xs="auto">
                <InputText
                  label="State Assembly District"
                  value={data.stateAssemblyDistrict}
                  stateKey="stateAssemblyDistrict"
                  onChange={this.handleInputChange}
                  required
                />
              </Col>
            </Row>

            <Row noGutters={true}>
              <Col xs="auto">
                <InputText
                  label="State Senate District"
                  value={data.stateSenateDistrict}
                  stateKey="stateSenateDistrict"
                  onChange={this.handleInputChange}
                  leftmost
                  required
                />
              </Col>
              <Col xs="auto">
                <InputText
                  label="Federal Congressional District"
                  value={data.federalCongressionalDistrict}
                  stateKey="federalCongressionalDistrict"
                  onChange={this.handleInputChange}
                  required
                />
              </Col>
            </Row>

            <Row noGutters={true}>
              <Col xs="auto">
                <InputText
                  label="Main Site Address"
                  value={data.mainSiteAddress2}
                  stateKey="mainSiteAddress2"
                  onChange={this.handleInputChange}
                  leftmost
                  required
                  wide
                />
              </Col>
            </Row>

            <Row noGutters={true}>
              <Col xs="auto">
                <AddressList
                  addresses={data.additionalAddresses}
                  stateKey="additionalAddresses"
                  onChange={this.handleInputChange}
                />
              </Col>
            </Row>

            <Row noGutters={true}>
              <Col xs="auto">
                <InputText
                  label="Billing Address"
                  value={data.billingAddress}
                  stateKey="billingAddress"
                  onChange={this.handleInputChange}
                  leftmost
                  required
                  wide
                />
              </Col>
              <Col xs="auto">
                <InputText
                  label="Billing Zipcode"
                  value={data.billingZipcode}
                  stateKey="billingZipcode"
                  onChange={this.handleInputChange}
                  required
                />
              </Col>
            </Row>
            <SmallButton text="Add Address" onClick={this.addAddress} />
          </div>

          <div className="form-section">
            <FormSectionHeader title="Contacts" />
            <ContactsList
              contacts={data.contacts}
              stateKey="contacts"
              onChange={this.handleInputChange}
            />
            <SmallButton text="Add Contact" onClick={this.addContact} />
          </div>

          <div className="form-section">
            <FormSectionHeader title="Compliance" />
            <Row noGutters={true}>
              <Col xs="auto">
                <InputDate
                  label="Scheduled Next Visit"
                  value={data.scheduledNextVisit}
                  stateKey="scheduledNextVisit"
                  onChange={this.handleInputChange}
                  leftmost
                  required
                />
              </Col>
              <Col xs="auto">
                <InputDate
                  label="Date of Most Recent Agreement"
                  value={data.dateOfMostRecentAgreement}
                  stateKey="dateOfMostRecentAgreement"
                  onChange={this.handleInputChange}
                  required
                />
              </Col>
              <Col xs="auto">
                <InputDate
                  label="Date of Initial Partnership"
                  value={data.dateOfInitialPartnership}
                  stateKey="dateOfInitialPartnership"
                  onChange={this.handleInputChange}
                  required
                />
              </Col>
            </Row>

            <Row noGutters={true}>
              <Col xs="auto">
                <InputDate
                  label="File Audit"
                  value={data.fileAudit}
                  stateKey="fileAudit"
                  onChange={this.handleInputChange}
                  leftmost
                />
              </Col>
              <Col xs="auto">
                <InputDate
                  label="Monitored"
                  value={data.monitored1}
                  stateKey="monitored1"
                  onChange={this.handleInputChange}
                  required
                />
              </Col>
              <Col xs="auto">
                <InputDate
                  label="Food Safety Certification"
                  value={data.foodSafetyCertification1}
                  stateKey="foodSafetyCertification1"
                  onChange={this.handleInputChange}
                  required
                />
              </Col>
            </Row>
          </div>

          <div className="form-section">
            <FormSectionHeader title="Distribution" />
            <Row noGutters={true}>
              <Col xs="auto">
                <InputText
                  label="Main Site Phone #"
                  value={data.mainSitePhoneNumber}
                  stateKey="mainSitePhoneNumber"
                  onChange={this.handleInputChange}
                  leftmost
                />
              </Col>
              <Col xs="auto">
                <InputDropdown
                  label="Distribution Day(s)"
                  options={[
                    {
                      title: "Monday",
                      selected: data["distributionDay.monday"],
                      subkey: "monday",
                    },
                    {
                      title: "Tuesday",
                      selected: data["distributionDay.tuesday"],
                      subkey: "tuesday",
                    },
                    {
                      title: "Wednesday",
                      selected: data["distributionDay.wednesday"],
                      subkey: "wednesday",
                    },
                    {
                      title: "Thursday",
                      selected: data["distributionDay.thursday"],
                      subkey: "thursday",
                    },
                    {
                      title: "Friday",
                      selected: data["distributionDay.friday"],
                      subkey: "friday",
                    },
                    {
                      title: "Saturday",
                      selected: data["distributionDay.saturday"],
                      subkey: "saturday",
                    },
                    {
                      title: "Sunday",
                      selected: data["distributionDay.sunday"],
                      subkey: "sunday",
                    },
                  ]}
                  stateKey="distributionDay"
                  onChange={this.handleInputChange}
                  multiple
                  required
                />
              </Col>
              <Col xs="auto">
                <InputText
                  label="Distribution Frequency"
                  value={data.distributionFrequency}
                  stateKey="distributionFrequency"
                  onChange={this.handleInputChange}
                  required
                />
              </Col>
            </Row>

            <Row noGutters={true}>
              <Col xs="auto">
                <InputText
                  label="Distribution Hours"
                  value={data.distributionHours}
                  stateKey="distributionHours"
                  onChange={this.handleInputChange}
                  leftmost
                />
              </Col>
              <Col xs="auto">
                <InputDate
                  label="Monitored"
                  value={data.monitored2}
                  stateKey="monitored2"
                  onChange={this.handleInputChange}
                  required
                />
              </Col>
              <Col xs="auto">
                <InputDate
                  label="Food Safety Certification"
                  value={data.foodSafetyCertification2}
                  stateKey="foodSafetyCertification2"
                  onChange={this.handleInputChange}
                  required
                />
              </Col>
            </Row>

            <Row noGutters={true}>
              <Col xs="auto">
                <InputCheckboxList
                  label="Check Boxes if Available/Correct."
                  stateKey="distributionType"
                  onChange={this.handleInputChange}
                  options={[
                    {
                      title: "Pantry",
                      selected: data["distributionType.pantry"],
                      subkey: "pantry",
                    },
                    {
                      title: "Meal Program",
                      selected: data["distributionType.mealProgram"],
                      subkey: "mealProgram",
                    },
                    {
                      title: "Homebound Delivery Partner",
                      selected:
                        data["distributionType.homeboundDeliveryPartner"],
                      subkey: "homeboundDeliveryPartner",
                    },
                    {
                      title: "Large Scale Distribution Site",
                      selected:
                        data["distributionType.largeScaleDistributionSite"],
                      subkey: "largeScaleDistributionSite",
                    },
                    {
                      title: "Residential Facility or Group Home",
                      selected:
                        data["distributionType.residentialFacilityOrGroupHome"],
                      subkey: "residentialFacilityOrGroupHome",
                    },
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
                    {
                      title: "Stand Alone Freezer",
                      value: data["storageCapacity.standAloneFreezer"],
                      subkey: "standAloneFreezer",
                    },
                    {
                      title: "Freezer Fridge",
                      value: data["storageCapacity.freezerFridge"],
                      subkey: "freezerFridge",
                    },
                    {
                      title: "Chest Freezer",
                      value: data["storageCapacity.chestFreezer"],
                      subkey: "chestFreezer",
                    },
                    {
                      title: "Single-Door Stand Alone Freezer",
                      value:
                        data["storageCapacity.singleDoorStandAloneFreezer"],
                      subkey: "singleDoorStandAloneFreezer",
                    },
                    {
                      title: "Freezer-Refrigerator Combo",
                      value: data["storageCapacity.freezerRefrigeratorCombo"],
                      subkey: "freezerRefrigeratorCombo",
                    },
                    {
                      title: "Walk-in Freezer",
                      value: data["storageCapacity.walkInFreezer"],
                      subkey: "walkInFreezer",
                    },
                    {
                      title: "Double-Door Stand Alone Fridge",
                      value: data["storageCapacity.doubleDoorStandAloneFridge"],
                      subkey: "doubleDoorStandAloneFridge",
                    },
                    {
                      title: "Side By Side Fridge",
                      value: data["storageCapacity.sideBySideFridge"],
                      subkey: "sideBySideFridge",
                    },
                    {
                      title: "Single-Door Stand Alone Fridge",
                      value: data["storageCapacity.singleDoorStandAloneFridge"],
                      subkey: "singleDoorStandAloneFridge",
                    },
                    {
                      title: "Walk-in Fridge",
                      value: data["storageCapacity.walkInFridge"],
                      subkey: "walkInFridge",
                    },
                    {
                      title: "Dry Storage (Climate Controlled)",
                      value:
                        data["storageCapacity.dryStorageClimateControlled"],
                      subkey: "dryStorageClimateControlled",
                    },
                    {
                      title: "Dry Storage (Non-Climate Controlled)",
                      value:
                        data["storageCapacity.dryStorageNonClimateControlled"],
                      subkey: "dryStorageNonClimateControlled",
                    },
                  ]}
                  stateKey="storageCapacity"
                  onChange={this.handleInputChange}
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
                    {
                      title: "Pickup Truck",
                      value: data["transportationCapacity.pickupTruck"],
                      subkey: "pickupTruck",
                    },
                    {
                      title: "Van",
                      value: data["transportationCapacity.van"],
                      subkey: "van",
                    },
                    {
                      title: "Car",
                      value: data["transportationCapacity.car"],
                      subkey: "car",
                    },
                  ]}
                  stateKey="transportationCapacity"
                  onChange={this.handleInputChange}
                />
              </Col>
            </Row>
          </div>

          <div className="form-section">
            <FormSectionHeader title="Retail Rescue" />
            <InputCheckboxList
              label="Check Boxes if Available."
              stateKey="retailRescueType"
              options={[
                {
                  title: "Retail Rescue",
                  selected: data["retailRescueType.retailRescue"],
                  subkey: "retailRescue",
                },
                {
                  title: "Prepared Food Capacity",
                  selected: data["retailRescueType.preparedFoodCapacity"],
                  subkey: "preparedFoodCapacity",
                },
                {
                  title: "Capacity with RR with Delivery",
                  selected: data["retailRescueType.capacityWithRRWithDelivery"],
                  subkey: "capacityWithRRWithDelivery",
                },
              ]}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-section">
            <FormSectionHeader title="Demographics" />
            <InputCheckboxList
              label="Check Boxes if Applicable."
              options={[
                {
                  title: "Youth",
                  selected: data["demographicType.youth"],
                  subkey: "youth",
                },
                {
                  title: "Senior",
                  selected: data["demographicType.senior"],
                  subkey: "senior",
                },
                {
                  title: "Homeless",
                  selected: data["demographicType.homeless"],
                  subkey: "homeless",
                },
                {
                  title: "Veteran/Military",
                  selected: data["demographicType.veteranMilitary"],
                  subkey: "veteranMilitary",
                },
                {
                  title: "Healthcare",
                  selected: data["demographicType.healthcare"],
                  subkey: "healthcare",
                },
                {
                  title: "College/University",
                  selected: data["demographicType.collegeUniversity"],
                  subkey: "collegeUniversity",
                },
                {
                  title: "Disability Specific (Physical or Mental)",
                  selected: data["demographicType.disability"],
                  subkey: "disability",
                },
                {
                  title: "Residential",
                  selected: data["demographicType.residential"],
                  subkey: "residential",
                },
                {
                  title: "Immigrant",
                  selected: data["demographicType.immigrant"],
                  subkey: "immigrant",
                },
              ]}
              stateKey="demographicType"
              onChange={this.handleInputChange}
              twoColumns
            />
          </div>

          <div className="form-section">
            <Row noGutters={true}>
              <Col xs="auto">
                <h2
                  className="form-section-title"
                  style={{ marginTop: 7, marginRight: 24 }}
                >
                  Assigned Staff
                </h2>
              </Col>
              <Col xs="auto">
                <InlineDropdown
                  label={null}
                  options={["Mia", "Charlie", "Eli", "Kate"]}
                  initial={this.state.assignedStaff}
                  stateKey="assignedStaff"
                  onChange={this.handleInputChange}
                />
              </Col>
            </Row>
          </div>

          <div className="form-section">
            <Row noGutters={true}>
              <Col>
                <button
                  type="button"
                  className="form-button-submit"
                  onClick={this.submitForm}
                >
                  {this.props.edit ? "Save" : "Create Profile"}
                </button>
              </Col>
              <Col>
                <button
                  type="button"
                  className="form-button-cancel"
                  onClick={this.cancelForm}
                >
                  Cancel
                </button>
              </Col>
            </Row>
          </div>
        </Form>
      </div>
    );
  }
}

export default AgencyProfileForm;
