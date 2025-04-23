"use strict";
const CHART_STYLES = {
  grid: {
    color: "#E3E3E5",
    lineWidth: 1,
    dash: [2, 4]
  },
  line: {
    color: "rgba(0, 67, 164, 0.6)",
    lineWidth: 2,
    fill: "rgba(0, 182, 230, 0.3)"
  },
  point: {
    radius: 3,
    fill: "#00B6E6",
    stroke: true
  },
  label: {
    fontSize: 12,
    color: "#5c5c5c"
  }
};
const AXIS_MARGIN = {
  top: 10,
  bottom: 20,
  left: 40
};
const calculateY = (value, maxValue, area) => {
  const Yrange = area.bottom - area.top;
  return area.top + Yrange * (1 - value / maxValue);
};
const drawGridLines = (ctx, canvasWidth, area, chartData) => {
  const maxValue = Math.max(...chartData.map((item) => item.amount));
  const medValue = maxValue / 2;
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = CHART_STYLES.grid.color;
  ctx.lineWidth = CHART_STYLES.grid.lineWidth;
  ctx.moveTo(0, area.bottom);
  ctx.lineTo(canvasWidth, area.bottom);
  if (maxValue !== 0) {
    drawText(ctx, medValue, AXIS_MARGIN.left / 2, area.center);
    drawText(ctx, maxValue, AXIS_MARGIN.left / 2, area.top);
  }
  ctx.stroke();
  ctx.restore();
};
const drawText = (ctx, text, x, y) => {
  ctx.setFontSize(CHART_STYLES.label.fontSize);
  ctx.setTextAlign("center");
  ctx.setTextBaseline("middle");
  ctx.setFillStyle(CHART_STYLES.label.color);
  ctx.fillText(text, x, y);
};
exports.AXIS_MARGIN = AXIS_MARGIN;
exports.CHART_STYLES = CHART_STYLES;
exports.calculateY = calculateY;
exports.drawGridLines = drawGridLines;
