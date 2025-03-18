"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_chartIndex = require("../../../utils/chartIndex.js");
const stores_userinfo = require("../../../stores/userinfo.js");
const _sfc_main = {
  __name: "chart-index",
  setup(__props) {
    common_vendor.onMounted(() => {
      const instance = common_vendor.getCurrentInstance();
      utils_chartIndex.init(instance, chartData.value);
    });
    const store = stores_userinfo.userInfoStore();
    const chartData = common_vendor.computed(() => {
      return [...store.datalist].slice(-7).map((item) => ({
        date: item.date,
        expense: store.getTotalDay(item.date).expense
      }));
    });
    const total = common_vendor.computed(() => chartData.value.reduce((acc, { expense }) => acc + expense, 0));
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t("总支出：" + total.value),
        b: common_vendor.t("平均值：" + (total.value / 7).toFixed(2))
      };
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/index/components/chart-index.js.map
