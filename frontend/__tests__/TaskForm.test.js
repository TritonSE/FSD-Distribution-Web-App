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
