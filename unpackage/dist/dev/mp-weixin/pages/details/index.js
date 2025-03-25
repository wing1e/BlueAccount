"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_nowDate = require("../../utils/now-date.js");
const stores_userinfo = require("../../stores/userinfo.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (headerVue + _easycom_uni_icons)();
}
const headerVue = () => "./components/header.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.onMounted(() => fillBrand());
    const { getTotal, getPartData } = stores_userinfo.userInfoStore();
    const { year, month } = utils_nowDate.getNowDate();
    const filterData = common_vendor.reactive({
      range: 1,
      date: year + "-" + month,
      order: "日期降序"
    });
    const brandData = common_vendor.reactive([
      { title: "支出", num: "-12345.00", qoq: "12345.00", percentage: "100%" },
      { title: "收入", num: "12345.00", qoq: "12345.00", percentage: "100%" },
      { title: "结余", num: "12345.00", qoq: "12345.00", percentage: "100%" }
    ]);
    const listData = common_vendor.computed(() => getPartData(filterData.date));
    const handleFilterChange = (data) => {
      Object.assign(filterData, data);
      fillBrand();
    };
    const fillBrand = () => {
      const current = getTotal(filterData.date);
      const currentExpense = current.expense || 0;
      const currentIncome = current.income || 0;
      const currentBalance = currentIncome - currentExpense;
      const lastMonth = getTotal(getLastData(filterData.date));
      const lastExpense = lastMonth.expense || 0;
      const lastIncome = lastMonth.income || 0;
      const lastBalance = lastIncome - lastExpense;
      brandData[0].num = formatAmount(-currentExpense);
      brandData[1].num = formatAmount(currentIncome);
      brandData[2].num = formatAmount(currentBalance);
      brandData[0].qoq = calcQOQ(currentExpense, lastExpense);
      brandData[1].qoq = calcQOQ(currentIncome, lastIncome);
      brandData[2].qoq = calcQOQ(currentBalance, lastBalance);
      brandData[0].percentage = calcPercentage(currentExpense, lastExpense);
      brandData[1].percentage = calcPercentage(currentIncome, lastIncome);
      brandData[2].percentage = calcPercentage(currentBalance, lastBalance);
    };
    const formatDate = (date) => {
      const arr = date.split("-");
      if (arr[0] == year) {
        return `${parseInt(arr[1])}月${parseInt(arr[2])}日`;
      } else {
        return `${parseInt(arr[0])}年${parseInt(arr[1])}月${parseInt(arr[2])}日`;
      }
    };
    const formatAmount = (num) => {
      const sign = num >= 0 ? "+" : "-";
      return sign + Math.abs(num).toFixed(2);
    };
    const calcQOQ = (current, last) => {
      const diff = current - last;
      return formatAmount(diff);
    };
    const calcPercentage = (current, last) => {
      if (last === 0)
        return current === 0 ? "0%" : "100%";
      return ((current / last - 1) * 100).toFixed(1) + "%";
    };
    const getLastData = (filterDate) => {
      if (filterData.range == 2) {
        const dateArr = filterDate.split("-");
        const lastDate = new Date(dateArr[0], dateArr[1] - 1, dateArr[2] - 1);
        const lastArr = lastDate.toLocaleDateString().split("/");
        return lastArr[0] + "-" + lastArr[1].padStart(2, "0") + "-" + lastArr[2].padStart(2, "0");
      } else if (filterData.range == 1) {
        const dateArr = filterDate.split("-");
        const lastDate = new Date(dateArr[0], dateArr[1] - 2);
        const lastArr = lastDate.toLocaleDateString().split("/");
        return lastArr[0] + "-" + lastArr[1].padStart(2, "0");
      } else if (filterData.range == 0) {
        const lastDate = new Date(filterDate - 1);
        return lastDate.toLocaleDateString().split("/")[0];
      }
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
        e: common_vendor.f(listData.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.records[0]
          }, item.records[0] ? {
            b: common_vendor.t(formatDate(item.date) + "   " + item.weekday),
            c: common_vendor.f(item.records, (record, i, i1) => {
              return common_vendor.e({
                a: "a45dfdea-1-" + i0 + "-" + i1,
                b: common_vendor.t(record.category),
                c: common_vendor.t(record.time),
                d: record.note
              }, record.note ? {
                e: common_vendor.t("   ·   " + record.note)
              } : {}, {
                f: common_vendor.t(record.type === "income" ? record.amount : "-" + record.amount),
                g: i
              });
            }),
            d: common_vendor.p({
              type: "smallcircle-filled",
              size: "8",
              color: "#FE5D20"
            })
          } : {}, {
            e: index
          });
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a45dfdea"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/details/index.js.map
