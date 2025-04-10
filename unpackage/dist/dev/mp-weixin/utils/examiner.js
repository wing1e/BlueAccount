"use strict";
const examiner = (data) => {
  const result1 = data.some((item) => item == null ? void 0 : item.expense);
  const result2 = data.some((item) => (item == null ? void 0 : item.records) && Array.isArray(item.records) && item.records.length > 0);
  if (result1 || result2) {
    return true;
  } else {
    return false;
  }
};
exports.examiner = examiner;
