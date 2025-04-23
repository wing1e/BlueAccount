"use strict";
const utils_constants = require("./constants.js");
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
      return parseInt(parts[0]) === currentYear ? `${parseInt(parts[1])}月` : `${parseInt(parts[0])}.${parseInt(parts[1])}`;
    case 3:
      return parseInt(parts[0]) === currentYear ? `${parseInt(parts[1])}.${parseInt(parts[2])}` : `${parseInt(parts[0])}.${parseInt(parts[1])}.${parseInt(parts[2])}`;
    default:
      return date;
  }
};
const formatAmount = (num) => {
  const sign = num >= 0 ? "+" : "-";
  return sign + Math.abs(num).toFixed(2);
};
const formatOptionsDate = (targetDate, rangeVal) => {
  const { range_year, range_month, range_week, range_day } = utils_constants.PICKER_INFO.picker_range;
  switch (rangeVal) {
    case range_year:
      return targetDate;
    case range_month:
      return formatDate(targetDate);
    case range_week:
      const { start, end } = utils_getDate.getWeek(targetDate.start);
      return `${formatDate(start)}-${formatDate(end)}`;
    case range_day:
      return formatDate(targetDate);
    default:
      return targetDate;
  }
};
exports.formatAmount = formatAmount;
exports.formatDate = formatDate;
exports.formatOptionsDate = formatOptionsDate;
