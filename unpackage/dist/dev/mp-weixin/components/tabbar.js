"use strict";
const common_vendor = require("../common/vendor.js");
const stores_tabbar = require("../stores/tabbar.js");
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "../uni_modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  _easycom_u_icon();
}
const _sfc_main = {
  __name: "tabbar",
  setup(__props) {
    const btnInfo = [
      { title: "首页", uncheck: "home", check: "home-filled", status: 0 },
      { title: "账单", uncheck: "map", check: "map-filled", status: 1 },
      { title: "资产", uncheck: "rmb-circle", check: "rmb-circle-fill", status: 2 },
      { title: "我的", uncheck: "account", check: "account-fill", status: 3 }
    ];
    const judgeStatus = (status) => {
      if (status === stores_tabbar.tabBarStore().status) {
        return "#0039A4";
      }
      return "#8B97A9";
    };
    const navigationMap = /* @__PURE__ */ new Map([
      [0, "/pages/index/index"],
      [1, "/pages/contents/contents"]
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
            a: "373c25d2-0-" + i0,
            b: common_vendor.p({
              name: item.uncheck,
              size: "32",
              color: judgeStatus(item.status)
            }),
            c: common_vendor.t(item.title),
            d: judgeStatus(item.status),
            e: index,
            f: common_vendor.o(($event) => navigation(item.status), index)
          };
        }),
        b: common_vendor.p({
          name: "plus",
          size: "34",
          color: "#fff"
        })
      };
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/tabbar.js.map
