"use strict";
const stores_userinfo = require("../stores/userinfo.js");
const OptionsActionExaminer = (nextDate) => {
  const userMinDate = stores_userinfo.userInfoStore().datalist[0].date;
  const minDate = parseDate(userMinDate);
  const maxDate = Date.now();
  if (typeof nextDate === "string") {
    const date = parseDate(nextDate);
    if (nextDate.split("-").length === 1) {
      const minYear = minDate.getFullYear();
      const maxYear = new Date(maxDate).getFullYear();
      const year = parseInt(nextDate);
      return year >= minYear && year <= maxYear;
    }
    return date >= minDate && date <= maxDate;
  } else if (typeof nextDate === "object") {
    const start = parseDate(nextDate == null ? void 0 : nextDate.start);
    const end = parseDate(nextDate == null ? void 0 : nextDate.end);
    return start >= minDate && start <= maxDate && (end >= minDate && end <= maxDate);
  } else {
    throw new Error("Invalid date format");
  }
};
const parseDate = (date) => {
  const parts = date.split("-");
  let year, month, day;
  switch (parts.length) {
    case 3:
      [year, month, day] = parts.map(Number);
      return new Date(year, month - 1, day);
    case 2:
      [year, month] = parts.map(Number);
      return new Date(year, month - 1, 1);
    case 1:
      [year] = parts.map(Number);
      return new Date(year, 0, 1);
    default:
      throw new Error("Invalid date format");
  }
};
exports.OptionsActionExaminer = OptionsActionExaminer;
