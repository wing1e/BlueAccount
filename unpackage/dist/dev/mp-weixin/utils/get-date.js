"use strict";
const getNowDate = () => {
  let date = /* @__PURE__ */ new Date();
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");
  const ymdDate = [year, month, day].join("-");
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  const time = [hours, minutes].join(":");
  return { year, month, day, date: ymdDate, time };
};
const getWeek = (targetDate) => {
  const date = new Date(targetDate);
  const firstDayOfWeek = new Date(date.setDate(date.getDate() - date.getDay()));
  const startYear = firstDayOfWeek.getFullYear();
  const startMonth = String(firstDayOfWeek.getMonth() + 1).padStart(2, "0");
  const startDay = String(firstDayOfWeek.getDate()).padStart(2, "0");
  const endDayOfWeek = new Date(firstDayOfWeek.getTime() + 6 * 24 * 60 * 60 * 1e3);
  const endYear = endDayOfWeek.getFullYear();
  const endMonth = String(endDayOfWeek.getMonth() + 1).padStart(2, "0");
  const endDay = String(endDayOfWeek.getDate()).padStart(2, "0");
  return { start: `${startYear}-${startMonth}-${startDay}`, end: `${endYear}-${endMonth}-${endDay}` };
};
exports.getNowDate = getNowDate;
exports.getWeek = getWeek;
