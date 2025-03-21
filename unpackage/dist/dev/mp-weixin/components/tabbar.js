"use strict";
const common_vendor = require("../common/vendor.js");
const stores_tabbar = require("../stores/tabbar.js");
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_u_icon2 + _easycom_uni_icons2)();
}
const _easycom_u_icon = () => "../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_uni_icons = () => "../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_u_icon + _easycom_uni_icons)();
}
const _sfc_main = {
  __name: "tabbar",
  setup(__props) {
    const btnInfo = [
      { title: "首页", uncheck: "home", check: "home-fill", status: 0 },
      { title: "图表", uncheck: "order", check: "order", status: 1 },
      { title: "资产", uncheck: "rmb-circle", check: "rmb-circle-fill", status: 2 },
      { title: "我的", uncheck: "account", check: "account-fill", status: 3 }
    ];
    const changeIcon = (item) => {
      if (item.status === stores_tabbar.tabBarStore().status) {
        return { color: "#0039A4", icon: item.check };
      }
      return { color: "#8B97A9", icon: item.uncheck };
    };
    const navigationMap = /* @__PURE__ */ new Map([
      [0, "/pages/index/index"],
      [1, "/pages/chart/index"]
    ]);
    const navigation = (status) => {
      if (status === stores_tabbar.tabBarStore().status)
        return;
      common_vendor.index.switchTab({
        url: navigationMap.get(status),
        success() {
          stores_tabbar.tabBarStore().status = status;
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(btnInfo, (item, index, i0) => {
          return {
            a: "c6a4bdcf-0-" + i0,
            b: common_vendor.p({
              name: changeIcon(item).icon,
              size: "28",
              color: changeIcon(item).color
            }),
            c: common_vendor.t(item.title),
            d: changeIcon(item).color,
            e: index,
            f: common_vendor.o(($event) => navigation(item.status), index)
          };
        }),
        b: common_vendor.p({
          type: "plusempty",
          size: "30",
          color: "#fff"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c6a4bdcf"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/tabbar.js.map
