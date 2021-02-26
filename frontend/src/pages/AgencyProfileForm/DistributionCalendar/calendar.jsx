import React, { Component } from "react";
import moment from "moment";
import "./styles.css";
import Header from "./header";
import {
  areSimilarMoments,
  stripTime,
  isExtraneousDay,
} from "./momentHandling";

require("typeface-roboto");

const weekNumToDayOfWeek = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

class Calendar extends Component {
  constructor(props) {
    super(props);
    let { value, buildCalendar, getDistributionDates } = this;
    value = stripTime(moment());
    this.state = {
      value: value,
      calendar: buildCalendar(value),
      selectedDays: [],
      excludedDefaultDistributionDates: [],
      defaultDistributionDates: getDistributionDates(value),
    };
  }

  buildCalendar = (value) => {
    const startDay = value.clone().startOf("month").startOf("week");
    const endDay = value.clone().endOf("month").endOf("week");

    const day = startDay.clone().subtract(1, "day");
    const calendar = [];

    // Fill calendar with appropriate moment objects
    while (day.isBefore(endDay, "day")) {
      calendar.push(
        Array(7)
          .fill(0)
          .map(() => day.add(1, "day").clone())
      );
    }

    return calendar;
  };

  // Day should be a moment object
  isValidDistributionDate = (day) => {
    const { distributionRecurrence } = this.props;
    const distributionStartDate = distributionRecurrence.startDate;
    const distributionEndDate = distributionRecurrence.endDate;
    const distributionFrequency = distributionRecurrence.frequency;
    const distributionDays = distributionRecurrence.days;

    // Determine if the pertinent weekday is a valid distribution day
    const weekDayOfDay = weekNumToDayOfWeek[day.day()];
    let dayOfWeekIsDistributionDay =
      distributionDays.indexOf(weekDayOfDay) !== -1;

    // Verify day is between recurrence startDate and endDate
    if (
      day.isAfter(distributionStartDate, "day") &&
      day.isBefore(distributionEndDate, "day")
    ) {
      // Verify day meet frequency requirements
      if (
        Math.abs(distributionStartDate.week() - day.week()) %
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

  getDistributionDates = (value) => {
    const day = value.clone().startOf("month").startOf("week");
    const endDay = value.clone().endOf("month").endOf("week");

    let distributionDates = [];

    while (day.isBefore(endDay, "day")) {
      if (this.isValidDistributionDate(day)) {
        distributionDates.push(day.clone());
      }

      day.add(1, "day");
    }

    return distributionDates;
  };

  isSelectedDay = (day) => {
    let selectedDays = [...this.state.selectedDays];
    let selectedDaysWithDay = selectedDays.filter((x) =>
      areSimilarMoments(x, day)
    );
    return selectedDaysWithDay.length > 0;
  };

  isDefaultDistributionDate = (day) => {
    let defaultDistributionDates = [...this.state.defaultDistributionDates];

    // Iterate through defaultDistributionDates
    for (let defaultDistributionDate of defaultDistributionDates) {
      // Determine if day is defaultDistributionDate
      if (areSimilarMoments(defaultDistributionDate, day)) {
        return true;
      }
    }
    return false;
  };

  isExcludedDefaultDistributionDate = (day) => {
    let excludedDefaultDistributionDates = this.state
      .excludedDefaultDistributionDates;

    // Iterate through excludedDefaultDistributionDates
    for (let excludedDefaultDistributionDate of excludedDefaultDistributionDates) {
      // Determine if distributionDate is excluded
      if (areSimilarMoments(excludedDefaultDistributionDate, day)) {
        return true;
      }
    }
    return false;
  };

  removeSelectedDay = (day) => {
    let selectedDays = [...this.state.selectedDays];
    let updatedSelectedDays = selectedDays.filter(
      (x) => !areSimilarMoments(x, day)
    );
    this.setState({ selectedDays: updatedSelectedDays }, () =>
      console.log(
        this.state.selectedDays.map((selectedDay) => selectedDay.toString())
      )
    );
  };

  addSelectedDay = (day) => {
    let selectedDays = [...this.state.selectedDays];
    selectedDays.push(day);
    this.setState({ selectedDays: selectedDays }, () =>
      console.log(
        this.state.selectedDays.map((selectedDay) => selectedDay.toString())
      )
    );
  };

  getDayStyle = (day) => {
    const { isSelectedDay, isDefaultDistributionDate, isExcludedDefaultDistributionDate } = this;
    const { value } = this.state;

    let style = "";

    if (isSelectedDay(day)) {
      style += style === "" ? "selected" : "-selected";
    }
    if (isDefaultDistributionDate(day)) {
      if (!isExcludedDefaultDistributionDate(day)) {
        style += style === "" ? "distribution" : "-distribution";
      }
    }
    if (isExtraneousDay(day, value)) {
      style += style === "" ? "extraneous" : "-extraneous";
    }

    return style;
  };

  excludeDefaultDistributionDate = (day) => {
    // Update state with excluded dates
    let excludedDefaultDistributionDates = [
      ...this.state.excludedDefaultDistributionDates,
    ];
    excludedDefaultDistributionDates.push(day);

    this.setState(
      {
        excludedDefaultDistributionDates: excludedDefaultDistributionDates,
      },
      () =>
        console.log(
          this.state.excludedDefaultDistributionDates.map((day) =>
            day.toString()
          )
        )
    );
  };

  includeDefaultDistributionDate = (day) => {
    let excludedDefaultDistributionDates = [
      ...this.state.excludedDefaultDistributionDates,
    ];

    for (let i = 0; i < excludedDefaultDistributionDates.length; i++) {
      if (areSimilarMoments(excludedDefaultDistributionDates[i], day)) {
        excludedDefaultDistributionDates.splice(i, 1);
        this.setState(
          {
            excludedDefaultDistributionDates: excludedDefaultDistributionDates,
          },
          () =>
            console.log(
              this.state.excludedDefaultDistributionDates.map((day) =>
                day.toString()
              )
            )
        );
        return;
      }
    }
  };

  handleDaySelect = (day) => {
    const {
      isSelectedDay,
      removeSelectedDay,
      addSelectedDay,
      isDefaultDistributionDate,
      excludeDefaultDistributionDate,
      includeDefaultDistributionDate,
      isExcludedDefaultDistributionDate,
    } = this;

    const { value } = this.state;

    if (!isExtraneousDay(day, value)) {
      if (isDefaultDistributionDate(day)) {
        if (isExcludedDefaultDistributionDate(day)) {
          includeDefaultDistributionDate(day);
        } else {
          excludeDefaultDistributionDate(day);
        }
      } else {
        if (isSelectedDay(day)) {
          removeSelectedDay(day);
        } else {
          addSelectedDay(day);
        }
      }
    }
  };

  handleNext = () => {
    let newValue = this.state.value.clone().add(1, "month");

    // Update defaultDistributionDates to only store the dates
    // for the new month to be displayed
    let updatedDefaultDistributionDates = this.getDistributionDates(newValue);

    // Update fields and rerender calendar
    this.setState(
      {
        defaultDistributionDates: updatedDefaultDistributionDates,
        value: newValue,
        calendar: this.buildCalendar(newValue),
      },
      () =>
        console.log(
          this.state.defaultDistributionDates.map((day) => day.toString())
        )
    );
  };

  handlePrev = () => {
    let newValue = this.state.value.clone().subtract(1, "month");

    // Update defaultDistributionDates to only store the dates
    // for the new month to be displayed
    let updatedDefaultDistributionDates = this.getDistributionDates(newValue);

    this.setState({
      defaultDistributionDates: updatedDefaultDistributionDates,
      value: newValue,
      calendar: this.buildCalendar(newValue),
    });
  };

  render() {
    const { calendar, value } = this.state;
    return (
      <div className="calendar">
        <Header
          value={value}
          handlePrev={this.handlePrev}
          handleNext={this.handleNext}
        />
        <div className="body">
          <div className="day-names">
            {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
              <div className="week" key={d}>
                {d}
              </div>
            ))}
          </div>
          {calendar.map((week) => (
            <div key={week}>
              {week.map((day) => (
                <div className="day" key={day}>
                  <div
                    className={this.getDayStyle(day)}
                    onClick={() => this.handleDaySelect(day)}
                  >
                    {day.format("D").toString()}
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
