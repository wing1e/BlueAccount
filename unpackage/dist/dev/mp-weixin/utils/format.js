"use strict";
const utils_getDate = require("./get-date.js");
const formatDate = (date) => {
  if (!date)
    return "";
  const parts = date.split("-");
  const { year: currentYear } = utils_getDate.getNowDate();
  switch (parts.length) {
    case 1:
      return `${parseInt(parts[0])}年`;
    case 2:
      return parseInt(parts[0]) === currentYear ? `${parseInt(parts[1])}月` : `${parseInt(parts[0])}年${parseInt(parts[1])}月`;
    case 3:
      return parseInt(parts[0]) === currentYear ? `${parseInt(parts[1])}月${parseInt(parts[2])}日` : `${parseInt(parts[0])}年${parseInt(parts[1])}月${parseInt(parts[2])}日`;
    default:
      return date;
  }
};
const formatAmount = (num) => {
  const sign = num >= 0 ? "+" : "-";
  return sign + Math.abs(num).toFixed(2);
};
const formatOptionsDate = (targetDate, rangeIndex) => {
  const RANGE_YEAR = 0;
  const RANGE_MONTH = 1;
  const RANGE_WEEK = 2;
  const RANGE_DAY = 3;
  const {
    year
  } = utils_getDate.getNowDate();
  switch (rangeIndex) {
    case RANGE_YEAR:
      return targetDate;
    case RANGE_MONTH:
      const [showYear, showMonth] = targetDate.split("-");
      if (showYear === String(year)) {
        return `${parseInt(showMonth)}月`;
      }
      return `${parseInt(showYear)}年${parseInt(showMonth)}月`;
    case RANGE_WEEK:
      const {
        start,
        end
      } = utils_getDate.getWeek(targetDate.start);
      return `${formatDate(start)}-${formatDate(end)}`;
    case RANGE_DAY:
      const [dayYear, dayMonth, dayDay] = targetDate.split("-");
      if (dayYear === String(year)) {
        return `${parseInt(dayMonth)}.${parseInt(dayDay)}`;
      }
      return `${parseInt(dayYear)}.${parseInt(dayMonth)}.${parseInt(dayDay)}`;
    default:
      return targetDate;
  }
};
exports.formatAmount = formatAmount;
exports.formatDate = formatDate;
exports.formatOptionsDate = formatOptionsDate;
