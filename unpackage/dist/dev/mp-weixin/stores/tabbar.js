"use strict";
const common_vendor = require("../common/vendor.js");
const tabBarStore = common_vendor.defineStore("tabbar", {
  state: () => {
    return { status: 0, pop: false };
  }
});
exports.tabBarStore = tabBarStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/stores/tabbar.js.map
