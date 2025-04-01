"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_chart_pieChart = require("../../../utils/chart/pie-chart.js");
const stores_userinfo = require("../../../stores/userinfo.js");
const pickDate = "2023-03";
const _sfc_main = {
  __name: "pieChart",
  setup(__props) {
    common_vendor.onMounted(() => {
      const instance = common_vendor.getCurrentInstance();
      utils_chart_pieChart.pieCharInit(instance, chartData.value, canvasInfo.className, canvasInfo.id);
    });
    const canvasInfo = { className: ".pieChart", id: "pieChart" };
    const { getCategoryPercentages } = stores_userinfo.userInfoStore();
    const chartData = common_vendor.computed(() => {
      return getCategoryPercentages(pickDate);
    });
    common_vendor.index.__f__("log", "at pages/chart/components/pieChart.vue:24", chartData.value);
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
