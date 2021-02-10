import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { FormRow, FormCol } from "./FormLayout";
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
        primaryContact: "",
        mainSiteAddress: "",
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
      city: "city",
      phone: "555-456-7890",
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

    // Remove empty strings in additionalAddresses
    data.additionalAddresses = data.additionalAddresses.filter((x) => x !== "")


    delete data.agencyNumber;
    delete data.name;
    delete data.status;
    delete data.region;
    delete data.city;
    delete data.phone;
    delete data.staff;
    delete data.monday;
    delete data.tuesday;
    delete data.wednesday;
    delete data.thursday;
    delete data.friday;
    delete data.saturday;
    delete data.sunday;

    data.tableContent = tableContent;
    data.distributionDays = distributionDays;

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
          if (data.errors) {
            alert("error!!!!!!!!!!! :(");
          } else {
            if (history) {
              history.push("/agency/" + data._id);
            }
          }
        });
      })
      .catch((error) => console.error(error));
  };

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
                />
              </FormCol>
            </FormRow>

            <FormRow>
              <FormCol>
                <InputText
                  label="Primary Contact"
                  value={data.primaryContact}
                  stateKey="primaryContact"
                  onChange={this.handleInputChange}
                  leftmost
                  required
                />
              </FormCol>
              <FormCol>
                <InputText
                  label="Main Site Address"
                  value={data.mainSiteAddress}
                  stateKey="mainSiteAddress"
                  onChange={this.handleInputChange}
                  required
                  wide
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
                />
              </FormCol>
              <FormCol>
                <InputText
                  label="County District"
                  value={data.countyDistrict}
                  stateKey="countyDistrict"
                  onChange={this.handleInputChange}
                  required
                />
              </FormCol>
              <FormCol>
                <InputText
                  label="State Assembly District"
                  value={data.stateAssemblyDistrict}
                  stateKey="stateAssemblyDistrict"
                  onChange={this.handleInputChange}
                  required
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
                />
              </FormCol>
              <FormCol>
                <InputText
                  label="Federal Congressional District"
                  value={data.federalCongressionalDistrict}
                  stateKey="federalCongressionalDistrict"
                  onChange={this.handleInputChange}
                  required
                />
              </FormCol>
            </FormRow>

            <FormRow>
              <FormCol>
                <AddressList
                  addresses={data.additionalAddresses}
                  stateKey="additionalAddresses"
                  onChange={this.handleInputChange}
                />
              </FormCol>
            </FormRow>

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
                />
              </FormCol>
              <FormCol>
                <InputText
                  label="Billing Zipcode"
                  value={data.billingZipcode}
                  stateKey="billingZipcode"
                  onChange={this.handleInputChange}
                  required
                />
              </FormCol>
            </FormRow>
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
            <FormRow>
              <FormCol>
                <InputDate
                  label="Scheduled Next Visit"
                  value={data.scheduledNextVisit}
                  stateKey="scheduledNextVisit"
                  onChange={this.handleInputChange}
                  leftmost
                  required
                />
              </FormCol>
              <FormCol>
                <InputDate
                  label="Date of Most Recent Agreement"
                  value={data.dateOfMostRecentAgreement}
                  stateKey="dateOfMostRecentAgreement"
                  onChange={this.handleInputChange}
                  required
                />
              </FormCol>
              <FormCol>
                <InputDate
                  label="Date of Initial Partnership"
                  value={data.dateOfInitialPartnership}
                  stateKey="dateOfInitialPartnership"
                  onChange={this.handleInputChange}
                  required
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
                />
              </FormCol>
              <FormCol>
                <InputDate
                  label="Monitored"
                  value={data.monitored}
                  stateKey="monitored"
                  onChange={this.handleInputChange}
                  required
                />
              </FormCol>
              <FormCol>
                <InputDate
                  label="Food Safety Certification"
                  value={data.foodSafetyCertification}
                  stateKey="foodSafetyCertification"
                  onChange={this.handleInputChange}
                  required
                />
              </FormCol>
            </FormRow>
          </div>

          <div className="form-section">
            <FormSectionHeader title="Distribution" />
            <FormRow>
              <FormCol>
                <InputText
                  label="Main Site Phone #"
                  value={data.mainSitePhoneNumber}
                  stateKey="mainSitePhoneNumber"
                  onChange={this.handleInputChange}
                  leftmost
                />
              </FormCol>
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
                />
              </FormCol>
            </FormRow>

            <FormRow>
              <FormCol>
                <InputText
                  label="Distribution Hours"
                  value={data.distributionHours}
                  stateKey="distributionHours"
                  onChange={this.handleInputChange}
                  leftmost
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
                      title: "Pickup Truck",
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
                  stateKey="transportationCapacity"
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
