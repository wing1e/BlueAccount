"use strict";
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
  if (dateType === 3) {
    const offset = chainType === "last" ? -1 : 1;
    date.setDate(date.getDate() + offset);
  } else if (dateType === 2) {
    const day = new Date(utils_getDate.getWeek(date).start).getDate();
    date.setDate(day);
    const offset = chainType === "last" ? -1 : 1;
    date.setDate(date.getDate() + offset * 7);
  } else if (dateType === 1) {
    const offset = chainType === "last" ? -1 : 1;
    date.setMonth(date.getMonth() + offset);
  } else if (dateType === 0) {
    const offset = chainType === "last" ? -1 : 1;
    date.setFullYear(date.getFullYear() + offset);
  }
  if (dateType === 3) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  } else if (dateType === 2) {
    const { start, end } = utils_getDate.getWeek(date);
    return { start, end };
  } else if (dateType === 1) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  } else if (dateType === 0) {
    return String(date.getFullYear());
  }
  return targetDate;
};
exports.timeChain = timeChain;
