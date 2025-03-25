"use strict";
const examiner = (data) => {
  const result1 = data.some((item) => item == null ? void 0 : item.expense);
  const result2 = data.some((item) => (item == null ? void 0 : item.records) && Array.isArray(item.records) && item.records.length > 0);
  if (result1) {
    return true;
  } else if (result2) {
    return true;
  } else {
    return false;
  }
};
exports.examiner = examiner;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/examiner.js.map
