"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_getDate = require("../../utils/get-date.js");
const stores_userinfo = require("../../stores/userinfo.js");
const utils_format = require("../../utils/format.js");
const utils_timeChain = require("../../utils/time-chain.js");
const utils_calcChanges = require("../../utils/calc-changes.js");
if (!Math) {
  (headerVue + listVue)();
}
const headerVue = () => "./components/headOptions.js";
const listVue = () => "./components/list.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.onMounted(() => fillBrand());
    const { getTotal } = stores_userinfo.userInfoStore();
    utils_getDate.getNowDate();
    const filterData = common_vendor.reactive({
      range: 0,
      date: "2023",
      order: 0
    });
    const brandData = common_vendor.reactive([
      { title: "支出", num: "-12345.00", qoq: "12345.00", percentage: "100%" },
      { title: "收入", num: "12345.00", qoq: "12345.00", percentage: "100%" },
      { title: "结余", num: "12345.00", qoq: "12345.00", percentage: "100%" }
    ]);
    const handleFilterChange = (data) => {
      Object.assign(filterData, data);
      fillBrand();
    };
    const fillBrand = () => {
      const current = getTotal(filterData.date);
      const currentExpense = current.expense || 0;
      const currentIncome = current.income || 0;
      const currentBalance = currentIncome - currentExpense;
      const lastMonth = getTotal(utils_timeChain.timeChain(filterData.date, filterData.range, "last"));
      const lastExpense = lastMonth.expense || 0;
      const lastIncome = lastMonth.income || 0;
      const lastBalance = lastIncome - lastExpense;
      brandData[0].num = utils_format.formatAmount(-currentExpense);
      brandData[1].num = utils_format.formatAmount(currentIncome);
      brandData[2].num = utils_format.formatAmount(currentBalance);
      brandData[0].qoq = utils_calcChanges.calcQOQ(currentExpense, lastExpense);
      brandData[1].qoq = utils_calcChanges.calcQOQ(currentIncome, lastIncome);
      brandData[2].qoq = utils_calcChanges.calcQOQ(currentBalance, lastBalance);
      brandData[0].percentage = utils_calcChanges.calcPercentage(currentExpense, lastExpense);
      brandData[1].percentage = utils_calcChanges.calcPercentage(currentIncome, lastIncome);
      brandData[2].percentage = utils_calcChanges.calcPercentage(currentBalance, lastBalance);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleFilterChange),
        b: common_vendor.p({
          filterData
        }),
        c: common_vendor.t(common_vendor.unref(getTotal)(filterData.date).num + "笔交易"),
        d: common_vendor.f(brandData, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.num),
            c: common_vendor.t(item.qoq),
            d: common_vendor.t(item.percentage),
            e: index
          };
        }),
        e: common_vendor.p({
          filterData
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a45dfdea"]]);
wx.createPage(MiniProgramPage);
