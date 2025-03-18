"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_userinfo = require("../../stores/userinfo.js");
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  (_easycom_u_icon + chartIndexVue + listIndexVue + tabbarVue)();
}
const chartIndexVue = () => "./components/chart-index.js";
const listIndexVue = () => "./components/list-index.js";
const tabbarVue = () => "../../components/tabbar.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const { getLastData, getTotalDay } = stores_userinfo.userInfoStore();
    const total = common_vendor.computed(() => {
      const lastDate = getLastData.date;
      const { expense } = getTotalDay(lastDate);
      return expense;
    });
    const istoday = () => {
      const today = (/* @__PURE__ */ new Date()).toLocaleDateString();
      const lastDate = getLastData.date;
      try {
        const d1 = parseDateString(today);
        const d2 = parseDateString(lastDate);
        const result = d1.year === d2.year && d1.month === d2.month && d1.day === d2.day;
        return result;
      } catch (e) {
        return false;
      }
    };
    const parseDateString = (dateStr) => {
      const parts = dateStr.split(/[-/]/);
      if (parts.length !== 3) {
        throw new Error("无效的日期格式");
      }
      return {
        year: parseInt(parts[0], 10),
        month: parseInt(parts[1], 10),
        day: parseInt(parts[2], 10)
      };
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          name: "rmb",
          color: "#fff",
          size: "26"
        }),
        b: common_vendor.t(istoday() ? "今日支出" : "最近一天的支出"),
        c: common_vendor.t(total.value)
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
