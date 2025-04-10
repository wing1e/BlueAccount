"use strict";
const common_vendor = require("../common/vendor.js");
const utils_chart_pieChart = require("../utils/chart/pie-chart.js");
const stores_userinfo = require("../stores/userinfo.js");
const stores_panelinfo = require("../stores/panelinfo.js");
const _sfc_main = {
  __name: "pieChart",
  setup(__props) {
    common_vendor.onMounted(() => {
      drawChart();
    });
    const instance = common_vendor.getCurrentInstance();
    const canvasInfo = { className: ".pieChart", id: "pieChart" };
    const { getCategoryInfo } = stores_userinfo.userInfoStore();
    const { panelList, getPanelInfo } = stores_panelinfo.panelinfoStore();
    const chartData = common_vendor.computed(() => {
      const pickDate = panelList[0].date;
      return getCategoryInfo(pickDate);
    });
    const drawChart = () => {
      utils_chart_pieChart.pieCharInit(instance, chartData.value, canvasInfo.className, canvasInfo.id);
    };
    common_vendor.watch(() => stores_panelinfo.panelinfoStore().panelList[0].date, () => {
      console.log("change");
      drawChart();
    });
    return (_ctx, _cache) => {
      return {
        a: canvasInfo.id,
        b: common_vendor.n(canvasInfo.className)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c82c6cf3"]]);
wx.createComponent(Component);
