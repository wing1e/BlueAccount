"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_userinfo = require("../../stores/userinfo.js");
if (!Math) {
  (chartIndexVue + listIndexVue + tabbarVue)();
}
const chartIndexVue = () => "./components/chart-index.js";
const listIndexVue = () => "./components/list-index.js";
const tabbarVue = () => "../../components/tabbar.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const { getLastData, getTotalDay } = stores_userinfo.userInfoStore();
    common_vendor.computed(() => {
      const lastDate = getLastData.date;
      const { expense } = getTotalDay(lastDate);
      return expense;
    });
    return (_ctx, _cache) => {
      return {};
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
