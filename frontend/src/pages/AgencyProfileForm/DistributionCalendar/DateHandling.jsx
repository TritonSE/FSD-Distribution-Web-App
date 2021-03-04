import moment from "moment";

export function stripTime(mom) {
  let newMom = mom.clone();
  return newMom.set({ hour: 0, minute: 0, second: 0 });
}

export function isExtraneousDate(date, baseCalendarValue) {
  let dateMonth = parseInt(date.slice(0, 2));
  let calendarMonth = baseCalendarValue.month();
  let calendarMonthNum = parseInt(moment().month(calendarMonth).format("M"));
  if (dateMonth !== calendarMonthNum) {
    return true;
  }
  return false;
}
