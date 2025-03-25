"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_chart_lineChart = require("../../../utils/chart/line-chart.js");
const stores_chartinterval = require("../../../stores/chartinterval.js");
const stores_userinfo = require("../../../stores/userinfo.js");
const _sfc_main = {
  __name: "lineChart",
  setup(__props) {
    common_vendor.onMounted(() => {
      const instance = common_vendor.getCurrentInstance();
      utils_chart_lineChart.indexChartInit(instance, chartData.value, canvasInfo.className, canvasInfo.id);
    });
    const canvasInfo = { className: ".lineChart", id: "lineChart" };
    const { getPartData, getTotal } = stores_userinfo.userInfoStore();
    const chartData = common_vendor.computed(() => {
      const partData = getPartData(stores_chartinterval.chartInterval().status.lineChart);
      return partData.map((item) => ({
        date: item.date,
        expense: getTotal(item.date).expense
      }));
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.n(canvasInfo.className),
        b: canvasInfo.id
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4c5ff42"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/chart/components/lineChart.js.map
