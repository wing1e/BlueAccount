"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_chart_pieChart = require("../../../utils/chart/pie-chart.js");
const stores_userinfo = require("../../../stores/userinfo.js");
const _sfc_main = {
  __name: "pieChart",
  setup(__props) {
    common_vendor.onMounted(() => {
      const instance = common_vendor.getCurrentInstance();
      utils_chart_pieChart.pieCharInit(instance, chartData.value, canvasInfo.className, canvasInfo.id);
    });
    const canvasInfo = { className: ".pieChart", id: "pieChart" };
    const { getCategoryPercentages } = stores_userinfo.userInfoStore();
    const pickDate = { start: "2023-03-22", end: "2023-03-28" };
    const chartData = common_vendor.computed(() => {
      return getCategoryPercentages(pickDate.start, pickDate.end);
    });
    return (_ctx, _cache) => {
      return {
        a: canvasInfo.id,
        b: common_vendor.n(canvasInfo.className)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-514f9476"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/chart/components/pieChart.js.map
