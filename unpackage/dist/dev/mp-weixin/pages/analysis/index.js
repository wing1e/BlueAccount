"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_userinfo = require("../../stores/userinfo.js");
const stores_panelinfo = require("../../stores/panelinfo.js");
const utils_calcChanges = require("../../utils/calc-changes.js");
const utils_timeChain = require("../../utils/time-chain.js");
if (!Math) {
  (headOptionsVue + pieChartVue + lineChartVue + barChartVue + classfiyListVue + trendListVue + incomeAndExpenseListVue)();
}
const headOptionsVue = () => "./components/headOptions.js";
const barChartVue = () => "../../components/barChart.js";
const lineChartVue = () => "../../components/lineChart.js";
const pieChartVue = () => "../../components/pieChart.js";
const classfiyListVue = () => "./components/classfiyList.js";
const trendListVue = () => "./components/trendList.js";
const incomeAndExpenseListVue = () => "./components/incomeAndExpenseList.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const title = common_vendor.ref();
    const type = common_vendor.ref("expense");
    common_vendor.onLoad((options) => {
      title.value = options.title;
    });
    common_vendor.onReady(() => {
      common_vendor.index.setNavigationBarTitle({
        title: title.value
      });
    });
    const { getTotal } = stores_userinfo.userInfoStore();
    const { getPanelInfo } = stores_panelinfo.panelinfoStore();
    const data = common_vendor.computed(() => {
      console.log(title.value);
      const { date, range } = getPanelInfo(title.value);
      const { expense: currentExpense, income: currentIncome } = getTotal(date);
      const { expense: lastExpense, income: lastIncome } = getTotal(utils_timeChain.timeChain(date, range, "last"));
      const amount = type.value === "expense" ? currentExpense : currentIncome;
      const QOQ = type.value === "expense" ? utils_calcChanges.calcPercentage(currentExpense, lastExpense) : utils_calcChanges.calcPercentage(currentIncome, lastIncome);
      return { amount, QOQ };
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          ["panel-title"]: title.value
        }),
        b: common_vendor.t(type.value === "expense" ? `-${data.value.amount}` : data.value.amount),
        c: common_vendor.t(`环比 ${data.value.QOQ}`),
        d: title.value === "分类统计"
      }, title.value === "分类统计" ? {} : {}, {
        e: title.value === "日趋势"
      }, title.value === "日趋势" ? {} : {}, {
        f: title.value === "月度收支"
      }, title.value === "月度收支" ? {} : {}, {
        g: title.value === "分类统计"
      }, title.value === "分类统计" ? {} : {}, {
        h: title.value === "日趋势"
      }, title.value === "日趋势" ? {} : {}, {
        i: title.value === "月度收支"
      }, title.value === "月度收支" ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-49fa13a1"]]);
wx.createPage(MiniProgramPage);
