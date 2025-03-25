"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_examiner = require("../examiner.js");
const utils_nodeInfo = require("../node-info.js");
const utils_chart_chart = require("./chart.js");
const indexChartInit = async (instance, chartData, className, canvasId) => {
  try {
    const canvasNode = await utils_nodeInfo.getNodeInfo(instance, className);
    const { width: ctxW, height: ctxH } = canvasNode[0];
    const ctx = common_vendor.index.createCanvasContext(canvasId, instance);
    const drawArea = {
      top: utils_chart_chart.AXIS_MARGIN.top,
      bottom: ctxH - utils_chart_chart.AXIS_MARGIN.bottom,
      get center() {
        return (this.top + this.bottom) / 2;
      }
    };
    utils_chart_chart.drawGridLines(ctx, ctxW, drawArea);
    drawBottomLabels(ctx, ctxW, drawArea.bottom, chartData);
    if (utils_examiner.examiner(chartData)) {
      drawChartLine(ctx, chartData, ctxW, drawArea);
    }
    ctx.draw();
  } catch (error) {
    common_vendor.index.__f__("error", "at utils/chart/line-chart.js:36", "图表初始化失败:", error);
  }
};
const drawBottomLabels = (ctx, canvasWidth, bottomY, data) => {
  const labelSpace = canvasWidth / (data.length + 1);
  ctx.save();
  ctx.setFontSize(utils_chart_chart.CHART_STYLES.label.fontSize);
  ctx.fillStyle = utils_chart_chart.CHART_STYLES.label.color;
  if (data.length <= 12) {
    data.forEach((item, index) => {
      const dateStr = item.date.split("-").slice(-1);
      const xPos = (index + 1) * labelSpace;
      ctx.setTextAlign("center");
      ctx.fillText(dateStr, xPos, bottomY + 15);
    });
  } else {
    data.forEach((item, index) => {
      if (index % 6 === 0) {
        const dateStr = item.date.split("-").slice(-1);
        const xPos = (index + 1) * labelSpace;
        ctx.setTextAlign("center");
        ctx.fillText(dateStr, xPos, bottomY + 15);
      }
    });
  }
  ctx.restore();
};
const drawChartLine = (ctx, data, canvasWidth, area) => {
  const maxValue = Math.max(...data.map((item) => item.expense));
  const pointSpace = canvasWidth / (data.length + 1);
  const points = data.map((item, index) => ({
    x: (index + 1) * pointSpace,
    y: utils_chart_chart.calculateY(item.expense, maxValue, area),
    value: item.expense
  }));
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = utils_chart_chart.CHART_STYLES.line.color;
  ctx.lineWidth = utils_chart_chart.CHART_STYLES.line.lineWidth;
  ctx.setLineDash([]);
  points.forEach((point, index) => {
    index === 0 ? ctx.moveTo(point.x, point.y) : ctx.lineTo(point.x, point.y);
  });
  ctx.stroke();
  points.forEach((point) => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, utils_chart_chart.CHART_STYLES.point.radius, 0, Math.PI * 2);
    ctx.fillStyle = utils_chart_chart.CHART_STYLES.point.fill;
    ctx.fill();
    {
      ctx.stroke();
    }
  });
  ctx.restore();
};
exports.indexChartInit = indexChartInit;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/utils/chart/line-chart.js.map
