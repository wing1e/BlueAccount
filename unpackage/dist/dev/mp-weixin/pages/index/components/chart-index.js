"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_chartIndex = require("../../../utils/chartIndex.js");
const _sfc_main = {
  __name: "chart-index",
  setup(__props) {
    common_vendor.onMounted(() => {
      const instance = common_vendor.getCurrentInstance();
      utils_chartIndex.init(instance);
    });
    return (_ctx, _cache) => {
      return {};
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/index/components/chart-index.js.map
