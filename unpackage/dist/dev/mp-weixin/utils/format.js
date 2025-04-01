"use strict";
const utils_getDate = require("./get-date.js");
const formatDate = (date) => {
  const arr = date.split("-");
  const year = utils_getDate.getNowDate().year;
  if (arr[0] == year) {
    return `${parseInt(arr[1])}月${parseInt(arr[2])}日`;
  } else {
    return `${parseInt(arr[0])}年${parseInt(arr[1])}月${parseInt(arr[2])}日`;
  }
};
const formatAmount = (num) => {
  const sign = num >= 0 ? "+" : "-";
  return sign + Math.abs(num).toFixed(2);
};
exports.formatAmount = formatAmount;
exports.formatDate = formatDate;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/format.js.map
