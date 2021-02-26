export function areSimilarMoments(mom1, mom2) {
  return (
    mom1.isSame(mom2, "day") &&
    mom1.isSame(mom2, "month") &&
    mom1.isSame(mom2, "year")
  );
}

export function stripTime(momentObj) {
  let newMomentObj = momentObj.clone();
  return newMomentObj.set({ hour: 0, minute: 0, second: 0 });
}

export function isExtraneousDay(day, value) {
  return (dayInPriorMonth(day, value) || dayInSubsequentMonth(day, value));
}

export function dayInPriorMonth(day, value) {
  let priorMonthValue = value.clone().subtract(1, "month");
  return day.isSame(priorMonthValue, "month");
}

export function dayInSubsequentMonth(day, value) {
  let subsequentMonthValue = value.clone().add(1, "month");
  return day.isSame(subsequentMonthValue, "month");
}
