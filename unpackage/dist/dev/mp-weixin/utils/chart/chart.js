"use strict";
const CHART_STYLES = {
  grid: {
    color: "#E3E3E5",
    lineWidth: 1,
    dash: [2, 4]
  },
  line: {
    color: "#de6ea6",
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
  top: 10,
  bottom: 20
};
const calculateY = (value, maxValue, area) => {
  const Yrange = area.bottom - area.top;
  return area.top + Yrange * (1 - value / maxValue);
};
const drawGridLines = (ctx, canvasWidth, area) => {
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
};
exports.AXIS_MARGIN = AXIS_MARGIN;
exports.CHART_STYLES = CHART_STYLES;
exports.calculateY = calculateY;
exports.drawGridLines = drawGridLines;
