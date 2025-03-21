"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_examiner = require("../examiner.js");
const utils_nodeInfo = require("../node-info.js");
const CHART_STYLES = {
  grid: {
    color: "#E3E3E5",
    lineWidth: 1,
    dash: [2, 4]
  },
  line: {
    color: "#909090",
    lineWidth: 0.5
  },
  point: {
    radius: 3,
    fill: "#00B6E6",
    stroke: true
  },
  label: {
    fontSize: 10,
    color: "#000"
  }
};
const AXIS_MARGIN = {
  top: 100,
  bottom: 20
};
const indexChartInit = async (instance, chartData, className, canvasId) => {
  try {
    const canvasNode = await utils_nodeInfo.getNodeInfo(instance, className);
    const {
      width: ctxW,
      height: ctxH
    } = canvasNode[0];
    const ctx = common_vendor.index.createCanvasContext(canvasId, instance);
    const drawingArea = {
      top: AXIS_MARGIN.top,
      bottom: ctxH - AXIS_MARGIN.bottom,
      get center() {
        return (this.top + this.bottom) / 2;
      }
    };
    drawGridLines(ctx, ctxW, drawingArea);
    drawBottomLabels(ctx, ctxW, drawingArea.bottom, chartData);
    if (utils_examiner.examiner(chartData)) {
      drawChartLine(ctx, chartData, ctxW, drawingArea);
    }
    ctx.draw();
  } catch (error) {
    common_vendor.index.__f__("error", "at utils/chart/index-chart.js:70", "图表初始化失败:", error);
  }
};
function drawGridLines(ctx, canvasWidth, area) {
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = CHART_STYLES.grid.color;
  ctx.lineWidth = CHART_STYLES.grid.lineWidth;
  ctx.moveTo(0, area.bottom);
  ctx.lineTo(canvasWidth, area.bottom);
  ctx.stroke();
  ctx.beginPath();
  ctx.setLineDash(CHART_STYLES.grid.dash);
  ctx.moveTo(0, area.center);
  ctx.lineTo(canvasWidth, area.center);
  ctx.stroke();
  ctx.restore();
}
function drawBottomLabels(ctx, canvasWidth, bottomY, data) {
  const labelSpace = canvasWidth / (data.length + 1);
  ctx.save();
  ctx.setFontSize(CHART_STYLES.label.fontSize);
  ctx.fillStyle = CHART_STYLES.label.color;
  data.forEach((item, index) => {
    const dateStr = item.date.split("-").slice(1).join("-");
    const xPos = (index + 1) * labelSpace;
    ctx.setTextAlign("center");
    ctx.fillText(dateStr, xPos, bottomY + 15);
  });
  ctx.restore();
}
function drawChartLine(ctx, data, canvasWidth, area) {
  const maxValue = Math.max(...data.map((item) => item.expense));
  const pointSpace = canvasWidth / (data.length + 1);
  const points = data.map((item, index) => ({
    x: (index + 1) * pointSpace,
    y: calculateYPosition(item.expense, maxValue, area),
    value: item.expense
  }));
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = CHART_STYLES.line.color;
  ctx.lineWidth = CHART_STYLES.line.lineWidth;
  ctx.setLineDash([]);
  points.forEach((point, index) => {
    index === 0 ? ctx.moveTo(point.x, point.y) : ctx.lineTo(point.x, point.y);
  });
  ctx.stroke();
  points.forEach((point) => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, CHART_STYLES.point.radius, 0, Math.PI * 2);
    ctx.fillStyle = CHART_STYLES.point.fill;
    ctx.fill();
    {
      ctx.stroke();
    }
  });
  ctx.restore();
}
function calculateYPosition(value, maxValue, area) {
  const verticalRange = area.bottom - area.top;
  return area.top + verticalRange * (1 - value / maxValue);
}
exports.indexChartInit = indexChartInit;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/utils/chart/index-chart.js.map
