"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  __name: "chart-index",
  setup(__props) {
    common_vendor.onMounted(() => {
      init();
    });
    const init = () => {
      const instance = common_vendor.getCurrentInstance();
      common_vendor.ref();
      common_vendor.ref();
      const query = common_vendor.index.createSelectorQuery().in(instance);
      query.select(".barChart").boundingClientRect((data) => {
        if (data) {
          common_vendor.index.__f__("log", "at components/chart-index.vue:22", data.height, data.width);
          const ctxW = data.width;
          const ctxH = data.height;
          const ctx = common_vendor.index.createCanvasContext("barChart", instance);
          ctx.beginPath();
          ctx.setLineDash([2, 4]);
          ctx.strokeStyle = "#E3E3E5";
          ctx.lineWidth = 1;
          ctx.moveTo(0, 20);
          ctx.lineTo(ctxW, 20);
          ctx.moveTo(0, ctxH - 50);
          ctx.lineTo(ctxW, ctxH - 50);
          ctx.stroke();
          ctx.beginPath();
          ctx.setLineDash([1, 0]);
          ctx.strokeStyle = "#E3E3E5";
          ctx.lineWidth = 1;
          ctx.moveTo(0, (ctxH - 50) / 2 + 10);
          ctx.lineTo(ctxW, (ctxH - 50) / 2 + 10);
          ctx.stroke();
          const space = ctxW / 6;
          const weekStrings = [
            { date: "00-00", textAlign: "left", x: 0 },
            { date: "00-00", textAlign: "center", x: space },
            { date: "00-00", textAlign: "center", x: 2 * space },
            { date: "00-00", textAlign: "center", x: 3 * space },
            { date: "00-00", textAlign: "center", x: 4 * space },
            { date: "00-00", textAlign: "center", x: 5 * space },
            { date: "00-00", textAlign: "right", x: ctxW }
          ];
          ctx.setFontSize(8);
          for (let i = 0; i < 7; i++) {
            const { date, textAlign, x } = weekStrings[i];
            ctx.setTextAlign(textAlign);
            ctx.fillText(date, x, ctxH - 10);
          }
          ctx.draw();
        }
      }).exec();
    };
    return (_ctx, _cache) => {
      return {};
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/chart-index.js.map
