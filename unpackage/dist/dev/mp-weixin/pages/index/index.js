"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_userinfo = require("../../stores/userinfo.js");
if (!Math) {
  (indexChartVue + listVue + tabbarVue)();
}
const indexChartVue = () => "./components/indexChart.js";
const listVue = () => "./components/list.js";
const tabbarVue = () => "../../components/tabbar.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.onMounted(() => {
      fillData;
    });
    const { fillData } = stores_userinfo.userInfoStore();
    return (_ctx, _cache) => {
      return {};
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
