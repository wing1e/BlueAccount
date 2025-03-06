"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Math) {
  (chartIndexVue + listIndexVue + BottomNavigationBarVue)();
}
const chartIndexVue = () => "../../components/chart-index.js";
const listIndexVue = () => "../../components/list-index.js";
const BottomNavigationBarVue = () => "../../components/BottomNavigationBar.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.onMounted(() => {
      getInfo();
    });
    const indexH = common_vendor.ref();
    const getInfo = () => {
      const instance = common_vendor.getCurrentInstance();
      const query = common_vendor.index.createSelectorQuery().in(instance);
      query.select(".index").boundingClientRect((data) => {
        indexH.value = data.height;
        common_vendor.index.__f__("log", "at pages/index/index.vue:53", indexH.value);
      }).exec();
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_assets._imports_1,
        c: common_vendor.p({
          indexH: indexH.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
