import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import FormSectionHeader from "./FormSectionHeader";
import { FormRow, FormCol } from "./FormLayout";
import InputText from "../FormComponents/InputText";
import InputDate from "../FormComponents/InputDate";
import InputDropdown from "../FormComponents/InputDropdown";
import CheckboxList from "./CheckboxList";
import IncrementerBoxList from "./IncrementerBoxList";
import FormButton from "../FormComponents/FormButton";
import SmallButton from "./SmallButton";
import AddressList from "./AddressList";
import ContactsList from "./ContactsList";
import DistributionDays from "./DistributionDays";
import Calendar from "./DistributionCalendar/Calendar";
import InlineDropdown from "../FormComponents/InlineDropdown";
import "typeface-roboto";
import "./FormStyle.css";
import { getJWT } from "../../auth";

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
        tableContent: {
          agencyNumber: "",
          name: "",
          status: "",
          region: "",
          city: "",
          staff: "",
          dateOfInitialPartnership: "",
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
        },
        mainSiteAddress: "",
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
        fileAudit: "",
        monitored: "",
        foodSafetyCertification: "",
        distributionDays: {
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false,
          sunday: false,
        },
        distributionStartTimes: {
          monday: "",
          tuesday: "",
          wednesday: "",
          thursday: "",
          friday: "",
          saturday: "",
          sunday: "",
        },
        distributionStartDate: "",
        distributionFrequency: "1",
        userSelectedDates: [],
        userExcludedDates: [],
        pantry: false,
        mealProgram: false,
        homeboundDeliveryPartner: false,
        largeScaleDistributionSite: false,
        residentialFacility: false,
        retailRescueDays: {
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false,
          sunday: false,
        },
        retailRescueStartTimes: {
          monday: "",
          tuesday: "",
          wednesday: "",
          thursday: "",
          friday: "",
          saturday: "",
          sunday: "",
        },
        retailRescueLocations: {
          monday: "",
          tuesday: "",
          wednesday: "",
          thursday: "",
          friday: "",
          saturday: "",
          sunday: "",
        },
        youth: false,
        senior: false,
        homeless: false,
        veteran: false,
        healthcare: false,
        college: false,
        disabilitySpecific: false,
        residential: false,
        immigrant: false,
        tasks: [],
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

    data.tableContent.phone = data.contacts[0].phoneNumber;

    // ignore any secondary input values for days that are not selected
    const days = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];
    for (let day of days) {
      if (!data.distributionDays[day]) {
        data.distributionStartTimes[day] = "";
      }
      if (!data.retailRescueDays[day]) {
        data.retailRescueStartTimes[day] = "";
        data.retailRescueLocations[day] = "";
      }
    }

    // Remove empty strings in additionalAddresses
    data.additionalAddresses = data.additionalAddresses.filter((x) => x !== "");

    // extra fields will be ignored by mongoose
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
    let index = key.indexOf(".");
    if (index !== -1) {
      let key1 = key.slice(0, index);
      let key2 = key.slice(index + 1);
      if (this.state.hasOwnProperty(key1)) {
        let updated = { ...this.state[key1] };
        updated[key2] = newValue;
        this.setState({ [key1]: updated });
      }
    } else if (this.state.hasOwnProperty(key)) {
      this.setState({ [key]: newValue });
    }
  };

  /**
   * Returns whether the input field corresponding to the given key passed
   * validation (or has not been validated yet).
   * @param {String} key The key of the field to check
   */
  isValid = (key) => {
    const { errors } = this.state;
    return errors === undefined || !errors.includes(key);
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
        Authorization: "Bearer " + getJWT(),
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        response.json().then((data) => {
          if (!response.ok) {
            if (data.fields) {
              let errors = data.fields.filter((x) => x !== null);
              this.setState({ errors: errors });
              let message = `${errors.length} error(s) found!`;
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
                  value={data.tableContent.agencyNumber}
                  stateKey="tableContent.agencyNumber"
                  onChange={this.handleInputChange}
                  leftmost
                  required
                  valid={this.isValid("tableContent.agencyNumber")}
                />
              </FormCol>
              <FormCol>
                <InputText
                  label="Agency Name"
                  value={data.tableContent.name}
                  stateKey="tableContent.name"
                  onChange={this.handleInputChange}
                  required
                  wide
                  valid={this.isValid("tableContent.name")}
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
                  value={data.tableContent.city}
                  stateKey="tableContent.city"
                  onChange={this.handleInputChange}
                  required
                  valid={this.isValid("tableContent.city")}
                />
              </FormCol>
            </FormRow>

            <FormRow>
              <FormCol>
                <InputDropdown
                  label="Agency Status"
                  options={["Onboarding", "Active", "Inactive", "On Hold"]}
                  value={data.tableContent.status}
                  stateKey="tableContent.status"
                  onChange={this.handleInputChange}
                  leftmost
                  required
                  valid={this.isValid("tableContent.status")}
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
                  value={data.tableContent.region}
                  stateKey="tableContent.region"
                  onChange={this.handleInputChange}
                  leftmost
                  required
                  valid={this.isValid("tableContent.region")}
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
                {data.additionalAddresses.length > 1 && (
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
                {data.contacts.length > 1 && (
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
                  value={data.tableContent.dateOfInitialPartnership}
                  stateKey="tableContent.dateOfInitialPartnership"
                  onChange={this.handleInputChange}
                  required
                  valid={this.isValid("tableContent.dateOfInitialPartnership")}
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
                <DistributionDays
                  values={[
                    {
                      title: "Monday",
                      selected: data.distributionDays.monday,
                      time: data.distributionStartTimes.monday,
                      stateKey: "distributionDays.monday",
                      timeStateKey: "distributionStartTimes.monday",
                    },
                    {
                      title: "Tuesday",
                      selected: data.distributionDays.tuesday,
                      time: data.distributionStartTimes.tuesday,
                      stateKey: "distributionDays.tuesday",
                      timeStateKey: "distributionStartTimes.tuesday",
                    },
                    {
                      title: "Wednesday",
                      selected: data.distributionDays.wednesday,
                      time: data.distributionStartTimes.wednesday,
                      stateKey: "distributionDays.wednesday",
                      timeStateKey: "distributionStartTimes.wednesday",
                    },
                    {
                      title: "Thursday",
                      selected: data.distributionDays.thursday,
                      time: data.distributionStartTimes.thursday,
                      stateKey: "distributionDays.thursday",
                      timeStateKey: "distributionStartTimes.thursday",
                    },
                    {
                      title: "Friday",
                      selected: data.distributionDays.friday,
                      time: data.distributionStartTimes.friday,
                      stateKey: "distributionDays.friday",
                      timeStateKey: "distributionStartTimes.friday",
                    },
                    {
                      title: "Saturday",
                      selected: data.distributionDays.saturday,
                      time: data.distributionStartTimes.saturday,
                      stateKey: "distributionDays.saturday",
                      timeStateKey: "distributionStartTimes.saturday",
                    },
                    {
                      title: "Sunday",
                      selected: data.distributionDays.sunday,
                      time: data.distributionStartTimes.sunday,
                      stateKey: "distributionDays.sunday",
                      timeStateKey: "distributionStartTimes.sunday",
                    },
                  ]}
                  onChange={this.handleInputChange}
                  validCheck={this.isValid}
                />
              </FormCol>
              <FormCol>
                <InputDate
                  label="Start Date"
                  value={data.distributionStartDate}
                  stateKey="distributionStartDate"
                  onChange={this.handleInputChange}
                  required
                  valid={this.isValid("distributionStartDate")}
                />
                <InputText
                  label="Weekly Frequency"
                  value={data.distributionFrequency}
                  stateKey="distributionFrequency"
                  onChange={this.handleInputChange}
                  required
                  valid={this.isValid("distributionFrequency")}
                />
              </FormCol>
              <FormCol>
                <Calendar
                  label="Customize Distribution Schedule"
                  distributionStartDate={data.distributionStartDate}
                  distributionFrequency={data.distributionFrequency}
                  distributionDays={[
                    data.distributionDays.sunday,
                    data.distributionDays.monday,
                    data.distributionDays.tuesday,
                    data.distributionDays.wednesday,
                    data.distributionDays.thursday,
                    data.distributionDays.friday,
                    data.distributionDays.saturday,
                  ]}
                  userSelectedDates={data.userSelectedDates}
                  userExcludedDates={data.userExcludedDates}
                  onChange={this.handleInputChange}
                />
              </FormCol>
            </FormRow>
            <FormRow>
              <FormCol>
                <CheckboxList
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
                <IncrementerBoxList
                  label="Storage and Type:"
                  subLabel="Select Quantity if Storage Type is Available"
                  options={[
                    {
                      title: "Stand Alone Freezer",
                      value: data.tableContent.standAloneFreezer,
                      stateKey: "tableContent.standAloneFreezer",
                    },
                    {
                      title: "Freezer Fridge",
                      value: data.tableContent.freezerFridge,
                      stateKey: "tableContent.freezerFridge",
                    },
                    {
                      title: "Chest Freezer",
                      value: data.tableContent.chestFreezer,
                      stateKey: "tableContent.chestFreezer",
                    },
                    {
                      title: "Single-Door Stand Alone Freezer",
                      value: data.tableContent.singleDoorFreezer,
                      stateKey: "tableContent.singleDoorFreezer",
                    },
                    {
                      title: "Freezer-Refrigerator Combo",
                      value: data.tableContent.freezerFridgeCombo,
                      stateKey: "tableContent.freezerFridgeCombo",
                    },
                    {
                      title: "Walk-in Freezer",
                      value: data.tableContent.walkInFreezer,
                      stateKey: "tableContent.walkInFreezer",
                    },
                    {
                      title: "Double-Door Stand Alone Fridge",
                      value: data.tableContent.doubleDoorFridge,
                      stateKey: "tableContent.doubleDoorFridge",
                    },
                    {
                      title: "Side By Side Fridge",
                      value: data.tableContent.sideBySideFridge,
                      stateKey: "tableContent.sideBySideFridge",
                    },
                    {
                      title: "Single-Door Stand Alone Fridge",
                      value: data.tableContent.singleDoorFridge,
                      stateKey: "tableContent.singleDoorFridge",
                    },
                    {
                      title: "Walk-in Fridge",
                      value: data.tableContent.walkInFridge,
                      stateKey: "tableContent.walkInFridge",
                    },
                    {
                      title: "Dry Storage (Climate Controlled)",
                      value: data.tableContent.dryStorageClimateControl,
                      stateKey: "tableContent.dryStorageClimateControl",
                    },
                    {
                      title: "Dry Storage (Non-Climate Controlled)",
                      value: data.tableContent.dryStorageNonClimateControl,
                      stateKey: "tableContent.dryStorageNonClimateControl",
                    },
                  ]}
                  onChange={this.handleInputChange}
                  twoColumns
                />
              </FormCol>
            </FormRow>

            <FormRow>
              <FormCol>
                <IncrementerBoxList
                  label="Transport and Type:"
                  subLabel="Select Quantity if Transport Type is Available"
                  options={[
                    {
                      title: "Pick-up Truck",
                      value: data.tableContent.pickUpTruck,
                      stateKey: "tableContent.pickUpTruck",
                    },
                    {
                      title: "Van",
                      value: data.tableContent.van,
                      stateKey: "tableContent.van",
                    },
                    {
                      title: "Car",
                      value: data.tableContent.car,
                      stateKey: "tableContent.car",
                    },
                  ]}
                  onChange={this.handleInputChange}
                />
              </FormCol>
            </FormRow>
          </div>

          <div className="form-section">
            <FormSectionHeader title="Retail Rescue" />
          </div>

          <div className="form-section">
            <FormSectionHeader title="Demographics" />
            <CheckboxList
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
                  value={data.tableContent.staff}
                  stateKey="tableContent.staff"
                  onChange={this.handleInputChange}
                  valid={this.isValid("tableContent.staff")}
                />
              </FormCol>
            </FormRow>
          </div>

          <div className="form-section">
            <div className="form-button-container">
              <FormButton
                title={
                  this.props.editSection ? "Save Profile" : "Create Profile"
                }
                type="primary"
                onClick={this.submitForm}
              />
              <FormButton
                title="Cancel"
                type="secondary"
                onClick={this.cancelForm}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(AgencyProfileForm);
