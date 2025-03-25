"use strict";
const common_vendor = require("../common/vendor.js");
const chartInterval = common_vendor.defineStore("chartInterval", {
  state: () => {
    return {
      status: {
        pieChart: "2023-03",
        lineChart: "2023-03",
        barChart: "2023"
      }
    };
  }
});
exports.chartInterval = chartInterval;
//# sourceMappingURL=../../.sourcemap/mp-weixin/stores/chartinterval.js.map
