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
exports.getNowDate = getNowDate;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/now-date.js.map
