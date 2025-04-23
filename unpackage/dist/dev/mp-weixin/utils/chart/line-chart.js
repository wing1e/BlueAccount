"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_nodeInfo = require("../node-info.js");
const utils_chart_chart = require("./chart.js");
const indexChartInit = async (instance, chartData, className, canvasId) => {
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
      left: utils_chart_chart.AXIS_MARGIN.left,
      get center() {
        return (this.top + this.bottom) / 2;
      }
    };
    utils_chart_chart.drawGridLines(ctx, ctxW, drawArea, chartData);
    drawBottomLabels(ctx, ctxW, drawArea.bottom, chartData);
    if (chartData.find((item) => item.amount > 0)) {
      drawChartLine(ctx, chartData, ctxW, drawArea);
    }
    ctx.draw();
  } catch (error) {
    console.error("图表初始化失败:", error);
  }
};
const drawBottomLabels = (ctx, canvasWidth, bottomY, data) => {
  const labelSpace = (canvasWidth - utils_chart_chart.AXIS_MARGIN.left) / data.length;
  ctx.save();
  ctx.setFontSize(utils_chart_chart.CHART_STYLES.label.fontSize);
  ctx.fillStyle = utils_chart_chart.CHART_STYLES.label.color;
  if (data.length <= 12) {
    data.forEach((item, index) => {
      const dateStr = item.date.split("-").slice(-1);
      const xPos = index * labelSpace + utils_chart_chart.AXIS_MARGIN.left;
      ctx.setTextAlign("center");
      ctx.fillText(dateStr, xPos, bottomY + 15);
    });
  } else {
    data.forEach((item, index) => {
      if (index % 6 === 0) {
        const dateStr = item.date.split("-").slice(-1);
        const xPos = index * labelSpace + utils_chart_chart.AXIS_MARGIN.left;
        ctx.setTextAlign("center");
        ctx.fillText(dateStr, xPos, bottomY + 15);
      }
    });
  }
  ctx.restore();
};
const drawChartLine = (ctx, chartData, canvasWidth, area) => {
  const maxValue = Math.max(...chartData.map((item) => item.amount));
  const pointSpace = (canvasWidth - utils_chart_chart.AXIS_MARGIN.left) / chartData.length;
  const points = chartData.map((item, index) => ({
    x: index * pointSpace + utils_chart_chart.AXIS_MARGIN.left,
    y: utils_chart_chart.calculateY(item.amount, maxValue, area),
    value: item.amount
  }));
  ctx.save();
  ctx.beginPath();
  if (points.length > 0) {
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      const curr = points[i];
      const prev = points[i - 1];
      const m = 0.4;
      const cp1x = prev.x + (curr.x - prev.x) * m;
      const cp1y = prev.y;
      const cp2x = prev.x + (curr.x - prev.x) * (1 - m);
      const cp2y = curr.y;
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, curr.x, curr.y);
    }
    ctx.lineTo(points[points.length - 1].x, area.bottom);
    ctx.lineTo(points[0].x, area.bottom);
    ctx.closePath();
    ctx.fillStyle = utils_chart_chart.CHART_STYLES.line.fill;
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      const curr = points[i];
      const prev = points[i - 1];
      const m = 0.4;
      const cp1x = prev.x + (curr.x - prev.x) * m;
      const cp1y = prev.y;
      const cp2x = prev.x + (curr.x - prev.x) * (1 - m);
      const cp2y = curr.y;
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, curr.x, curr.y);
    }
    ctx.strokeStyle = utils_chart_chart.CHART_STYLES.line.color;
    ctx.lineWidth = utils_chart_chart.CHART_STYLES.line.lineWidth;
    ctx.stroke();
  }
  ctx.restore();
};
exports.indexChartInit = indexChartInit;
