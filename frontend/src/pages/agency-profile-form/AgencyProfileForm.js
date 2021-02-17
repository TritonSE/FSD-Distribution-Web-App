import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import FormSectionHeader from "./FormSectionHeader";
import { FormRow, FormCol } from "./FormLayout";
import InputText from "./InputText";
import InputDate from "./InputDate";
import InputDropdown from "./InputDropdown";
import InputCheckboxList from "./InputCheckboxList";
import InputIncrementerBoxList from "./InputIncrementerBoxList";
import SmallButton from "./SmallButton";
import AddressList from "./AddressList";
import ContactsList from "./ContactsList";
import InlineDropdown from "./InlineDropdown";
import "typeface-roboto";
import "./formstyle.css";

/**
 * AgencyProfileForm describes the whole agency form page.
 * Expected props:
 * - {Object} agencyData: object following agency schema (if editing an
 * existing agency)
 * - {String} editSection: name of the section being edited (if editing an
 * existing agency)
 */
class AgencyProfileForm extends Component {
  constructor(props) {
    super(props);
    let data = props.agencyData;
    if (!data) {
      data = {
        agencyNumber: "",
        name: "",
        mainSiteAddress: "",
        city: "",
        status: "",
        region: "",
        sanDiegoDistrict: "",
        countyDistrict: "",
        stateAssemblyDistrict: "",
        stateSenateDistrict: "",
        federalCongressionalDistrict: "",
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
        monitored: "",
        foodSafetyCertification: "",
        mainSitePhoneNumber: "",
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
        distributionFrequency: "",
        distributionHours: "",
        pantry: false,
        mealProgram: false,
        homeboundDeliveryPartner: false,
        largeScaleDistributionSite: false,
        residentialFacility: false,
        standAloneFreezer: 0,
        freezerFridge: 0,
        chestFreezer: 0,
        singleDoorFreezer: 0,
        freezerFridgeCombo: 0,
        walkInFreezer: 0,
        doubleDoorFridge: 0,
        sideBySideFridge: 0,
        singleDoorFridge: 0,
        walkInFridge: 0,
        dryStorageClimateControl: 0,
        dryStorageNonClimateControl: 0,
        pickUpTruck: 0,
        van: 0,
        car: 0,
        retailRescue: false,
        preparedFoodCapacity: false,
        capacityWithRRD: false,
        youth: false,
        senior: false,
        homeless: false,
        veteran: false,
        healthcare: false,
        college: false,
        disabilitySpecific: false,
        residential: false,
        immigrant: false,
        staff: "",
        errors: [],
      };
    }
    this.state = data;
  }

  /**
   * Helper function that processes this component's state into the format
   * expected by the agency schema (see backend/routes/agency.js).
   * @returns An object matching the agency schema populated with values from
   * this component's state
   */
  prepareData() {
    let data = { ...this.state };
    let tableContent = {
      agencyNumber: data.agencyNumber,
      name: data.name,
      status: data.status,
      region: data.region,
      city: data.city,
      phone: data.contacts[0].phoneNumber,
      staff: data.staff,
    };
    let distributionDays = {
      monday: data.monday,
      tuesday: data.tuesday,
      wednesday: data.wednesday,
      thursday: data.thursday,
      friday: data.friday,
      saturday: data.saturday,
      sunday: data.sunday,
    };

    data.tableContent = tableContent;
    data.distributionDays = distributionDays;
    // extra fields will be ignored by mongoose

    // Remove empty strings in additionalAddresses
    data.additionalAddresses = data.additionalAddresses.filter((x) => x !== "");

    return data;
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
   * Returns whether the input field corresponding to the given key passed
   * validation (or has not been validated yet).
   * @param {String} key The key of the field to check
   */
  isValid = (key) => {
    return !this.state.errors.includes(key);
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
   * Removes the last element in the array of addresses in the component's
   * state.
   */
  removeAddress = () => {
    const addresses = this.state.additionalAddresses;
    let updatedAddresses = addresses.slice();
    updatedAddresses.pop();
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

  /**
   * Removes the last element in the array of contact objects in the component's
   * state.
   */
  removeContact = () => {
    const contacts = this.state.contacts;
    let updatedContacts = contacts.slice();
    updatedContacts.pop();
    this.setState({
      contacts: updatedContacts,
    });
  };

  /**
   * Handles form submission.
   */
  submitForm = () => {
    const { history } = this.props;
    const formData = this.prepareData();
    fetch("http://localhost:8000/agency/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        response.json().then((data) => {
          if (!response.ok) {
            if (data.fields) {
              let errors = data.fields.filter((x) => x !== null);
              this.setState({ errors: errors });
              let message = `${errors.length} fields have errors!`;
              if (errors.length == 1) {
                message = "1 field has errors!";
              }
              alert(message);
            }
          } else {
            if (history) {
              history.push("/agency/" + data._id);
            }
          }
        });
      })
      .catch((error) => console.error(error));
  };

  /**
   * Handles form cancellation.
   */
  cancelForm = () => {
    const { history } = this.props;
    if (history) {
      history.push("/agency");
    }
  };

  render() {
    const data = this.state;

    return (
      <div className="form-body">
        <h1 className="form-title">Add a New Agency Profile.</h1>

        <form>
          <div className="form-section">
            <FormSectionHeader title="Quick Information" />
            <FormRow>
              <FormCol>
                <InputText
                  label="Agency Number"
                  value={data.agencyNumber}
                  stateKey="agencyNumber"
                  onChange={this.handleInputChange}
                  leftmost
                  required
                  valid={this.isValid("agencyNumber")}
                />
              </FormCol>
              <FormCol>
                <InputText
                  label="Agency Name"
                  value={data.name}
                  stateKey="name"
                  onChange={this.handleInputChange}
                  required
                  wide
                  valid={this.isValid("name")}
                />
              </FormCol>
            </FormRow>

            <FormRow>
              <FormCol>
                <InputText
                  label="Main Site Address"
                  value={data.mainSiteAddress}
                  stateKey="mainSiteAddress"
                  onChange={this.handleInputChange}
                  leftmost
                  required
                  wide
                  valid={this.isValid("mainSiteAddress")}
                />
              </FormCol>
              <FormCol>
                <InputText
                  label="City"
                  value={data.city}
                  stateKey="city"
                  onChange={this.handleInputChange}
                  required
                  valid={this.isValid("city")}
                />
              </FormCol>
            </FormRow>

            <FormRow>
              <FormCol>
                <InputDropdown
                  label="Agency Status"
                  options={["Onboarding", "Active", "Inactive", "On Hold"]}
                  initial={data.status}
                  stateKey="status"
                  onChange={this.handleInputChange}
                  leftmost
                  required
                  valid={this.isValid("status")}
                />
              </FormCol>
            </FormRow>
          </div>

          <div className="form-section">
            <FormSectionHeader title="Location and Addresses" />
            <FormRow>
              <FormCol>
                <InputText
                  label="Region"
                  value={data.region}
                  stateKey="region"
                  onChange={this.handleInputChange}
                  leftmost
                  required
                  valid={this.isValid("region")}
                />
              </FormCol>
            </FormRow>

            <FormRow>
              <FormCol>
                <InputText
                  label="San Diego District"
                  value={data.sanDiegoDistrict}
                  stateKey="sanDiegoDistrict"
                  onChange={this.handleInputChange}
                  leftmost
                  required
                  valid={this.isValid("sanDiegoDistrict")}
                />
              </FormCol>
              <FormCol>
                <InputText
                  label="County District"
                  value={data.countyDistrict}
                  stateKey="countyDistrict"
                  onChange={this.handleInputChange}
                  required
                  valid={this.isValid("countyDistrict")}
                />
              </FormCol>
              <FormCol>
                <InputText
                  label="State Assembly District"
                  value={data.stateAssemblyDistrict}
                  stateKey="stateAssemblyDistrict"
                  onChange={this.handleInputChange}
                  required
                  valid={this.isValid("stateAssemblyDistrict")}
                />
              </FormCol>
            </FormRow>

            <FormRow>
              <FormCol>
                <InputText
                  label="State Senate District"
                  value={data.stateSenateDistrict}
                  stateKey="stateSenateDistrict"
                  onChange={this.handleInputChange}
                  leftmost
                  required
                  valid={this.isValid("stateSenateDistrict")}
                />
              </FormCol>
              <FormCol>
                <InputText
                  label="Federal Congressional District"
                  value={data.federalCongressionalDistrict}
                  stateKey="federalCongressionalDistrict"
                  onChange={this.handleInputChange}
                  required
                  valid={this.isValid("federalCongressionalDistrict")}
                />
              </FormCol>
            </FormRow>

            <AddressList
              items={data.additionalAddresses}
              stateKey="additionalAddresses"
              onChange={this.handleInputChange}
            />

            <FormRow>
              <FormCol>
                <InputText
                  label="Billing Address"
                  value={data.billingAddress}
                  stateKey="billingAddress"
                  onChange={this.handleInputChange}
                  leftmost
                  required
                  wide
                  valid={this.isValid("billingAddress")}
                />
              </FormCol>
              <FormCol>
                <InputText
                  label="Billing Zipcode"
                  value={data.billingZipcode}
                  stateKey="billingZipcode"
                  onChange={this.handleInputChange}
                  required
                  valid={this.isValid("billingZipcode")}
                />
              </FormCol>
            </FormRow>
            <FormRow>
              <span className="small-button-span">
                <SmallButton
                  text="Add Address"
                  symbol="+"
                  onClick={this.addAddress}
                />
                {this.state.additionalAddresses.length > 1 && (
                  <SmallButton
                    text="Remove Address"
                    symbol="-"
                    alignRight
                    onClick={this.removeAddress}
                  />
                )}
              </span>
            </FormRow>
          </div>

          <div className="form-section">
            <FormSectionHeader title="Contacts" />
            <ContactsList
              items={data.contacts}
              stateKey="contacts"
              onChange={this.handleInputChange}
              validCheck={this.isValid}
            />
            <FormRow>
              <span className="small-button-span">
                <SmallButton
                  text="Add Contact"
                  symbol="+"
                  onClick={this.addContact}
                />
                {this.state.contacts.length > 1 && (
                  <SmallButton
                    text="Remove Contact"
                    symbol="-"
                    alignRight
                    onClick={this.removeContact}
                  />
                )}
              </span>
            </FormRow>
          </div>

          <div className="form-section">
            <FormSectionHeader title="Compliance" />
            <FormRow>
              <FormCol>
                <InputDate
                  label="Scheduled Next Visit"
                  value={data.scheduledNextVisit}
                  stateKey="scheduledNextVisit"
                  onChange={this.handleInputChange}
                  leftmost
                  required
                  valid={this.isValid("scheduledNextVisit")}
                />
              </FormCol>
              <FormCol>
                <InputDate
                  label="Date of Most Recent Agreement"
                  value={data.dateOfMostRecentAgreement}
                  stateKey="dateOfMostRecentAgreement"
                  onChange={this.handleInputChange}
                  required
                  valid={this.isValid("dateOfMostRecentAgreement")}
                />
              </FormCol>
              <FormCol>
                <InputDate
                  label="Date of Initial Partnership"
                  value={data.dateOfInitialPartnership}
                  stateKey="dateOfInitialPartnership"
                  onChange={this.handleInputChange}
                  required
                  valid={this.isValid("dateOfInitialPartnership")}
                />
              </FormCol>
            </FormRow>

            <FormRow>
              <FormCol>
                <InputDate
                  label="File Audit"
                  value={data.fileAudit}
                  stateKey="fileAudit"
                  onChange={this.handleInputChange}
                  leftmost
                  valid={this.isValid("fileAudit")}
                />
              </FormCol>
              <FormCol>
                <InputDate
                  label="Monitored"
                  value={data.monitored}
                  stateKey="monitored"
                  onChange={this.handleInputChange}
                  required
                  valid={this.isValid("monitored")}
                />
              </FormCol>
              <FormCol>
                <InputDate
                  label="Food Safety Certification"
                  value={data.foodSafetyCertification}
                  stateKey="foodSafetyCertification"
                  onChange={this.handleInputChange}
                  required
                  valid={this.isValid("foodSafetyCertification")}
                />
              </FormCol>
            </FormRow>
          </div>

          <div className="form-section">
            <FormSectionHeader title="Distribution" />
            <FormRow>
              <FormCol>
                <InputDropdown
                  label="Distribution Day(s)"
                  options={[
                    {
                      title: "Monday",
                      //selected: data.monday,
                      selected: true,
                      stateKey: "monday",
                    },
                    {
                      title: "Tuesday",
                      selected: data.tuesday,
                      stateKey: "tuesday",
                    },
                    {
                      title: "Wednesday",
                      selected: data.wednesday,
                      stateKey: "wednesday",
                    },
                    {
                      title: "Thursday",
                      selected: data.thursday,
                      stateKey: "thursday",
                    },
                    {
                      title: "Friday",
                      selected: data.friday,
                      stateKey: "friday",
                    },
                    {
                      title: "Saturday",
                      selected: data.saturday,
                      stateKey: "saturday",
                    },
                    {
                      title: "Sunday",
                      selected: data.sunday,
                      stateKey: "sunday",
                    },
                  ]}
                  onChange={this.handleInputChange}
                  multiple
                  leftmost
                  required
                />
              </FormCol>
              <FormCol>
                <InputText
                  label="Distribution Frequency"
                  value={data.distributionFrequency}
                  stateKey="distributionFrequency"
                  onChange={this.handleInputChange}
                  required
                  valid={this.isValid("distributionFrequency")}
                />
              </FormCol>
              <FormCol>
                <InputText
                  label="Distribution Hours"
                  value={data.distributionHours}
                  stateKey="distributionHours"
                  onChange={this.handleInputChange}
                />
              </FormCol>
            </FormRow>

            <FormRow>
              <FormCol>
                <InputCheckboxList
                  label="Check Boxes if Available/Correct."
                  onChange={this.handleInputChange}
                  options={[
                    {
                      title: "Pantry",
                      selected: data.pantry,
                      stateKey: "pantry",
                    },
                    {
                      title: "Meal Program",
                      selected: data.mealProgram,
                      stateKey: "mealProgram",
                    },
                    {
                      title: "Homebound Delivery Partner",
                      selected: data.homeboundDeliveryPartner,
                      stateKey: "homeboundDeliveryPartner",
                    },
                    {
                      title: "Large Scale Distribution Site",
                      selected: data.largeScaleDistributionSite,
                      stateKey: "largeScaleDistributionSite",
                    },
                    {
                      title: "Residential Facility or Group Home",
                      selected: data.residentialFacility,
                      stateKey: "residentialFacility",
                    },
                  ]}
                />
              </FormCol>
            </FormRow>
          </div>

          <div className="form-section">
            <FormSectionHeader title="Capacity" />
            <FormRow>
              <FormCol>
                <InputIncrementerBoxList
                  label="Storage and Type:"
                  subLabel="Select Quantity if Storage Type is Available"
                  options={[
                    {
                      title: "Stand Alone Freezer",
                      value: data.standAloneFreezer,
                      stateKey: "standAloneFreezer",
                    },
                    {
                      title: "Freezer Fridge",
                      value: data.freezerFridge,
                      stateKey: "freezerFridge",
                    },
                    {
                      title: "Chest Freezer",
                      value: data.chestFreezer,
                      stateKey: "chestFreezer",
                    },
                    {
                      title: "Single-Door Stand Alone Freezer",
                      value: data.singleDoorFreezer,
                      stateKey: "singleDoorFreezer",
                    },
                    {
                      title: "Freezer-Refrigerator Combo",
                      value: data.freezerFridgeCombo,
                      stateKey: "freezerFridgeCombo",
                    },
                    {
                      title: "Walk-in Freezer",
                      value: data.walkInFreezer,
                      stateKey: "walkInFreezer",
                    },
                    {
                      title: "Double-Door Stand Alone Fridge",
                      value: data.doubleDoorFridge,
                      stateKey: "doubleDoorFridge",
                    },
                    {
                      title: "Side By Side Fridge",
                      value: data.sideBySideFridge,
                      stateKey: "sideBySideFridge",
                    },
                    {
                      title: "Single-Door Stand Alone Fridge",
                      value: data.singleDoorFridge,
                      stateKey: "singleDoorFridge",
                    },
                    {
                      title: "Walk-in Fridge",
                      value: data.walkInFridge,
                      stateKey: "walkInFridge",
                    },
                    {
                      title: "Dry Storage (Climate Controlled)",
                      value: data.dryStorageClimateControl,
                      stateKey: "dryStorageClimateControl",
                    },
                    {
                      title: "Dry Storage (Non-Climate Controlled)",
                      value: data.dryStorageNonClimateControl,
                      stateKey: "dryStorageNonClimateControl",
                    },
                  ]}
                  onChange={this.handleInputChange}
                  twoColumns
                />
              </FormCol>
            </FormRow>

            <FormRow>
              <FormCol>
                <InputIncrementerBoxList
                  label="Transport and Type:"
                  subLabel="Select Quantity if Transport Type is Available"
                  options={[
                    {
                      title: "Pick-up Truck",
                      value: data.pickUpTruck,
                      stateKey: "pickUpTruck",
                    },
                    {
                      title: "Van",
                      value: data.van,
                      stateKey: "van",
                    },
                    {
                      title: "Car",
                      value: data.car,
                      stateKey: "car",
                    },
                  ]}
                  onChange={this.handleInputChange}
                />
              </FormCol>
            </FormRow>
          </div>

          <div className="form-section">
            <FormSectionHeader title="Retail Rescue" />
            <InputCheckboxList
              label="Check Boxes if Available."
              options={[
                {
                  title: "Retail Rescue",
                  selected: data.retailRescue,
                  stateKey: "retailRescue",
                },
                {
                  title: "Prepared Food Capacity",
                  selected: data.preparedFoodCapacity,
                  stateKey: "preparedFoodCapacity",
                },
                {
                  title: "Capacity with RR with Delivery",
                  selected: data.capacityWithRRD,
                  stateKey: "capacityWithRRD",
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
                  selected: data.youth,
                  stateKey: "youth",
                },
                {
                  title: "Senior",
                  selected: data.senior,
                  stateKey: "senior",
                },
                {
                  title: "Homeless",
                  selected: data.homeless,
                  stateKey: "homeless",
                },
                {
                  title: "Veteran/Military",
                  selected: data.veteran,
                  stateKey: "veteran",
                },
                {
                  title: "Healthcare",
                  selected: data.healthcare,
                  stateKey: "healthcare",
                },
                {
                  title: "College/University",
                  selected: data.college,
                  stateKey: "college",
                },
                {
                  title: "Disability Specific (Physical or Mental)",
                  selected: data.disabilitySpecific,
                  stateKey: "disabilitySpecific",
                },
                {
                  title: "Residential",
                  selected: data.residential,
                  stateKey: "residential",
                },
                {
                  title: "Immigrant",
                  selected: data.immigrant,
                  stateKey: "immigrant",
                },
              ]}
              onChange={this.handleInputChange}
              twoColumns
            />
          </div>

          <div className="form-section">
            <FormRow>
              <FormCol>
                <h2
                  className="form-section-title"
                  style={{ marginTop: 7, marginRight: 24 }}
                >
                  Assigned Staff
                </h2>
              </FormCol>
              <FormCol>
                <InlineDropdown
                  label={null}
                  options={["Mia", "Charlie", "Eli", "Kate"]}
                  initial={this.state.staff}
                  stateKey="staff"
                  onChange={this.handleInputChange}
                  valid={this.isValid("staff")}
                />
              </FormCol>
            </FormRow>
          </div>

          <div className="form-section">
            <div className="form-button-container">
              <button
                type="button"
                className="form-button-submit"
                onClick={this.submitForm}
              >
                {this.props.editSection ? "Save Profile" : "Create Profile"}
              </button>
              <button
                type="button"
                className="form-button-cancel"
                onClick={this.cancelForm}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(AgencyProfileForm);
