"use strict";
const common_vendor = require("../../../common/vendor.js");
const stores_chartinterval = require("../../../stores/chartinterval.js");
const _sfc_main = {
  __name: "lineChart",
  setup(__props) {
    common_vendor.onMounted(() => {
    });
    const canvasInfo = { className: ".lineChart", id: "lineChart" };
    stores_chartinterval.chartInterval().status.lineCart;
    return (_ctx, _cache) => {
      return {
        a: common_vendor.n(canvasInfo.className),
        b: canvasInfo.id
      };
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/chart/components/lineChart.js.map
