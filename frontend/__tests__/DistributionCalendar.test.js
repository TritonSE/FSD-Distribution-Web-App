import React from "react";
import TestRenderer from "react-test-renderer";
import Calendar from "../src/components/AgencyProfileForm/DistributionCalendar/Calendar";

const DEFAULT_PROPS = {
  // In DEFAULT_DATE_FORMAT = "YYYY-MM-DD"
  todayDate: "2021-05-21",

  // In USER_FACING_FORMAT = "MM/DD/YYYY"
  distributionStartDate: "01/01/2000",

  distributionFrequency: 2,
  // Booleans correspond to the following order [SUN, MON, TUE,...,SAT]
  distributionDays: [false, true, false, true, true, false, false],
  userSelectedDates: [],
  userExcludedDates: [],

  onChange: null,
  validCheck: null,
};

/**
 * Constructor Tests
 */

describe("DistributionCalendar.constructor", () => {
  it("builds calendar dates array properly", () => {
    const component = TestRenderer.create(<Calendar {...DEFAULT_PROPS} />).root.instance;

    // Ensure calendar is built correctly
    expect(component.state.calendar).toEqual([
      [
        "2021-04-25",
        "2021-04-26",
        "2021-04-27",
        "2021-04-28",
        "2021-04-29",
        "2021-04-30",
        "2021-05-01",
      ],
      [
        "2021-05-02",
        "2021-05-03",
        "2021-05-04",
        "2021-05-05",
        "2021-05-06",
        "2021-05-07",
        "2021-05-08",
      ],
      [
        "2021-05-09",
        "2021-05-10",
        "2021-05-11",
        "2021-05-12",
        "2021-05-13",
        "2021-05-14",
        "2021-05-15",
      ],
      [
        "2021-05-16",
        "2021-05-17",
        "2021-05-18",
        "2021-05-19",
        "2021-05-20",
        "2021-05-21",
        "2021-05-22",
      ],
      [
        "2021-05-23",
        "2021-05-24",
        "2021-05-25",
        "2021-05-26",
        "2021-05-27",
        "2021-05-28",
        "2021-05-29",
      ],
      [
        "2021-05-30",
        "2021-05-31",
        "2021-06-01",
        "2021-06-02",
        "2021-06-03",
        "2021-06-04",
        "2021-06-05",
      ],
    ]);
  });
});

/**
 * handleDateSelect Tests
 */
describe("DistributionCalendar.handleDateSelect", () => {
  it("adds to userSelectedDates properly", () => {
    // Checks that onChange is called with proper arguments
    const mockOnChange = jest.fn();

    const component = TestRenderer.create(<Calendar {...DEFAULT_PROPS} onChange={mockOnChange} />)
      .root.instance;

    // Attempt to add user selected date
    component.handleDateSelect("2021-05-24");
    expect(mockOnChange).toHaveBeenCalledWith("userSelectedDates", ["2021-05-24T:"]);
  });

  it("focuses pre-existing userSelectedDates", () => {
    // Checks that focus-related state fields are updated properly
    const mockOnChange = jest.fn();
    const mockValidCheck = jest.fn();

    const component = TestRenderer.create(
      <Calendar
        {...DEFAULT_PROPS}
        onChange={mockOnChange}
        validCheck={mockValidCheck}
        userSelectedDates={["2021-05-24T00:00"]}
      />
    ).root.instance;

    // Attempt to focus pre-existing selected date
    component.handleDateSelect("2021-05-24");
    expect(component.state.focusedDate).toBe("2021-05-24");
    expect(component.state.focusedStartTime).toBe("00:00");
  });

  it("removes from userSelectedDates properly and unfocuses pertinent date", () => {
    // Checks that onChange is called with proper arguments and focus-related
    // state fields are updated properly
    const mockOnChange = jest.fn();
    const mockValidCheck = jest.fn();

    const component = TestRenderer.create(
      <Calendar
        {...DEFAULT_PROPS}
        userSelectedDates={["2021-05-24T:"]}
        onChange={mockOnChange}
        validCheck={mockValidCheck}
      />
    ).root.instance;

    // Attempt to remove user selected date
    component.removeSelectedDate("2021-05-24");
    expect(mockOnChange).toHaveBeenCalledWith("userSelectedDates", []);

    // Ensure that no date is in focus
    expect(mockOnChange).toHaveBeenCalledWith("userSelectedDates", []);
    expect(component.state.focusedDate).toBe(null);
    expect(component.state.focusedStartTime).toBe(null);
  });

  it("adds to userExcludedDates properly", () => {
    // Checks that onChange is called with proper arguments
    const mockOnChange = jest.fn();
    const mockValidCheck = jest.fn();

    const component = TestRenderer.create(
      <Calendar {...DEFAULT_PROPS} onChange={mockOnChange} validCheck={mockValidCheck} />
    ).root.instance;

    // Exclude distribution date (05/17/2021)
    component.handleDateSelect("2021-05-17");
    expect(mockOnChange).toHaveBeenCalledWith("userExcludedDates", ["2021-05-17"]);
  });

  it("removes from userExcludedDates properly", () => {
    // Checks that onChange is called with proper arguments
    const mockOnChange = jest.fn();
    const mockValidCheck = jest.fn();

    const component = TestRenderer.create(
      <Calendar
        {...DEFAULT_PROPS}
        userExcludedDates={["2021-05-17"]}
        onChange={mockOnChange}
        validCheck={mockValidCheck}
      />
    ).root.instance;

    // Include distribution date (05/17/2021)
    component.handleDateSelect("2021-05-17");
    expect(mockOnChange).toHaveBeenCalledWith("userExcludedDates", []);
  });

  it("does nothing when extraneous date selected", () => {
    // Checks that onChange is not called when extraneous date is selected
    const mockOnChange = jest.fn();

    const component = TestRenderer.create(<Calendar {...DEFAULT_PROPS} onChange={mockOnChange} />)
      .root.instance;

    // Attempt to select extraneous date from prior month
    component.handleDateSelect("2021-04-30");
    expect(mockOnChange).not.toHaveBeenCalledWith();

    // Attempt to select extraneous date from following month
    component.handleDateSelect("2021-06-01");
    expect(mockOnChange).not.toHaveBeenCalledWith();
  });
});

/**
 * Calendar Navigation Test
 */
describe("DistributionCalendar.navigation", () => {
  it("builds correct calendar when moving forward", () => {
    // Checks that calendar state field is updated properly after navigating
    // forward
    const component = TestRenderer.create(<Calendar {...DEFAULT_PROPS} />).root.instance;

    // Validate single handleNext()
    // May --> June
    component.handleNext();
    expect(component.state.calendar).toEqual([
      [
        "2021-05-30",
        "2021-05-31",
        "2021-06-01",
        "2021-06-02",
        "2021-06-03",
        "2021-06-04",
        "2021-06-05",
      ],
      [
        "2021-06-06",
        "2021-06-07",
        "2021-06-08",
        "2021-06-09",
        "2021-06-10",
        "2021-06-11",
        "2021-06-12",
      ],
      [
        "2021-06-13",
        "2021-06-14",
        "2021-06-15",
        "2021-06-16",
        "2021-06-17",
        "2021-06-18",
        "2021-06-19",
      ],
      [
        "2021-06-20",
        "2021-06-21",
        "2021-06-22",
        "2021-06-23",
        "2021-06-24",
        "2021-06-25",
        "2021-06-26",
      ],
      [
        "2021-06-27",
        "2021-06-28",
        "2021-06-29",
        "2021-06-30",
        "2021-07-01",
        "2021-07-02",
        "2021-07-03",
      ],
    ]);

    // Validate sequence of handleNext()
    // June --> September
    component.handleNext();
    component.handleNext();
    component.handleNext();
    expect(component.state.calendar).toEqual([
      [
        "2021-08-29",
        "2021-08-30",
        "2021-08-31",
        "2021-09-01",
        "2021-09-02",
        "2021-09-03",
        "2021-09-04",
      ],
      [
        "2021-09-05",
        "2021-09-06",
        "2021-09-07",
        "2021-09-08",
        "2021-09-09",
        "2021-09-10",
        "2021-09-11",
      ],
      [
        "2021-09-12",
        "2021-09-13",
        "2021-09-14",
        "2021-09-15",
        "2021-09-16",
        "2021-09-17",
        "2021-09-18",
      ],
      [
        "2021-09-19",
        "2021-09-20",
        "2021-09-21",
        "2021-09-22",
        "2021-09-23",
        "2021-09-24",
        "2021-09-25",
      ],
      [
        "2021-09-26",
        "2021-09-27",
        "2021-09-28",
        "2021-09-29",
        "2021-09-30",
        "2021-10-01",
        "2021-10-02",
      ],
    ]);
  });

  it("builds correct calendar when moving backward", () => {
    // Checks that calendar state field is updated properly after navigating
    // backward
    const component = TestRenderer.create(<Calendar {...DEFAULT_PROPS} />).root.instance;

    // Validate single handlePrev()
    // April <-- May
    component.handlePrev();
    expect(component.state.calendar).toEqual([
      [
        "2021-03-28",
        "2021-03-29",
        "2021-03-30",
        "2021-03-31",
        "2021-04-01",
        "2021-04-02",
        "2021-04-03",
      ],
      [
        "2021-04-04",
        "2021-04-05",
        "2021-04-06",
        "2021-04-07",
        "2021-04-08",
        "2021-04-09",
        "2021-04-10",
      ],
      [
        "2021-04-11",
        "2021-04-12",
        "2021-04-13",
        "2021-04-14",
        "2021-04-15",
        "2021-04-16",
        "2021-04-17",
      ],
      [
        "2021-04-18",
        "2021-04-19",
        "2021-04-20",
        "2021-04-21",
        "2021-04-22",
        "2021-04-23",
        "2021-04-24",
      ],
      [
        "2021-04-25",
        "2021-04-26",
        "2021-04-27",
        "2021-04-28",
        "2021-04-29",
        "2021-04-30",
        "2021-05-01",
      ],
    ]);

    // Validate sequence of handleNext()
    // January <-- April
    component.handlePrev();
    component.handlePrev();
    component.handlePrev();
    expect(component.state.calendar).toEqual([
      [
        "2020-12-27",
        "2020-12-28",
        "2020-12-29",
        "2020-12-30",
        "2020-12-31",
        "2021-01-01",
        "2021-01-02",
      ],
      [
        "2021-01-03",
        "2021-01-04",
        "2021-01-05",
        "2021-01-06",
        "2021-01-07",
        "2021-01-08",
        "2021-01-09",
      ],
      [
        "2021-01-10",
        "2021-01-11",
        "2021-01-12",
        "2021-01-13",
        "2021-01-14",
        "2021-01-15",
        "2021-01-16",
      ],
      [
        "2021-01-17",
        "2021-01-18",
        "2021-01-19",
        "2021-01-20",
        "2021-01-21",
        "2021-01-22",
        "2021-01-23",
      ],
      [
        "2021-01-24",
        "2021-01-25",
        "2021-01-26",
        "2021-01-27",
        "2021-01-28",
        "2021-01-29",
        "2021-01-30",
      ],
      [
        "2021-01-31",
        "2021-02-01",
        "2021-02-02",
        "2021-02-03",
        "2021-02-04",
        "2021-02-05",
        "2021-02-06",
      ],
    ]);
  });

  it("builds correct calendar after complex navigational sequence", () => {
    // Checks that calendar state field is updated properly after complex
    // navigational sequence
    const component = TestRenderer.create(<Calendar {...DEFAULT_PROPS} />).root.instance;

    // MAY 2021 --> JULY 2021
    component.handleNext();
    component.handleNext();

    // JUNE 2021 <-- JULY 2021
    component.handlePrev();

    // JUNE 2021 --> SEPTEMBER 2021
    component.handleNext();
    component.handleNext();
    component.handleNext();

    // JULY 2021 <-- SEPTEMBER 2021
    component.handlePrev();
    component.handlePrev();

    expect(component.state.calendar).toEqual([
      [
        "2021-06-27",
        "2021-06-28",
        "2021-06-29",
        "2021-06-30",
        "2021-07-01",
        "2021-07-02",
        "2021-07-03",
      ],
      [
        "2021-07-04",
        "2021-07-05",
        "2021-07-06",
        "2021-07-07",
        "2021-07-08",
        "2021-07-09",
        "2021-07-10",
      ],
      [
        "2021-07-11",
        "2021-07-12",
        "2021-07-13",
        "2021-07-14",
        "2021-07-15",
        "2021-07-16",
        "2021-07-17",
      ],
      [
        "2021-07-18",
        "2021-07-19",
        "2021-07-20",
        "2021-07-21",
        "2021-07-22",
        "2021-07-23",
        "2021-07-24",
      ],
      [
        "2021-07-25",
        "2021-07-26",
        "2021-07-27",
        "2021-07-28",
        "2021-07-29",
        "2021-07-30",
        "2021-07-31",
      ],
    ]);
  });
});
