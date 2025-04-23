"use strict";
const utils_constants = require("./constants.js");
const utils_getDate = require("./get-date.js");
const timeChain = (targetDate, dateType, chainType) => {
  let date;
  if (typeof targetDate === "object" && targetDate.start && targetDate.end) {
    date = new Date(targetDate.start);
    console.log("origin:" + date.toLocaleDateString());
  } else if (targetDate.includes("-")) {
    if (targetDate.split("-").length === 2) {
      const [year, month] = targetDate.split("-");
      date = new Date(year, month - 1);
    } else {
      date = new Date(targetDate);
    }
  } else {
    date = new Date(targetDate, 0);
  }
  const { range_year, range_month, range_week, range_day } = utils_constants.PICKER_INFO.picker_range;
  if (dateType === range_day) {
    const offset = chainType === "last" ? -1 : 1;
    date.setDate(date.getDate() + offset);
  } else if (dateType === range_week) {
    const day = new Date(utils_getDate.getWeek(date).start).getDate();
    date.setDate(day);
    const offset = chainType === "last" ? -1 : 1;
    date.setDate(date.getDate() + offset * 7);
  } else if (dateType === range_month) {
    const offset = chainType === "last" ? -1 : 1;
    date.setMonth(date.getMonth() + offset);
  } else if (dateType === range_year) {
    const offset = chainType === "last" ? -1 : 1;
    date.setFullYear(date.getFullYear() + offset);
  }
  if (dateType === range_day) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  } else if (dateType === range_week) {
    const { start, end } = utils_getDate.getWeek(date);
    return { start, end };
  } else if (dateType === range_month) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  } else if (dateType === range_year) {
    return String(date.getFullYear());
  }
  return targetDate;
};
exports.timeChain = timeChain;
