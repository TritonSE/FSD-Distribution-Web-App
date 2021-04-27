import React, { Component } from "react";
import moment from "moment";
import "./CalendarStyle.css";
import Header from "./Header";
import TimeInputPopup from "./TimeInputPopup";

const DEFAULT_DATE_FORMAT = "YYYY-MM-DD";

/**
 * Custom calendar component to aid with user distribution date
 * selection and exclusion.
 *
 * Expected props:
 * - {String} distributionStartDate: String in default date format representing
 * the starting distributiond date
 * - {String} distributionFrequency: Number representing how often the agency
 * distributes (in weeks)
 * - {Array<Boolean>} distributionDays: List of booleans indicating which days
 * of the week are valid distribution days
 * - {Array<String>} userSelectedDates: List of Strings in default date format
 * representing which dates the user selected
 * - {Array<String>} userExcludedDates: List of Strings in default date format
 * representing which default distribution days the user excluded
 * - {Function} onChange: Callback function to agency profile form
 * handleInputChange
 * - {Function} validCheck: Callback from the form page to check whether start
 * times for user selected dates passed validation, should take a String
 */

class Calendar extends Component {
  constructor(props) {
    super(props);
    let todayMoment = moment();
    this.state = {
      todayMoment: todayMoment,
      calendar: this.buildCalendar(todayMoment),
      startDateMoment: moment(props.distributionStartDate, DEFAULT_DATE_FORMAT),
    };
  }

  /**
   * Creates a two-dimensional array of String in default date format
   * representing the calendar.
   *
   * @param {Object} todayMoment Moment object corresponding with today's date
   * @returns Two-dimensional array of Strings in default date format
   * representing the calendar. Inner arrays represent individual weeks and
   * contain Strings that represent individual dates.
   */
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

  /**
   * Determines if a given date string is a valid distribution date.
   *
   * @param {String} date String in default date format to be assessed
   * @returns Boolean representing if the given date string is a valid
   * distribution date
   */
  isDistributionDate = (date) => {
    const { distributionDays, distributionFrequency } = this.props;
    const { startDateMoment } = this.state;

    const frequency = parseInt(distributionFrequency);
    if (isNaN(frequency)) {
      return false;
    }

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
      let isOnWeek = weekDiff % frequency === 0;
      if (isOnWeek) {
        // Verify day is a valid distribution day
        if (isDistDate) {
          return true;
        }
      }
    }

    return false;
  };

  /**
   * Determines if a given date string is not in the month currently displayed.
   *
   * @param {String} date String in default date format to be assessed
   * @returns Boolean representing if the given date string is extraneous
   */
  isExtraneousDate = (date) => {
    const { todayMoment } = this.state;
    let dateMonth = date.slice(5, 7);
    let displayedMonth = moment().month(todayMoment.month()).format("MM");
    return dateMonth !== displayedMonth;
  };

  /**
   * Determines if a given date is a user selected date
   *
   * @param {String} date String in default date format to be assessed
   * @returns The index of the corresponding date-time string in
   * userSelectedDates if the date is selected, or -1 otherwise
   */
  indexOfSelectedDate = (date) => {
    const { userSelectedDates } = this.state;
    // strings in userSelectedDates also include start times
    for (let i in userSelectedDates) {
      if (userSelectedDates[i].startsWith(date)) {
        return i;
      }
    }
    return -1;
  };

  /**
   * Determines if the given date is focused in the calendar.
   *
   * @param {String} date Date string in default format
   * @returns true iff date === this.state.focusedDate, otherwise false
   */
  isFocusedDate = (date) => {
    return date === this.state.focusedDate;
  };

  /**
   * Determines if a given date is a user excluded date
   *
   * @param {String} date String in default date format to be assessed
   * @returns Boolean representing if the given date is a user selected date
   */
  isExcludedDate = (date) => {
    return this.props.userExcludedDates.includes(date);
  };

  /**
   * Removes a given date from user selected dates
   *
   * @param {String} date String in default date format to be removed from
   * user selected dates
   */
  removeSelectedDate = (date) => {
    const { userSelectedDates, onChange } = this.props;

    let newSelectedDates = userSelectedDates.slice();
    // strings in userSelectedDates also include start times
    let index = -1;
    for (let i in newSelectedDates) {
      let selectedDate = newSelectedDates[i];
      if (selectedDate.startsWith(date)) {
        index = i;
        break;
      }
    }
    if (index === -1) {
      return;
    }
    newSelectedDates.splice(index, 1);

    // Update AgencyProfileForm state (and consequently local state)
    onChange("userSelectedDates", newSelectedDates);
  };

  /**
   * Adds the given date to userSelectedDates and focuses it in the calendar.
   *
   * @param {String} date String in default date format to be added to
   * user selected dates
   */
  addSelectedDate = (date) => {
    const { userSelectedDates, onChange } = this.props;
    const newDate = date + "T00:00Z";

    let newSelectedDates = userSelectedDates.slice();
    newSelectedDates.push(newDate);
    this.focusDate(newDate);

    // Update AgencyProfileForm state (and consequently local state)
    onChange("userSelectedDates", newSelectedDates);
  };

  /**
   * Updates the time of this date in userSelectedDates, and unfocuses the date
   * in the calendar.
   *
   * @param {String} date String in default date format
   * @param {String} time New start time for the date ("hh:mm")
   */
  updateSelectedDate = (date, time) => {
    const { userSelectedDates, onChange } = this.props;
    const newDate = `${date}T${time}Z`;

    let newSelectedDates = userSelectedDates.slice();
    let index = this.indexOfSelectedDate(date);
    newSelectedDates[index] = newDate;
    this.unfocusDate();

    onChange("userSelectedDates", newSelectedDates);
  };

  /**
   * Sets focusedDate in this.state to the given date (excluding time), and
   * focusedStartTime to the time from the date string.
   *
   * @param {String} dateTime Date string in ISO 8601 format: YYYY-MM-DDThh:mmZ
   */
  focusDate = (dateTime) => {
    this.setState({
      focusedDate: dateTime.slice(0, 10),
      focusedStartTime: dateTime.slice(11, 16),
    });
  };

  /**
   * Sets focusedDate and focusedStartTime in this.state to null.
   */
  unfocusDate = () => {
    this.setState({ focusedDate: null, focusedStartTime: null });
  };

  /**
   * Adds a given date to user excluded dates
   *
   * @param {String} date String in default date format to be added to
   * user excluded dates
   */
  addExcludedDate = (date) => {
    const { userExcludedDates, onChange } = this.props;

    let newExcludedDates = userExcludedDates.slice();
    newExcludedDates.push(date);

    // Update AgencyProfileFormState --> rerender
    onChange("userExcludedDates", newExcludedDates);
  };

  /**
   * Remvoes a given date from user excluded dates
   *
   * @param {String} date String in default date format to be removed from
   * user excluded dates
   */
  removeExcludedDate = (date) => {
    const { userExcludedDates, onChange } = this.props;

    let newExcludedDates = userExcludedDates.slice();
    let indexOfDate = newExcludedDates.indexOf(date);
    newExcludedDates.splice(indexOfDate, 1);

    // Update AgencyProfileFormState --> rerender
    onChange("userExcludedDates", newExcludedDates);
  };

  /**
   * Adds/removes a given date to excluded/user selected dates.
   *
   * @param {String} date String in default date format to be removed/added
   */
  handleDateSelect = (date) => {
    const {
      isDistributionDate,
      indexOfSelectedDate,
      isExcludedDate,
      isExtraneousDate,
      addSelectedDate,
      addExcludedDate,
      removeExcludedDate,
      focusDate,
    } = this;

    if (!isExtraneousDate(date)) {
      if (isDistributionDate(date)) {
        if (isExcludedDate(date)) {
          removeExcludedDate(date);
        } else {
          addExcludedDate(date);
        }
      } else {
        let index = indexOfSelectedDate(date);
        if (index !== -1) {
          focusDate(this.props.userSelectedDates[index]);
        } else {
          addSelectedDate(date);
        }
      }
    }
  };

  /**
   * Updates todayMoment and rerenders calendar for following month.
   */
  handleNext = () => {
    let newTodayMoment = this.state.todayMoment.clone().add(1, "month");
    this.setState({
      todayMoment: newTodayMoment,
      calendar: this.buildCalendar(newTodayMoment),
    });
  };

  /**
   * Updates todayMoment and rerenders calendar for previous month.
   */
  handlePrev = () => {
    let newTodayMoment = this.state.todayMoment.clone().subtract(1, "month");
    this.setState({
      todayMoment: newTodayMoment,
      calendar: this.buildCalendar(newTodayMoment),
    });
  };

  /**
   * Determines if the component's props have been updated based on
   * userSelectedDates and userExcludedDates
   *
   * @param {Object} prevProps Contains previous calendar props
   */
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      const {
        userSelectedDates,
        userExcludedDates,
        distributionStartDate,
      } = this.props;

      // if the user just checked a new distribution weekday, then remove any
      // selected/excluded dates of that weekday
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

      this.setState((prev) => ({
        todayMoment: prev.todayMoment,
        calendar: prev.calendar,
        startDateMoment: moment(distributionStartDate, DEFAULT_DATE_FORMAT),
      }));
    }
  }

  /**
   * Helper function to determine the style of a given date.
   *
   * @param {String} date String in default date format
   * @returns String with the appropriate style
   */
  getDateStyle = (date) => {
    const {
      isDistributionDate,
      indexOfSelectedDate,
      isExcludedDate,
      isExtraneousDate,
    } = this;
    let style = "";

    if (isDistributionDate(date)) {
      if (!isExcludedDate(date)) {
        style = "distribution";
      }
    } else if (indexOfSelectedDate(date) !== -1) {
      style = "selected";
    }

    if (isExtraneousDate(date)) {
      style += style === "" ? "extraneous" : "-extraneous";
    }

    return style;
  };

  render() {
    const { calendar, todayMoment, focusedStartTime } = this.state;
    const { label, validCheck } = this.props;
    const {
      handlePrev,
      handleNext,
      getDateStyle,
      handleDateSelect,
      isFocusedDate,
      indexOfSelectedDate,
      updateSelectedDate,
      removeSelectedDate,
    } = this;
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
                      {date.slice(8, 10)}
                    </div>
                    {isFocusedDate(date) && (
                      <TimeInputPopup
                        value={focusedStartTime}
                        valid={validCheck(
                          `userSelectedDates[${indexOfSelectedDate(date)}]`
                        )}
                        onSave={(time) => updateSelectedDate(date, time)}
                        onDelete={() => removeSelectedDate(date)}
                      />
                    )}
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
