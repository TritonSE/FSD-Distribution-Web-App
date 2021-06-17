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
import DateList from "./DistributionCalendar/DateList";
import InlineDropdown from "../FormComponents/InlineDropdown";
import "typeface-roboto";
import "./FormStyle.css";
import { getJWT } from "../../auth";
import RetailRescueDays from "./RetailRescueDays";
import { BACKEND_URL } from "../../config";

const DAYS_OF_WEEK = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

/**
 * AgencyProfileForm describes the whole agency form page.
 *
 * Expected props:
 * - {Object} agencyData: object following agency schema (if editing an
 * existing agency)
 * - {Boolean} editing: true if editing an existing agency, false otherwise
 *
 * Available section names (for hash linking):
 * - location
 * - contacts
 * - compliance
 * - distribution
 * - capacity
 * - retail-rescue
 * - demographics
 * - staff
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
        distributionExcludedTimes: {
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
        userExcludedDDates: [],
        userExcludedRDates: [],
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
        retailRescueExcludedTimes: {
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
    } else {
      data = { ...data };
      data.tableContent = { ...data.tableContent };
      data.additionalAddresses = [...data.additionalAddresses];
      data.contacts = data.contacts.map((obj) => ({ ...obj }));
      data.distributionDays = { ...data.distributionDays };
      data.distributionStartTimes = { ...data.distributionStartTimes };
      data.retailRescueDays = { ...data.retailRescueDays };
      data.retailRescueStartTimes = { ...data.retailRescueStartTimes };
      data.retailRescueLocations = { ...data.retailRescueLocations };

      // unfix date/time formats
      // ISO 8601 format: "YYYY-MM-DDThh:mm" (literal T)
      for (const day of DAYS_OF_WEEK) {
        if (data.distributionDays[day]) {
          const timeString = data.distributionStartTimes[day];
          data.distributionStartTimes[day] = timeString.slice(11, 16);
        }
        if (data.retailRescueDays[day]) {
          const timeString = data.retailRescueStartTimes[day];
          data.retailRescueStartTimes[day] = timeString.slice(11, 16);
        }
      }
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
    const data = { ...this.state };

    data.tableContent = { ...data.tableContent };
    data.tableContent.phone = data.contacts[0].phoneNumber;

    // fix distribution and retail rescue formats
    // ISO 8601 format: "YYYY-MM-DDThh:mm" (literal T)
    const timeBase = `${AgencyProfileForm.fixDate(data.distributionStartDate)}T`;
    data.distributionStartTimes = { ...data.distributionStartTimes };
    data.retailRescueStartTimes = { ...data.retailRescueStartTimes };
    data.retailRescueLocations = { ...data.retailRescueLocations };
    for (const day of DAYS_OF_WEEK) {
      if (data.distributionDays[day]) {
        // this day is selected, so fix the time format
        const time = data.distributionStartTimes[day]; // "hh:mm"
        data.distributionStartTimes[day] = timeBase + time;
      } else {
        // not selected
        data.distributionStartTimes[day] = "";
      }

      if (data.retailRescueDays[day]) {
        // this day is selected, so fix the time format
        const time = data.retailRescueStartTimes[day]; // "hh:mm"
        data.retailRescueStartTimes[day] = timeBase + time;
      } else {
        // not selected
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
   * Changes date format from MM/DD/YYYY to YYYY-MM-DD.
   * @param {String} date Date string with format MM/DD/YYYY
   * @returns Date string with format YYYY-MM-DD
   */
  static fixDate(date) {
    return `${date.slice(6)}-${date.slice(0, 2)}-${date.slice(3, 5)}`;
  }

  /**
   * Callback to handle when the user makes changes to any input field. Updates
   * the state with the given key and value, if the key already exists in the
   * state.
   * @param {String} key The key to update in the state
   * @param {Any} newValue The new value to set for the key
   */
  handleInputChange = (key, newValue) => {
    const index = key.indexOf(".");
    if (index !== -1) {
      const key1 = key.slice(0, index);
      const key2 = key.slice(index + 1);
      if (key1 in this.state && key2 in this.state[key1]) {
        this.setState((prevState) => {
          const updated = { ...prevState[key1] };
          updated[key2] = newValue;
          return { [key1]: updated };
        });
      }
    } else if (key in this.state) {
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
    const updatedAddresses = addresses.slice();
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
    const updatedAddresses = addresses.slice();
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
    const { contacts } = this.state;
    const updatedContacts = contacts.slice();
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
    const { contacts } = this.state;
    const updatedContacts = contacts.slice();
    updatedContacts.pop();
    this.setState({
      contacts: updatedContacts,
    });
  };

  /**
   * Handles form submission.
   */
  submitForm = () => {
    const { history, agencyData, editing } = this.props;
    const formData = this.prepareData();

    let url = `${BACKEND_URL}/agency/`;
    if (editing) {
      url += agencyData._id;
    }

    if (editing) {
      // delete all notes from changed recurring events - will exec max 6 times
      for (const day of Object.keys(formData.distributionStartTimes)) {
        if (
          formData.distributionStartTimes[day] === "" ||
          formData.distributionStartTimes[day] !== agencyData.distributionStartTimes[day]
        ) {
          const recurringID = `${agencyData._id}${
            agencyData.distributionStartTimes[day]
          }${day.substring(0, 2)}D`;
          const milisecFromEpoch = new Date(agencyData.distributionStartTimes[day]).getTime();
          fetch(`${BACKEND_URL}/notes/`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getJWT()}`,
            },
            body: JSON.stringify({
              rID: recurringID,
              tFE: milisecFromEpoch,
            }),
          }).catch((error) => console.error(error));
        }

        // also handle retail rescue notes
        if (
          formData.retailRescueStartTimes[day] === "" ||
          formData.retailRescueStartTimes[day] !== agencyData.retailRescueStartTimes[day]
        ) {
          const recurringID = `${agencyData._id}${
            agencyData.retailRescueStartTimes[day]
          }${day.substring(0, 2)}R`;
          const milisecFromEpoch = new Date(agencyData.retailRescueStartTimes[day]).getTime();
          fetch(`${BACKEND_URL}/notes/`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getJWT()}`,
            },
            body: JSON.stringify({
              rID: recurringID,
              tFE: milisecFromEpoch,
            }),
          }).catch((error) => console.error(error));
        }
      }
      // delete notes of any events that were removed
      for (const currDate of formData.userExcludedDDates) {
        if (!agencyData.userExcludedDDates.includes(currDate)) {
          const noteID = `${formData._id}${currDate}D`;
          fetch(`${BACKEND_URL}/notes/${noteID}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getJWT()}`,
            },
          }).catch((error) => console.error(error));
        }
      }
    }

    fetch(url, {
      method: editing ? "POST" : "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getJWT()}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        response.json().then((data) => {
          if (!response.ok) {
            if (data.fields) {
              const errors = data.fields.filter((x) => x !== null);
              this.setState({ errors });
              const message = `${errors.length} error(s) found!`;
              alert(message);
            }
          } else if (history) {
            history.push(`/agency-profile/${data.agency._id}`);
          }
        });
      })
      .catch((error) => console.error(error));
  };

  /**
   * Handles form cancellation.
   */
  cancelForm = () => {
    const { history, agencyData, editing } = this.props;
    if (editing) {
      history.push(`/agency-profile/${agencyData._id}`);
    } else if (history) {
      history.push("/agency");
    }
  };

  render() {
    const data = this.state;
    const { editing } = this.props;

    return (
      <div className="form-body">
        <h1 className="form-title">
          {editing ? "Update Agency Profile." : "Add a New Agency Profile."}
        </h1>

        <form>
          <div className="form-section" id="main">
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

          <div className="form-section" id="location">
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
                <SmallButton text="Add Address" symbol="+" onClick={this.addAddress} />
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

          <div className="form-section" id="contacts">
            <FormSectionHeader title="Contacts" />
            <ContactsList
              items={data.contacts}
              stateKey="contacts"
              onChange={this.handleInputChange}
              validCheck={this.isValid}
            />
            <FormRow>
              <span className="small-button-span">
                <SmallButton text="Add Contact" symbol="+" onClick={this.addContact} />
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

          <div className="form-section" id="compliance">
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

          <div className="form-section" id="distribution">
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
                <CheckboxList
                  label="Check Boxes if Available/Correct."
                  gutter
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
            <FormRow>
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
                  distributionStartTimes={[
                    data.distributionStartTimes.sunday,
                    data.distributionStartTimes.monday,
                    data.distributionStartTimes.tuesday,
                    data.distributionStartTimes.wednesday,
                    data.distributionStartTimes.thursday,
                    data.distributionStartTimes.friday,
                    data.distributionStartTimes.saturday,
                  ]}
                  distributionExcludedTimes={[
                    data.distributionExcludedTimes.sunday,
                    data.distributionExcludedTimes.monday,
                    data.distributionExcludedTimes.tuesday,
                    data.distributionExcludedTimes.wednesday,
                    data.distributionExcludedTimes.thursday,
                    data.distributionExcludedTimes.friday,
                    data.distributionExcludedTimes.saturday,
                  ]}
                  userSelectedDates={data.userSelectedDates}
                  userExcludedDates={data.userExcludedDDates}
                  onChange={this.handleInputChange}
                  validCheck={this.isValid}
                />
              </FormCol>
              <FormCol>
                <DateList
                  dates={data.userSelectedDates}
                  stateKey="userSelectedDates"
                  onChange={this.handleInputChange}
                  validCheck={this.isValid}
                />
              </FormCol>
            </FormRow>
          </div>

          <div className="form-section" id="capacity">
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

          <div className="form-section" id="retail-rescue">
            <FormSectionHeader title="Retail Rescue" />
            <RetailRescueDays
              values={[
                {
                  title: "Monday",
                  selected: data.retailRescueDays.monday,
                  time: data.retailRescueStartTimes.monday,
                  location: data.retailRescueLocations.monday,
                  stateKey: "retailRescueDays.monday",
                  timeStateKey: "retailRescueStartTimes.monday",
                  locationStateKey: "retailRescueLocations.monday",
                },
                {
                  title: "Tuesday",
                  selected: data.retailRescueDays.tuesday,
                  time: data.retailRescueStartTimes.tuesday,
                  location: data.retailRescueLocations.tuesday,
                  stateKey: "retailRescueDays.tuesday",
                  timeStateKey: "retailRescueStartTimes.tuesday",
                  locationStateKey: "retailRescueLocations.tuesday",
                },
                {
                  title: "Wednesday",
                  selected: data.retailRescueDays.wednesday,
                  time: data.retailRescueStartTimes.wednesday,
                  location: data.retailRescueLocations.wednesday,
                  stateKey: "retailRescueDays.wednesday",
                  timeStateKey: "retailRescueStartTimes.wednesday",
                  locationStateKey: "retailRescueLocations.wednesday",
                },
                {
                  title: "Thursday",
                  selected: data.retailRescueDays.thursday,
                  time: data.retailRescueStartTimes.thursday,
                  location: data.retailRescueLocations.thursday,
                  stateKey: "retailRescueDays.thursday",
                  timeStateKey: "retailRescueStartTimes.thursday",
                  locationStateKey: "retailRescueLocations.thursday",
                },
                {
                  title: "Friday",
                  selected: data.retailRescueDays.friday,
                  time: data.retailRescueStartTimes.friday,
                  location: data.retailRescueLocations.friday,
                  stateKey: "retailRescueDays.friday",
                  timeStateKey: "retailRescueStartTimes.friday",
                  locationStateKey: "retailRescueLocations.friday",
                },
                {
                  title: "Saturday",
                  selected: data.retailRescueDays.saturday,
                  time: data.retailRescueStartTimes.saturday,
                  location: data.retailRescueLocations.saturday,
                  stateKey: "retailRescueDays.saturday",
                  timeStateKey: "retailRescueStartTimes.saturday",
                  locationStateKey: "retailRescueLocations.saturday",
                },
                {
                  title: "Sunday",
                  selected: data.retailRescueDays.sunday,
                  time: data.retailRescueStartTimes.sunday,
                  location: data.retailRescueLocations.sunday,
                  stateKey: "retailRescueDays.sunday",
                  timeStateKey: "retailRescueStartTimes.sunday",
                  locationStateKey: "retailRescueLocations.sunday",
                },
              ]}
              onChange={this.handleInputChange}
              validCheck={this.isValid}
            />
          </div>

          <div className="form-section" id="demographics">
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

          <div className="form-section" id="staff">
            <FormRow>
              <FormCol>
                <h2 className="form-section-title" style={{ marginTop: 7, marginRight: 24 }}>
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
                title={editing ? "Save Profile" : "Create Profile"}
                type="primary"
                onClick={this.submitForm}
              />
              <FormButton title="Cancel" type="secondary" onClick={this.cancelForm} />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(AgencyProfileForm);
