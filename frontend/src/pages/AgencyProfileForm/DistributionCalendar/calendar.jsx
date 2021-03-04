import React, { Component } from "react";
import moment from "moment";
import "./CalendarStyle.css";
import Header from "./Header";

const DEFAULT_DATE_FORMAT = "MM/DD/YYYY";

class Calendar extends Component {
  constructor(props) {
    super(props);
    let { buildCalendar } = this;
    let todayMoment = moment();
    this.state = {
      todayMoment: todayMoment,
      calendar: buildCalendar(todayMoment),
      startDateMoment: moment(props.distributionStartDate, DEFAULT_DATE_FORMAT),
    };
  }

  buildCalendar = (todayMoment) => {
    const startDate = todayMoment.clone().startOf("month").startOf("week");
    const endDate = todayMoment.clone().endOf("month").endOf("week");

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

  isDistributionDate = (date) => {
    const { distributionDays, distributionFrequency } = this.props;
    const { startDateMoment } = this.state;

    let currDateMoment = moment(date, DEFAULT_DATE_FORMAT);

    // Determine if the pertinent weekday is a valid distribution day
    // moment object's day() function returns 0 for sunday, 1 for monday, etc.
    let isDistDate = distributionDays[currDateMoment.day()];

    // Verify day is on or after recurrence startDate
    if (
      currDateMoment.isAfter(startDateMoment) ||
      currDateMoment.isSame(startDateMoment)
    ) {
      // Verify day meet frequency requirements
      let weekDiff = currDateMoment.week() - startDateMoment.week();
      let isOnWeek = weekDiff % distributionFrequency === 0;
      if (isOnWeek) {
        // Verify day is a valid distribution day
        if (isDistDate) {
          return true;
        }
      }
    }

    return false;
  };

  isExtraneousDate = (date) => {
    let dateMonth = parseInt(date.slice(0, 2));
    let calendarMonth = this.state.todayMoment.month();
    let calendarMonthNum = parseInt(moment().month(calendarMonth).format("M"));
    return dateMonth !== calendarMonthNum;
  };

  isSelectedDate = (date) => {
    return this.props.userSelectedDates.includes(date);
  };

  isExcludedDate = (date) => {
    return this.props.userExcludedDates.includes(date);
  };

  removeSelectedDate = (date) => {
    const { userSelectedDates, onChange } = this.props;

    let newSelectedDates = userSelectedDates.slice();
    let indexOfDate = newSelectedDates.indexOf(date);
    newSelectedDates.splice(indexOfDate, 1);

    // Update AgencyProfileForm state (and consequently local state)
    onChange("userSelectedDates", newSelectedDates);
  };

  addSelectedDate = (date) => {
    const { userSelectedDates, onChange } = this.props;

    let newSelectedDates = userSelectedDates.slice();
    newSelectedDates.push(date);

    // Update AgencyProfileForm state (and consequently local state)
    onChange("userSelectedDates", newSelectedDates);
  };

  addExcludedDate = (date) => {
    const { userExcludedDates, onChange } = this.props;

    let newExcludedDates = userExcludedDates.slice();
    newExcludedDates.push(date);

    // Update AgencyProfileFormState --> rerender
    onChange("userExcludedDates", newExcludedDates);
  };

  removeExcludedDate = (date) => {
    const { userExcludedDates, onChange } = this.props;

    let newExcludedDates = userExcludedDates.slice();
    let indexOfDate = newExcludedDates.indexOf(date);
    newExcludedDates.splice(indexOfDate, 1);

    // Update AgencyProfileFormState --> rerender
    onChange("userExcludedDates", newExcludedDates);
  };

  handleDateSelect = (date) => {
    const {
      isDistributionDate,
      isSelectedDate,
      isExcludedDate,
      isExtraneousDate,
      removeSelectedDate,
      addSelectedDate,
      addExcludedDate,
      removeExcludedDate,
    } = this;

    if (!isExtraneousDate(date)) {
      if (isDistributionDate(date)) {
        if (isExcludedDate(date)) {
          removeExcludedDate(date);
        } else {
          addExcludedDate(date);
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
    let newTodayMoment = this.state.todayMoment.clone().add(1, "month");
    this.setState({
      todayMoment: newTodayMoment,
      calendar: this.buildCalendar(newTodayMoment),
    });
  };

  handlePrev = () => {
    let newTodayMoment = this.state.todayMoment.clone().subtract(1, "month");
    this.setState({
      todayMoment: newTodayMoment,
      calendar: this.buildCalendar(newTodayMoment),
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      const {
        userSelectedDates,
        userExcludedDates,
        distributionStartDate,
      } = this.props;
      for (let selectedDate of userSelectedDates) {
        if (this.isDistributionDate(selectedDate)) {
          this.removeSelectedDate(selectedDate);
          return;
        }
      }
      for (let excludedDate of userExcludedDates) {
        if (!this.isDistributionDate(excludedDate)) {
          this.removeExcludedDate(excludedDate);
          return;
        }
      }

      let todayMoment = moment();
      this.setState({
        todayMoment: todayMoment,
        calendar: this.buildCalendar(todayMoment),
        startDateMoment: moment(distributionStartDate, DEFAULT_DATE_FORMAT),
      });
    }
  }

  getDateStyle = (date) => {
    const {
      isDistributionDate,
      isSelectedDate,
      isExcludedDate,
      isExtraneousDate,
    } = this;
    let style = "";

    if (isDistributionDate(date)) {
      if (!isExcludedDate(date)) {
        style = "distribution";
      }
    } else if (isSelectedDate(date)) {
      style = "selected";
    }

    if (isExtraneousDate(date)) {
      style += style === "" ? "extraneous" : "-extraneous";
    }

    return style;
  };

  render() {
    const { calendar, todayMoment } = this.state;
    const { label } = this.props;
    const { handlePrev, handleNext, getDateStyle, handleDateSelect } = this;
    return (
      <div className="calendar-container">
        <label className="calendar-label">{label}</label>
        <div className="calendar">
          <Header
            value={todayMoment}
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
