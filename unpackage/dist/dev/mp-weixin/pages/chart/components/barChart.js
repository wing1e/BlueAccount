"use strict";
const common_vendor = require("../../../common/vendor.js");
const stores_userinfo = require("../../../stores/userinfo.js");
const stores_chartinterval = require("../../../stores/chartinterval.js");
const utils_chart_barChart = require("../../../utils/chart/bar-chart.js");
const _sfc_main = {
  __name: "barChart",
  setup(__props) {
    common_vendor.onMounted(() => {
      const instance = common_vendor.getCurrentInstance();
      utils_chart_barChart.barChartInit(instance, chartData.value, canvasInfo.className, canvasInfo.id);
    });
    const { getTotal, getPartData } = stores_userinfo.userInfoStore();
    const chartYear = stores_chartinterval.chartInterval().status.barChart;
    const canvasInfo = { className: ".barChart", id: "barChart" };
    const chartData = common_vendor.computed(() => {
      const data = [];
      let monNum = 1;
      while (monNum <= 12) {
        const ym = chartYear + "-" + String(monNum).padStart(2, "0");
        data.push({ date: ym, expense: getTotal(ym).expense });
        monNum += 1;
      }
      return data;
    });
    return (_ctx, _cache) => {
      return {
        a: canvasInfo.id,
        b: common_vendor.n(canvasInfo.className)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d090215c"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/chart/components/barChart.js.map
