"use strict";
const common_vendor = require("../common/vendor.js");
const utils_chart_lineChart = require("../utils/chart/line-chart.js");
const stores_panelinfo = require("../stores/panelinfo.js");
const stores_userinfo = require("../stores/userinfo.js");
const _sfc_main = {
  __name: "lineChart",
  setup(__props) {
    common_vendor.onMounted(() => {
      drawChart();
    });
    const instance = common_vendor.getCurrentInstance();
    const canvasInfo = { className: ".lineChart", id: "lineChart" };
    const { getPartData, getTotal } = stores_userinfo.userInfoStore();
    const { panelList } = stores_panelinfo.panelinfoStore();
    const chartData = common_vendor.computed(() => {
      const partData = getPartData(panelList[1].date);
      return partData.map((item) => ({
        date: item.date,
        expense: getTotal(item.date).expense
      }));
    });
    const drawChart = () => {
      utils_chart_lineChart.indexChartInit(instance, chartData.value, canvasInfo.className, canvasInfo.id);
    };
    common_vendor.watch(() => stores_panelinfo.panelinfoStore().panelList[1].date, () => {
      drawChart();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.n(canvasInfo.className),
        b: canvasInfo.id
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6e12d520"]]);
wx.createComponent(Component);
