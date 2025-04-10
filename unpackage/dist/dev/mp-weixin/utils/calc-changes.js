"use strict";
const utils_format = require("./format.js");
const calcQOQ = (current, last) => {
  const diff = current - last;
  return utils_format.formatAmount(diff);
};
const calcPercentage = (current, last) => {
  if (last === 0)
    return current === 0 ? "0%" : "100%";
  return ((current / last - 1) * 100).toFixed(1) + "%";
};
exports.calcPercentage = calcPercentage;
exports.calcQOQ = calcQOQ;
