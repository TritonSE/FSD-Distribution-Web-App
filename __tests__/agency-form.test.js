import React from "react";
import TestRenderer from "react-test-renderer";
import AgencyProfileForm from "../src/pages/agency-profile-form/AgencyProfileForm";

describe("AgencyProfileForm.render", () => {
  it("renders correctly for adding a new agency", () => {
    // snapshot (UI) test for an initially-blank form - basically to check that
    // nothing disappears or changes in the interface
    const component = TestRenderer.create(
      <AgencyProfileForm agencyData={null} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("AgencyProfileForm.handleInputChange", () => {
  it("updates state for existing keys", () => {
    // calls handleInputChange() with various (known) keys and test values to
    // check that it updates AgencyProfileForm's state correctly
    const component = TestRenderer.create(
      <AgencyProfileForm agencyData={null} />
    ).root.instance;

    // string value
    expect(component.state.agencyNumber).toBe("");
    component.handleInputChange("agencyNumber", "12345");
    expect(component.state.agencyNumber).toBe("12345");

    // another string value
    expect(component.state.agencyName).toBe("");
    component.handleInputChange("agencyName", "Test Name");
    expect(component.state.agencyName).toBe("Test Name");

    // string array value
    expect(component.state.additionalAddresses).toEqual([""]);
    component.handleInputChange("additionalAddresses", ["address1"]);
    expect(component.state.additionalAddresses).toEqual(["address1"]);

    // contacts array value
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
    expect(component.state["distributionDay.monday"]).toBe(false);
    component.handleInputChange("distributionDay.monday", true);
    expect(component.state["distributionDay.monday"]).toBe(true);

    // number value
    expect(component.state["storageCapacity.standAloneFreezer"]).toBe(0);
    component.handleInputChange("storageCapacity.standAloneFreezer", 3);
    expect(component.state["storageCapacity.standAloneFreezer"]).toBe(3);

    // same boolean value again
    expect(component.state["distributionDay.monday"]).toBe(true);
    component.handleInputChange("distributionDay.monday", false);
    expect(component.state["distributionDay.monday"]).toBe(false);

    // same string value again
    expect(component.state.agencyNumber).toBe("12345");
    component.handleInputChange("agencyNumber", "67890");
    expect(component.state.agencyNumber).toBe("67890");
  });

  it("doesn't update state for unknown keys", () => {
    // calls handleInputChange() with an unknown key to check that it rejects
    // the change and doesn't add it to the state
    const component = TestRenderer.create(
      <AgencyProfileForm agencyData={null} />
    ).root.instance;

    expect(component.state.keyThatShouldNotBeUsed).toBeUndefined();
    component.handleInputChange("keyThatShouldNotBeUsed", "abcd");
    expect(component.state.keyThatShouldNotBeUsed).toBeUndefined();
  });
});

describe("AgencyProfileForm.addAddress", () => {
  it("adds an empty string to the array of additional addresses", () => {
    // checks that addAddress() does append an empty string to the string array
    // holding additional addresses in the state
    const component = TestRenderer.create(
      <AgencyProfileForm agencyData={null} />
    ).root.instance;

    component.handleInputChange("additionalAddresses", ["address1"]);
    // the toEqual() assertion does a recursive check for "deep" equality
    expect(component.state.additionalAddresses).toEqual(["address1"]);
    component.addAddress();
    expect(component.state.additionalAddresses).toEqual(["address1", ""]);
    component.addAddress();
    expect(component.state.additionalAddresses).toEqual(["address1", "", ""]);
  });
});

describe("AgencyProfileForm.addContact", () => {
  it("adds a new contact object to the array of contacts", () => {
    // checks that addContact() does append a "blank" contact object (with
    // correct keys, mapped to empty strings) to the array holding contact info
    // in the state
    const component = TestRenderer.create(
      <AgencyProfileForm agencyData={null} />
    ).root.instance;
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
    expect(component.state.contacts).toEqual([
      testContact,
      blankContact,
      blankContact,
    ]);
  });
});
