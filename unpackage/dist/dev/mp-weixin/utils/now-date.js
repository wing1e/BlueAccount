"use strict";
const getNowDate = () => {
  let date = /* @__PURE__ */ new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let ymdDate = [year, month, day].join("-");
  return { year, month, day, date: ymdDate };
};
exports.getNowDate = getNowDate;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/now-date.js.map
