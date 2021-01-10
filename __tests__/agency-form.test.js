import React from "react";
import TestRenderer from "react-test-renderer";
import AgencyProfileForm from "../src/pages/agency-profile-form/AgencyProfileForm";

/*describe("Addition", () => {
  it("knows that 2 plus 2 is 4", () => {
    expect(2 + 2).toBe(4);
  });
});*/

describe("AgencyProfileForm.render", () => {
  it("renders correctly for adding a new agency", () => {
    const component = TestRenderer.create(
      <AgencyProfileForm agencyData={null} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("AgencyProfileForm.handleInputChange", () => {
  it("updates state for existing keys", () => {
    const component = TestRenderer.create(
      <AgencyProfileForm agencyData={null} />
    ).root.instance;

    expect(component.state.agencyNumber).toBe("");
    component.handleInputChange("agencyNumber", "12345");
    expect(component.state.agencyNumber).toBe("12345");

    expect(component.state.agencyName).toBe("");
    component.handleInputChange("agencyName", "Test Name");
    expect(component.state.agencyName).toBe("Test Name");

    expect(component.state.additionalAddresses).toEqual([""]);
    component.handleInputChange("additionalAddresses", ["address1"]);
    expect(component.state.additionalAddresses).toEqual(["address1"]);

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

    expect(component.state["distributionDay.monday"]).toBe(false);
    component.handleInputChange("distributionDay.monday", true);
    expect(component.state["distributionDay.monday"]).toBe(true);

    expect(component.state["storageCapacity.standAloneFreezer"]).toBe(0);
    component.handleInputChange("storageCapacity.standAloneFreezer", 3);
    expect(component.state["storageCapacity.standAloneFreezer"]).toBe(3);

    expect(component.state["distributionDay.monday"]).toBe(true);
    component.handleInputChange("distributionDay.monday", false);
    expect(component.state["distributionDay.monday"]).toBe(false);

    expect(component.state.agencyNumber).toBe("12345");
    component.handleInputChange("agencyNumber", "67890");
    expect(component.state.agencyNumber).toBe("67890");
  });

  it("doesn't update state for unknown keys", () => {
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
    const component = TestRenderer.create(
      <AgencyProfileForm agencyData={null} />
    ).root.instance;

    component.handleInputChange("additionalAddresses", ["address1"]);
    expect(component.state.additionalAddresses).toEqual(["address1"]);
    component.addAddress();
    expect(component.state.additionalAddresses).toEqual(["address1", ""]);
    component.addAddress();
    expect(component.state.additionalAddresses).toEqual(["address1", "", ""]);
  });
});

describe("AgencyProfileForm.addContact", () => {
  it("adds a new contact object to the array of contacts", () => {
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
