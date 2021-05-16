import React from "react";
import TestRenderer from "react-test-renderer";
import AgencyProfileForm from "../src/components/AgencyProfileForm/AgencyProfileForm";

const generateTestData = () => ({
  tableContent: {
    agencyNumber: "1",
    name: "A",
    status: "B",
    region: "2",
    city: "C",
    staff: "D",
    dateOfInitialPartnership: "01/01/1970",
    standAloneFreezer: 3,
    freezerFridge: 4,
    chestFreezer: 5,
    singleDoorFreezer: 6,
    freezerFridgeCombo: 7,
    walkInFreezer: 8,
    doubleDoorFridge: 9,
    sideBySideFridge: 10,
    singleDoorFridge: 11,
    walkInFridge: 12,
    dryStorageClimateControl: 13,
    dryStorageNonClimateControl: 14,
    pickUpTruck: 15,
    van: 16,
    car: 17,
  },
  mainSiteAddress: "E",
  sanDiegoDistrict: "18",
  countyDistrict: "19",
  stateAssemblyDistrict: "20",
  stateSenateDistrict: "21",
  federalCongressionalDistrict: "22",
  additionalAddresses: ["F", "G"],
  billingAddress: "H",
  billingZipcode: "99999",
  contacts: [
    {
      contact: "I",
      position: "J",
      phoneNumber: "555-456-7890",
      email: "k@k.com",
    },
  ],
  scheduledNextVisit: "01/02/1970",
  dateOfMostRecentAgreement: "01/03/1970",
  fileAudit: "01/04/1970",
  monitored: "01/05/1970",
  foodSafetyCertification: "01/06/1970",
  distributionDays: {
    monday: true,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  },
  distributionStartTimes: {
    monday: "1970-01-07T12:34-07:00", // expect reformat
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
  },
  distributionStartDate: "01/07/1970",
  distributionFrequency: "23",
  userSelectedDates: ["2021-01-01T00:00-07:00", "2021-01-02T10:59-07:00"], // expect reformat
  userExcludedDates: ["2021-01-04", "2021-01-11"],
  pantry: true,
  mealProgram: false,
  homeboundDeliveryPartner: true,
  largeScaleDistributionSite: false,
  residentialFacility: true,
  retailRescueDays: {
    monday: false,
    tuesday: true,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  },
  retailRescueStartTimes: {
    monday: "",
    tuesday: "1970-01-07T12:00-07:00", // expect reformat
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
  },
  retailRescueLocations: {
    monday: "",
    tuesday: "L",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
  },
  youth: true,
  senior: false,
  homeless: true,
  veteran: false,
  healthcare: true,
  college: false,
  disabilitySpecific: true,
  residential: false,
  immigrant: true,
});

describe("AgencyProfileForm.constructor", () => {
  it("populates state with default values when no data is given", () => {
    // checks the state after passing in no agencyData
    const component = TestRenderer.create(<AgencyProfileForm.WrappedComponent agencyData={null} />)
      .root.instance;

    expect(component.state.tableContent.name).toBe("");
    expect(component.state.tableContent.pickUpTruck).toBe(0);
    expect(component.state.countyDistrict).toBe("");
    expect(component.state.additionalAddresses).toEqual([""]);
    expect(component.state.contacts).toEqual([
      { contact: "", position: "", phoneNumber: "", email: "" },
    ]);
    expect(component.state.distributionDays.monday).toBe(false);
    expect(component.state.distributionStartTimes.friday).toBe("");
    expect(component.state.userSelectedDates).toEqual([]);
    expect(component.state.pantry).toBe(false);
    expect(component.state.retailRescueDays.wednesday).toBe(false);
    expect(component.state.retailRescueStartTimes.sunday).toBe("");
    expect(component.state.retailRescueLocations.tuesday).toBe("");
  });

  it("processes agency data correctly", () => {
    // checks the state after passing in some data
    let testData = generateTestData();
    const component = TestRenderer.create(
      <AgencyProfileForm.WrappedComponent agencyData={testData} />
    ).root.instance;

    // the toEqual() assertion does a recursive check for "deep" equality -
    // here the assertion is NOT because we expect the constructor to reformat certain values when
    // it copies everything
    expect(component.state).not.toEqual(testData);

    testData.distributionStartTimes.monday = "12:34";
    testData.retailRescueStartTimes.tuesday = "12:00";
    testData.userSelectedDates = ["2021-01-01T00:00", "2021-01-02T10:59"];

    // now assert equality
    expect(component.state).toEqual(testData);
  });
});

describe("AgencyProfileForm.prepareData", () => {
  it("processes data in state correctly", () => {
    // checks the output to make sure it is formatted correctly for the database
    let testData = generateTestData();
    const component = TestRenderer.create(
      <AgencyProfileForm.WrappedComponent agencyData={testData} />
    ).root.instance;

    testData.tableContent.phone = "555-456-7890";
    // the toEqual() assertion does a recursive check for "deep" equality -
    // here we compare to the original testData because that object is formatted like in the db
    expect(component.prepareData()).toEqual(testData);

    // check that objects in state were not mutated
    expect(component.state.tableContent.phone).toBeUndefined();
    expect(component.state.distributionStartTimes.monday).toBe("12:34");
    expect(component.state.retailRescueStartTimes.tuesday).toBe("12:00");
    expect(component.state.userSelectedDates).toEqual(["2021-01-01T00:00", "2021-01-02T10:59"]);
  });
});

describe("AgencyProfileForm.handleInputChange", () => {
  it("updates state for existing keys", () => {
    // calls handleInputChange() with various (known) keys and test values to
    // check that it updates AgencyProfileForm's state correctly
    const component = TestRenderer.create(<AgencyProfileForm.WrappedComponent agencyData={null} />)
      .root.instance;

    // string value
    expect(component.state.mainSiteAddress).toBe("");
    component.handleInputChange("mainSiteAddress", "123 abc");
    expect(component.state.mainSiteAddress).toBe("123 abc");

    // embedded object string value
    expect(component.state.tableContent.name).toBe("");
    component.handleInputChange("tableContent.name", "Test Name");
    expect(component.state.tableContent.name).toBe("Test Name");

    // string array value
    expect(component.state.additionalAddresses).toEqual([""]);
    component.handleInputChange("additionalAddresses", ["address1"]);
    expect(component.state.additionalAddresses).toEqual(["address1"]);

    // object array value
    expect(component.state.contacts).toEqual([
      {
        contact: "",
        position: "",
        phoneNumber: "",
        email: "",
      },
    ]);
    component.handleInputChange("contacts", [
      {
        contact: "A",
        position: "S",
        phoneNumber: "D",
        email: "F",
      },
    ]);
    expect(component.state.contacts).toEqual([
      {
        contact: "A",
        position: "S",
        phoneNumber: "D",
        email: "F",
      },
    ]);

    // boolean value
    expect(component.state.distributionDays.monday).toBe(false);
    component.handleInputChange("distributionDays.monday", true);
    expect(component.state.distributionDays.monday).toBe(true);

    // number value
    expect(component.state.tableContent.standAloneFreezer).toBe(0);
    component.handleInputChange("tableContent.standAloneFreezer", 3);
    expect(component.state.tableContent.standAloneFreezer).toBe(3);

    // same boolean value again
    expect(component.state.distributionDays.monday).toBe(true);
    component.handleInputChange("distributionDays.monday", false);
    expect(component.state.distributionDays.monday).toBe(false);

    // same string value again
    expect(component.state.mainSiteAddress).toBe("123 abc");
    component.handleInputChange("mainSiteAddress", "456 def");
    expect(component.state.mainSiteAddress).toBe("456 def");
  });

  it("doesn't update state for unknown keys", () => {
    // calls handleInputChange() with an unknown key to check that it rejects
    // the change and doesn't add it to the state
    const component = TestRenderer.create(<AgencyProfileForm.WrappedComponent agencyData={null} />)
      .root.instance;

    expect(component.state.keyThatShouldNotBeUsed).toBeUndefined();
    component.handleInputChange("keyThatShouldNotBeUsed", "abcd");
    expect(component.state.keyThatShouldNotBeUsed).toBeUndefined();

    expect(component.state.tableContent.unknownKey).toBeUndefined();
    component.handleInputChange("tableContent.unknownKey", "abcd");
    expect(component.state.tableContent.unknownKey).toBeUndefined();
  });
});

describe("AgencyProfileForm.isValid", () => {
  it("returns true for valid fields", () => {
    // checks that isValid() correctly identifies valid fields (which are not in the errors list)
    const component = TestRenderer.create(<AgencyProfileForm.WrappedComponent agencyData={null} />)
      .root.instance;
    component.setState({ errors: ["field1", "field3", "field5"] });

    expect(component.isValid("field2")).toBe(true);
    expect(component.isValid("field4")).toBe(true);
  });

  it("returns false for invalid fields", () => {
    // checks that isValid() correctly identifies invalid fields (which are present in the errors
    // list)
    const component = TestRenderer.create(<AgencyProfileForm.WrappedComponent agencyData={null} />)
      .root.instance;
    component.setState({ errors: ["field1", "field3", "field5"] });

    expect(component.isValid("field1")).toBe(false);
    expect(component.isValid("field5")).toBe(false);
  });

  it("returns true before validation has occurred", () => {
    // checks that isValid() treats all fields as valid when there is no errors list yet
    const component = TestRenderer.create(<AgencyProfileForm.WrappedComponent agencyData={null} />)
      .root.instance;

    expect(component.isValid("field1")).toBe(true);
    expect(component.isValid("field2")).toBe(true);
  });
});

describe("AgencyProfileForm.addAddress", () => {
  it("adds an empty string to the array of additional addresses", () => {
    // checks that addAddress() does append an empty string to the string array
    // holding additional addresses in the state
    const component = TestRenderer.create(<AgencyProfileForm.WrappedComponent agencyData={null} />)
      .root.instance;

    component.handleInputChange("additionalAddresses", ["address1"]);
    // the toEqual() assertion does a recursive check for "deep" equality
    expect(component.state.additionalAddresses).toEqual(["address1"]);
    component.addAddress();
    expect(component.state.additionalAddresses).toEqual(["address1", ""]);
    component.addAddress();
    expect(component.state.additionalAddresses).toEqual(["address1", "", ""]);
  });
});

describe("AgencyProfileForm.removeAddress", () => {
  it("removes the last string in the array of additional addresses", () => {
    // checks that removeAddress() does remove the last element from the string array
    // holding additional addresses in the state
    const component = TestRenderer.create(<AgencyProfileForm.WrappedComponent agencyData={null} />)
      .root.instance;

    component.handleInputChange("additionalAddresses", ["address1", "address2", "address3"]);
    // the toEqual() assertion does a recursive check for "deep" equality
    expect(component.state.additionalAddresses).toEqual(["address1", "address2", "address3"]);
    component.removeAddress();
    expect(component.state.additionalAddresses).toEqual(["address1", "address2"]);
    component.removeAddress();
    expect(component.state.additionalAddresses).toEqual(["address1"]);
  });
});

describe("AgencyProfileForm.addContact", () => {
  it("adds a new contact object to the array of contacts", () => {
    // checks that addContact() does append a "blank" contact object (with
    // correct keys, mapped to empty strings) to the array holding contact info
    // in the state
    const component = TestRenderer.create(<AgencyProfileForm.WrappedComponent agencyData={null} />)
      .root.instance;
    const blankContact = {
      contact: "",
      position: "",
      phoneNumber: "",
      email: "",
    };
    const testContact = {
      contact: "A",
      position: "S",
      phoneNumber: "D",
      email: "F",
    };

    component.handleInputChange("contacts", [testContact]);
    // the toEqual() assertion does a recursive check for "deep" equality
    expect(component.state.contacts).toEqual([testContact]);
    component.addContact();
    expect(component.state.contacts).toEqual([testContact, blankContact]);
    component.addContact();
    expect(component.state.contacts).toEqual([testContact, blankContact, blankContact]);
  });
});

describe("AgencyProfileForm.removeContact", () => {
  it("removes the last contact object in the array of contacts", () => {
    // checks that removeContact() does remove the last element in the array holding contact info
    // in the state
    const component = TestRenderer.create(<AgencyProfileForm.WrappedComponent agencyData={null} />)
      .root.instance;
    const contact1 = { contact: "A", position: "S", phoneNumber: "D", email: "F" };
    const contact2 = { contact: "Q", position: "W", phoneNumber: "E", email: "R" };
    const contact3 = { contact: "T", position: "Y", phoneNumber: "U", email: "I" };

    component.handleInputChange("contacts", [contact1, contact2, contact3]);
    // the toEqual() assertion does a recursive check for "deep" equality
    expect(component.state.contacts).toEqual([contact1, contact2, contact3]);
    component.removeContact();
    expect(component.state.contacts).toEqual([contact1, contact2]);
    component.removeContact();
    expect(component.state.contacts).toEqual([contact1]);
  });
});
