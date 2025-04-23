"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_nodeInfo = require("../node-info.js");
const utils_chart_chart = require("./chart.js");
const barChartInit = async (instance, chartData, className, canvasId) => {
  try {
    const canvasNode = await utils_nodeInfo.getNodeInfo(instance, className);
    const {
      width: ctxW,
      height: ctxH
    } = canvasNode[0];
    const ctx = common_vendor.index.createCanvasContext(canvasId, instance);
    const drawArea = {
      top: utils_chart_chart.AXIS_MARGIN.top,
      bottom: ctxH - utils_chart_chart.AXIS_MARGIN.bottom,
      get center() {
        return (this.top + this.bottom) / 2;
      }
    };
    utils_chart_chart.drawGridLines(ctx, ctxW, drawArea, chartData);
    drawBottomLabels(ctx, ctxW, drawArea.bottom, chartData, "bar");
    const BarSpace = ctxW / 25;
    const MaxValue = Math.max(...chartData.map((item) => item.amount));
    const points = chartData.map((item, index) => ({
      x: (2 * index + 1) * BarSpace,
      y: utils_chart_chart.calculateY(item.amount, MaxValue, drawArea),
      value: item.amount
    }));
    points.forEach((item) => {
      ctx.fillRect(item.x, item.y, BarSpace, drawArea.bottom - item.y);
      ctx.setFillStyle("#de6ea6");
    });
    ctx.draw();
  } catch (err) {
    console.log(err);
  }
};
const drawBottomLabels = (ctx, canvasWidth, bottomY, data) => {
  const labelSpace = canvasWidth / 25;
  ctx.save();
  ctx.setFontSize(utils_chart_chart.CHART_STYLES.label.fontSize);
  ctx.fillStyle = utils_chart_chart.CHART_STYLES.label.color;
  data.forEach((item, index) => {
    const dateStr = item.date.split("-")[1];
    const xPos = (2 * index + 1) * labelSpace;
    ctx.setTextAlign("center");
    ctx.fillText(dateStr, xPos, bottomY + 15);
  });
  ctx.restore();
};
exports.barChartInit = barChartInit;
