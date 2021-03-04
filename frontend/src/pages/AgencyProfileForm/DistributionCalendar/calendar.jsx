import React, { Component } from "react";
import moment from "moment";
import "./styles.css";
import Header from "./header";
import { stripTime, isExtraneousDate } from "./DateHandling";

require("typeface-roboto");

const weekNumToDayOfWeek = {
  0: "sunday",
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday",
  6: "saturday",
};

const DEFAULT_DATE_FORMAT = "MM/DD/YYYY";

class Calendar extends Component {
  constructor(props) {
    super(props);
    let { baseCalendarValue, buildCalendar, getDistributionDates } = this;
    baseCalendarValue = stripTime(moment());

    this.state = {
      baseCalendarValue: baseCalendarValue,
      calendar: buildCalendar(baseCalendarValue),
      selectedDates: [],
      excludedDefaultDistributionDates: [],
      defaultDistributionDates: getDistributionDates(baseCalendarValue),
    };
  }

  buildCalendar = (baseCalendarValue) => {
    const startDate = baseCalendarValue
      .clone()
      .startOf("month")
      .startOf("week");
    const endDate = baseCalendarValue.clone().endOf("month").endOf("week");

    const day = startDate.clone().subtract(1, "day");
    const calendar = [];

    // Fill calendar with appropriate moment objects
    while (day.isBefore(endDate, "day")) {
      calendar.push(
        Array(7)
          .fill(0)
          .map(() => day.add(1, "day").format(DEFAULT_DATE_FORMAT))
      );
    }

    return calendar;
  };

  // Date should be a date
  isValidDistributionDate = (date) => {
    const { distributionRecurrence } = this.props;
    const distributionStartDate = distributionRecurrence.startDate;
    const distributionEndDate = distributionRecurrence.endDate;
    const distributionFrequency = distributionRecurrence.frequency;
    const distributionDays = distributionRecurrence.days;

    let dateAsMoment = moment(date, DEFAULT_DATE_FORMAT);

    // Determine if the pertinent weekday is a valid distribution day
    const weekDayOfDate = weekNumToDayOfWeek[date.day()];
    let dayOfWeekIsDistributionDay =
      distributionDays.indexOf(weekDayOfDate) !== -1;

    // Verify day is between recurrence startDate and endDate
    if (
      (dateAsMoment.isAfter(distributionStartDate) ||
        dateAsMoment.isSame(distributionStartDate)) &&
      dateAsMoment.isBefore(distributionEndDate)
    ) {
      // Verify day meet frequency requirements
      if (
        Math.abs(distributionStartDate.week() - dateAsMoment.week()) %
          distributionFrequency ===
        0
      ) {
        // Verify day is a valid distribution day
        if (dayOfWeekIsDistributionDay) {
          return true;
        }
      }
    }

    return false;
  };

  getDistributionDates = (baseCalendarValue) => {
    const currDate = baseCalendarValue.clone().startOf("month").startOf("week");
    const endDate = baseCalendarValue.clone().endOf("month").endOf("week");

    let distributionDates = [];

    while (currDate.isBefore(endDate, "day")) {
      if (this.isValidDistributionDate(currDate)) {
        distributionDates.push(currDate.format(DEFAULT_DATE_FORMAT));
      }

      currDate.add(1, "day");
    }

    return distributionDates;
  };

  isSelectedDate = (date) => {
    let selectedDates = [...this.state.selectedDates];
    let dayIsSelectedDate = selectedDates.indexOf(date) !== -1;
    return dayIsSelectedDate;
  };

  isDefaultDistributionDate = (date) => {
    let defaultDistributionDates = [...this.state.defaultDistributionDates];

    // Iterate through defaultDistributionDates
    for (let defaultDistributionDate of defaultDistributionDates) {
      // Determine if day is defaultDistributionDate
      if (defaultDistributionDate === date) {
        return true;
      }
    }
    return false;
  };

  isExcludedDefaultDistributionDate = (date) => {
    let excludedDefaultDistributionDates = this.state
      .excludedDefaultDistributionDates;

    // Iterate through excludedDefaultDistributionDates
    for (let excludedDefaultDistributionDate of excludedDefaultDistributionDates) {
      // Determine if distributionDate is excluded
      if (excludedDefaultDistributionDate === date) {
        return true;
      }
    }
    return false;
  };

  removeSelectedDate = (date) => {
    let updatedSelectedDates = [...this.state.selectedDates];
    let indexOfDate = updatedSelectedDates.indexOf(date);
    updatedSelectedDates.splice(indexOfDate, 1);
    this.setState({ selectedDates: updatedSelectedDates });
  };

  addSelectedDate = (date) => {
    let selectedDates = [...this.state.selectedDates];
    selectedDates.push(date);
    this.setState({ selectedDates: selectedDates });
  };

  getDateStyle = (date) => {
    const {
      isSelectedDate,
      isDefaultDistributionDate,
      isExcludedDefaultDistributionDate,
    } = this;
    const { baseCalendarValue } = this.state;
    let style = "";

    if (isSelectedDate(date)) {
      style += style === "" ? "selected" : "-selected";
    }
    if (isDefaultDistributionDate(date)) {
      if (!isExcludedDefaultDistributionDate(date)) {
        style += style === "" ? "distribution" : "-distribution";
      }
    }
    if (isExtraneousDate(date, baseCalendarValue)) {
      style += style === "" ? "extraneous" : "-extraneous";
    }

    return style;
  };

  excludeDefaultDistributionDate = (date) => {
    // Update state with excluded dates
    let excludedDefaultDistributionDates = [
      ...this.state.excludedDefaultDistributionDates,
    ];
    excludedDefaultDistributionDates.push(date);

    this.setState({
      excludedDefaultDistributionDates: excludedDefaultDistributionDates,
    });
  };

  includeDefaultDistributionDate = (date) => {
    let excludedDefaultDistributionDates = [
      ...this.state.excludedDefaultDistributionDates,
    ];

    for (let i = 0; i < excludedDefaultDistributionDates.length; i++) {
      if (excludedDefaultDistributionDates[i] === date) {
        excludedDefaultDistributionDates.splice(i, 1);
        this.setState({
          excludedDefaultDistributionDates: excludedDefaultDistributionDates,
        });
        return;
      }
    }
  };

  handleDateSelect = (date) => {
    const {
      isSelectedDate,
      removeSelectedDate,
      addSelectedDate,
      isDefaultDistributionDate,
      excludeDefaultDistributionDate,
      includeDefaultDistributionDate,
      isExcludedDefaultDistributionDate,
    } = this;

    const { baseCalendarValue } = this.state;

    if (!isExtraneousDate(date, baseCalendarValue)) {
      if (isDefaultDistributionDate(date)) {
        if (isExcludedDefaultDistributionDate(date)) {
          includeDefaultDistributionDate(date);
        } else {
          excludeDefaultDistributionDate(date);
        }
      } else {
        if (isSelectedDate(date)) {
          removeSelectedDate(date);
        } else {
          addSelectedDate(date);
        }
      }
    }
  };

  handleNext = () => {
    let newBaseCalendarValue = this.state.baseCalendarValue
      .clone()
      .add(1, "month");

    // Update defaultDistributionDates to only store the dates
    // for the new month to be displayed
    let updatedDefaultDistributionDates = this.getDistributionDates(
      newBaseCalendarValue
    );

    // Update fields and rerender calendar
    this.setState({
      defaultDistributionDates: updatedDefaultDistributionDates,
      baseCalendarValue: newBaseCalendarValue,
      calendar: this.buildCalendar(newBaseCalendarValue),
    });
  };

  handlePrev = () => {
    let newBaseCalendarValue = this.state.baseCalendarValue
      .clone()
      .subtract(1, "month");

    // Update defaultDistributionDates to only store the dates
    // for the new month to be displayed
    let updatedDefaultDistributionDates = this.getDistributionDates(
      newBaseCalendarValue
    );

    this.setState({
      defaultDistributionDates: updatedDefaultDistributionDates,
      baseCalendarValue: newBaseCalendarValue,
      calendar: this.buildCalendar(newBaseCalendarValue),
    });
  };

  render() {
    const { calendar, baseCalendarValue } = this.state;
    const { handlePrev, handleNext, getDateStyle, handleDateSelect } = this;
    return (
      <div className="calendar">
        <Header
          value={baseCalendarValue}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />
        <div className="body">
          <div className="day-names">
            {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(
              (weekDay) => (
                <div className="week" key={weekDay}>
                  {weekDay}
                </div>
              )
            )}
          </div>
          {calendar.map((week) => (
            <div key={week}>
              {week.map((date) => (
                <div className="day" key={date}>
                  <div
                    className={getDateStyle(date)}
                    onClick={() => handleDateSelect(date)}
                  >
                    {date.slice(3, 5)}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Calendar;
