import React from "react";
import TestRenderer from "react-test-renderer";
import TaskForm from "../src/components/TaskForm/TaskForm";

describe("TaskForm.constructor", () => {
  it("populates state with default values when no data is given", () => {
    // checks the state after passing in no data
    const component = TestRenderer.create(<TaskForm data={null} />).root.instance;
    expect(component.state.title).toBe("");
    expect(component.state.dueDate).toBe("");
    expect(component.state.status).toBe("");
  });

  it("populates state with given data", () => {
    // checks the state after passing in test data
    const component = TestRenderer.create(
      <TaskForm data={{ title: "A", dueDate: "01/01/1970", status: "B" }} />
    ).root.instance;
    expect(component.state.title).toBe("A");
    expect(component.state.dueDate).toBe("01/01/1970");
    expect(component.state.status).toBe("B");
  });
});

describe("TaskForm.handleInputChange", () => {
  it("updates state for existing keys", () => {
    // calls handleInputChange() with various (known) keys and test values to
    // check that it updates TaskForm's state correctly
    const component = TestRenderer.create(<TaskForm data={null} />).root.instance;
    component.handleInputChange("title", "abc");
    expect(component.state.title).toBe("abc");
    component.handleInputChange("dueDate", "def");
    expect(component.state.dueDate).toBe("def");
    component.handleInputChange("status", "ghi");
    expect(component.state.status).toBe("ghi");
    component.handleInputChange("title", "jkl");
    expect(component.state.title).toBe("jkl");
  });

  it("doesn't update state for unknown keys", () => {
    // calls handleInputChange() with an unknown key to check that it rejects
    // the change and doesn't add it to the state
    const component = TestRenderer.create(<TaskForm data={null} />).root.instance;

    expect(component.state.keyThatShouldNotBeUsed).toBeUndefined();
    component.handleInputChange("keyThatShouldNotBeUsed", "abcd");
    expect(component.state.keyThatShouldNotBeUsed).toBeUndefined();
  });
});

describe("TaskForm.isValid", () => {
  it("returns true for valid fields", () => {
    // checks that isValid() correctly identifies valid fields (which are not in the errors list)
    const component = TestRenderer.create(<TaskForm data={null} />).root.instance;
    component.setState({ errors: ["field1", "field3", "field5"] });

    expect(component.isValid("field2")).toBe(true);
    expect(component.isValid("field4")).toBe(true);
  });

  it("returns false for invalid fields", () => {
    // checks that isValid() correctly identifies invalid fields (which are present in the errors
    // list)
    const component = TestRenderer.create(<TaskForm data={null} />).root.instance;
    component.setState({ errors: ["field1", "field3", "field5"] });

    expect(component.isValid("field1")).toBe(false);
    expect(component.isValid("field5")).toBe(false);
  });

  it("returns true before validation has occurred", () => {
    // checks that isValid() treats all fields as valid when there is no errors list yet
    const component = TestRenderer.create(<TaskForm data={null} />).root.instance;

    expect(component.isValid("field1")).toBe(true);
    expect(component.isValid("field2")).toBe(true);
  });
});
