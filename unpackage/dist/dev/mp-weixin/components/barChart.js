"use strict";
const common_vendor = require("../common/vendor.js");
const stores_userinfo = require("../stores/userinfo.js");
const stores_panelinfo = require("../stores/panelinfo.js");
const utils_chart_barChart = require("../utils/chart/bar-chart.js");
const _sfc_main = {
  __name: "barChart",
  setup(__props) {
    common_vendor.onMounted(() => {
      drawChart();
    });
    common_vendor.onShow(() => {
      drawChart();
    });
    const { getTotal, getPartData } = stores_userinfo.userInfoStore();
    const panelinfo = stores_panelinfo.panelinfoStore();
    const instance = common_vendor.getCurrentInstance();
    const canvasInfo = { className: ".barChart", id: "barChart" };
    const chartData = common_vendor.computed(() => {
      const data = [];
      const { date: year, type } = panelinfo.panelList[2];
      let monNum = 1;
      while (monNum <= 12) {
        const ym = year + "-" + String(monNum).padStart(2, "0");
        data.push({ date: ym, amount: type === 0 ? getTotal(ym).expense : getTotal(ym).income });
        monNum += 1;
      }
      return data;
    });
    const drawChart = () => {
      utils_chart_barChart.barChartInit(instance, chartData.value, canvasInfo.className, canvasInfo.id);
    };
    common_vendor.watch(
      () => stores_panelinfo.panelinfoStore().panelList[2].date,
      (date) => {
        drawChart();
      }
    );
    return (_ctx, _cache) => {
      return {
        a: canvasInfo.id,
        b: common_vendor.n(canvasInfo.className)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a4c4a885"]]);
wx.createComponent(Component);
