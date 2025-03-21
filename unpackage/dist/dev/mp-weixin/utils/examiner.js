"use strict";
const examiner = (data) => {
  data.forEach((item) => {
    if (item.records) {
      return true;
    } else {
      return false;
    }
  });
};
exports.examiner = examiner;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/examiner.js.map
