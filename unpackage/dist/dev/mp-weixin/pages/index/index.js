"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_getnodeinfo = require("../../utils/getnodeinfo.js");
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  (_easycom_u_icon + chartIndexVue + listIndexVue + BottomNavigationBarVue)();
}
const chartIndexVue = () => "./components/chart-index.js";
const listIndexVue = () => "./components/list-index.js";
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
      utils_getnodeinfo.getNodeInfo(instance, ".index").then((res) => {
        indexH.value = res[0].height;
        common_vendor.index.__f__("log", "at pages/index/index.vue:52", indexH.value);
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          name: "rmb-circle",
          color: "#fff",
          size: "30"
        }),
        b: common_assets._imports_0,
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
