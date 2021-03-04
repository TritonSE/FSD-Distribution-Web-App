import React, { Component } from "react";
import moment from "moment";
import "./styles.css";
import Header from "./header";
import { stripTime, isExtraneousDate } from "./DateHandling";

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
    const {
      distributionStartDate,
      distributionFrequency,
      distributionDays,
    } = this.props;

    let distributionStartDateAsMoment = moment(
      distributionStartDate,
      DEFAULT_DATE_FORMAT
    );

    let dateAsMoment = moment(date, DEFAULT_DATE_FORMAT);

    // Determine if the pertinent weekday is a valid distribution day
    const weekDayOfDate = weekNumToDayOfWeek[dateAsMoment.day()];
    let dayOfWeekIsDistributionDay =
      distributionDays.indexOf(weekDayOfDate) !== -1;

    // Verify day is between recurrence startDate and endDate
    if (
      dateAsMoment.isAfter(distributionStartDateAsMoment) ||
      dateAsMoment.isSame(distributionStartDateAsMoment)
    ) {
      // Verify day meet frequency requirements
      if (
        Math.abs(distributionStartDateAsMoment.week() - dateAsMoment.week()) %
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
    const { userSelectedDates } = this.props;
    let dayIsSelectedDate = userSelectedDates.indexOf(date) !== -1;
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
    const { userExcludedDates } = this.props;

    // Iterate through userExcludedDates
    for (let excludedDefaultDistributionDate of userExcludedDates) {
      // Determine if distributionDate is excluded
      if (excludedDefaultDistributionDate === date) {
        return true;
      }
    }
    return false;
  };

  removeSelectedDate = (date) => {
    const { userSelectedDates, onChange } = this.props;
    let indexOfDate = userSelectedDates.indexOf(date);
    userSelectedDates.splice(indexOfDate, 1);

    // Update AgencyProfileForm state (and consequently local state)
    onChange("userSelectedDates", userSelectedDates);
  };

  addSelectedDate = (date) => {
    const { userSelectedDates, onChange } = this.props;
    userSelectedDates.push(date);

    // Update AgencyProfileForm state (and consequently local state)
    onChange("userSelectedDates", userSelectedDates);
  };

  getDateStyle = (date) => {
    const {
      isSelectedDate,
      isDefaultDistributionDate,
      isExcludedDefaultDistributionDate,
    } = this;
    const { baseCalendarValue } = this.state;
    let style = "";
    console.log("GETTING DATE STYLE");

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
    const { userExcludedDates, onChange } = this.props;
    userExcludedDates.push(date);

    // Update AgencyProfileFormState --> rerender
    onChange("userExcludedDates", userExcludedDates);
  };

  includeDefaultDistributionDate = (date) => {
    const { userExcludedDates, onChange } = this.props;

    for (let i = 0; i < userExcludedDates.length; i++) {
      if (userExcludedDates[i] === date) {
        userExcludedDates.splice(i, 1);

        // Update AgencyProfileFormState --> rerender
        onChange("userExcludedDates", userExcludedDates);
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

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      let baseCalendarValue = stripTime(moment());
      this.setState({
        baseCalendarValue: baseCalendarValue,
        calendar: this.buildCalendar(baseCalendarValue),
        defaultDistributionDates: this.getDistributionDates(baseCalendarValue),
      });
    }
  }

  render() {
    const { calendar, baseCalendarValue } = this.state;
    const { label } = this.props;
    const { handlePrev, handleNext, getDateStyle, handleDateSelect } = this;
    return (
      <div>
        <label className="calendar-label">{label}</label>
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
      </div>
    );
  }
}

export default Calendar;
