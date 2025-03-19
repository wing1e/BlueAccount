"use strict";
const common_vendor = require("../common/vendor.js");
const utils_getnodeinfo = require("./getnodeinfo.js");
const init = async (instance, chartData, className, canvasId) => {
  try {
    const canvasNode = await utils_getnodeinfo.getNodeInfo(instance, className);
    const { width: ctxW, height: ctxH } = canvasNode[0];
    const ctx = common_vendor.index.createCanvasContext(canvasId, instance);
    const yMin = 100;
    const yMax = ctxH - 15;
    ctx.moveTo(0, yMax);
    ctx.lineTo(ctxW, yMax);
    ctx.strokeStyle = "#E3E3E5";
    ctx.stroke();
    ctx.beginPath();
    ctx.setLineDash([2, 4]);
    ctx.lineWidth = 1;
    ctx.moveTo(0, (yMax + yMin) / 2);
    ctx.lineTo(ctxW, (yMax + yMin) / 2);
    ctx.stroke();
    const space = ctxW / 8;
    const data = [...new Set(chartData.map((item) => item.date.split(/[-]/)[1] + "-" + item.date.split(/[-]/)[2]))];
    const weekStrings = data.map((date, i) => {
      const textAlign = "center";
      return {
        date,
        textAlign,
        x: (i + 1) * space
      };
    });
    ctx.setFontSize(10);
    weekStrings.forEach(({ date, textAlign, x }) => {
      ctx.setTextAlign(textAlign);
      ctx.fillText(date, x, ctxH, space);
    });
    const maxY = Math.max(...chartData.map((item) => item.expense));
    const points = chartData.map((item, i) => {
      return {
        x: (i + 1) * space,
        y: ((yMax - yMin) * (1 - item.expense / maxY) + yMin).toFixed(1),
        expense: item.expense
      };
    });
    ctx.beginPath();
    ctx.lineWidth = 0.5;
    ctx.moveTo(points[0].x, points[0].y);
    points.forEach((point) => ctx.lineTo(point.x, point.y));
    ctx.strokeStyle = "#909090";
    ctx.setLineDash([1, 0]);
    ctx.stroke();
    points.forEach((point) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#00B6E6";
      ctx.fill();
      ctx.lineWidth = 0.5;
      ctx.stroke();
    });
    ctx.draw();
  } catch (error) {
    common_vendor.index.__f__("log", "at utils/chartIndex.js:87", error);
  }
};
exports.init = init;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/chartIndex.js.map
