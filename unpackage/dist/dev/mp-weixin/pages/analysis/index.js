"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.onLoad((options) => {
      chartInfo.title = options.title;
      chartInfo.interval = options.interval;
    });
    const chartInfo = common_vendor.reactive({ title: "", interval: "" });
    return (_ctx, _cache) => {
      return {};
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/analysis/index.js.map
