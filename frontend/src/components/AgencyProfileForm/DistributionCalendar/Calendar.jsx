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
 * the starting distribution date
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
 * - {Function} validCheck: callback from the form page to check whether inputs
 * passed validation, should take a String
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
   * @returns Boolean representing if the given date is a user selected date
   */
  isSelectedDate = (date) => {
    return this.findSelectedDate(date) !== -1;
  };

  /**
   * Helper method - implements binary search in userSelectedDates.
   *
   * @param {String} date Date string in default format
   * @returns Index of this date in userSelectedDates, or -1 if not found
   */
  findSelectedDate = (date) => {
    const { userSelectedDates } = this.props;
    let low = 0;
    let high = userSelectedDates.length - 1;
    while (low <= high) {
      let mid = low + Math.floor((high - low) / 2);
      if (userSelectedDates[mid].startsWith(date)) {
        return mid;
      } else if (date.localeCompare(userSelectedDates[mid]) < 0) {
        // date is earlier than mid date
        high = mid - 1;
      } else {
        // date is later than mid date
        low = mid + 1;
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
   * @returns Boolean representing if the given date is a user excluded date
   */
  isExcludedDate = (date) => {
    return this.props.userExcludedDates.includes(date);
  };

  /**
   * Removes a given date from userSelectedDates, and unfocuses the date.
   *
   * @param {String} date String in default date format to be removed
   */
  removeSelectedDate = (date) => {
    const { userSelectedDates, onChange } = this.props;

    let newSelectedDates = userSelectedDates.slice();
    // strings in userSelectedDates also include start times
    let index = this.findSelectedDate(date);
    if (index === -1) {
      return;
    }
    newSelectedDates.splice(index, 1);

    this.unfocusDate(() => onChange("userSelectedDates", newSelectedDates));
  };

  /**
   * Adds the given date to userSelectedDates and focuses it in the calendar.
   *
   * @param {String} date String in default date format to be added to
   * user selected dates
   */
  addSelectedDate = (date) => {
    const { userSelectedDates, onChange } = this.props;
    const newDate = date + "T:Z";

    let newSelectedDates = userSelectedDates.slice();
    let index = 0;
    while (date.localeCompare(newSelectedDates[index]) > 0) {
      index++;
    }
    newSelectedDates.splice(index, 0, newDate); // maintain sorted order

    this.focusDate(newDate, () =>
      onChange("userSelectedDates", newSelectedDates)
    );
  };

  /**
   * Updates the time of this date in userSelectedDates.
   *
   * @param {Number} index Index in userSelectedDates to update
   * @param {String} date String in default date format
   * @param {String} time New start time for the date ("hh:mm")
   */
  updateSelectedDate = (index, date, time) => {
    const { userSelectedDates, onChange } = this.props;
    const newDate = `${date}T${time}Z`;

    let newSelectedDates = userSelectedDates.slice();
    newSelectedDates[index] = newDate;

    onChange("userSelectedDates", newSelectedDates);
  };

  /**
   * Sets focusedDate in this.state to the given date (excluding time), and
   * focusedStartTime to the time from the date string.
   *
   * @param {String} dateTime Date string in ISO 8601 format: YYYY-MM-DDThh:mmZ
   * @param {Function} callback Function (void, no args) to call after state
   * updates
   */
  focusDate = (dateTime, callback) => {
    this.setState(
      {
        focusedDate: dateTime.slice(0, 10),
        focusedStartTime: dateTime.slice(11, -1),
      },
      callback
    );
  };

  /**
   * Sets focusedDate and focusedStartTime in this.state to null.
   *
   * @param {Function} callback Function (void, no args) to call after state
   * updates
   */
  unfocusDate = (callback) => {
    this.setState({ focusedDate: null, focusedStartTime: null }, callback);
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
      isExcludedDate,
      isExtraneousDate,
      addSelectedDate,
      findSelectedDate,
      focusDate,
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
        let index = findSelectedDate(date);
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
      isSelectedDate,
      isExcludedDate,
      isExtraneousDate,
    } = this;
    let style = "day";

    if (isDistributionDate(date)) {
      if (!isExcludedDate(date)) {
        style += " distribution";
      }
    } else if (isSelectedDate(date)) {
      style += " selected";
    }

    if (isExtraneousDate(date)) {
      style += style === "day" ? " extraneous" : "-extraneous";
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
      unfocusDate,
      findSelectedDate,
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
            <div className="week">
              {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(
                (weekDay) => (
                  <div className="day-name" key={weekDay}>
                    {weekDay}
                  </div>
                )
              )}
            </div>
            {calendar.map((week) => (
              <div className="week" key={week}>
                {week.map((date) => {
                  let index = findSelectedDate(date);
                  return (
                    <div
                      key={date}
                      className={getDateStyle(date)}
                      onClick={() => handleDateSelect(date)}
                    >
                      {date.slice(8, 10)}
                      {index !== -1 && (
                        <TimeInputPopup
                          value={focusedStartTime}
                          valid={validCheck(`userSelectedDates[${index}]`)}
                          shown={isFocusedDate(date)}
                          onChange={(time) =>
                            updateSelectedDate(index, date, time)
                          }
                          onDelete={() => removeSelectedDate(date)}
                          onHide={unfocusDate}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Calendar;
