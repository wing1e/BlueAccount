"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_chart_lineChart = require("../../../utils/chart/line-chart.js");
const stores_userinfo = require("../../../stores/userinfo.js");
const utils_getDate = require("../../../utils/get-date.js");
if (!Math) {
  RightButton();
}
const RightButton = () => "../../../components/RightButton.js";
const _sfc_main = {
  __name: "indexChart",
  setup(__props) {
    common_vendor.onMounted(() => {
      utils_chart_lineChart.indexChartInit(instance, chartData.value, canvasInfo.className, canvasInfo.id);
    });
    const canvasInfo = { className: ".barChart", id: "indexChart" };
    const store = stores_userinfo.userInfoStore();
    const chartData = common_vendor.computed(() => {
      return [...store.datalist].slice(-7).map((item) => ({
        date: item.date,
        expense: store.getTotal(item.date).expense
      }));
    });
    const title = String(utils_getDate.getNowDate().month) + "月支出";
    const total = common_vendor.computed(() => chartData.value.reduce((acc, { expense }) => acc + expense, 0));
    const instance = common_vendor.getCurrentInstance();
    common_vendor.watch(chartData, (newData) => {
      utils_chart_lineChart.indexChartInit(instance, newData, canvasInfo.className, canvasInfo.id);
    }, { deep: true });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(title),
        b: common_vendor.t("-" + total.value),
        c: common_vendor.t("平均值：" + (total.value / 7).toFixed(2)),
        d: canvasInfo.id,
        e: common_vendor.n(canvasInfo.className)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a54d8000"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/index/components/indexChart.js.map
