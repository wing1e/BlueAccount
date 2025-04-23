"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_nodeInfo = require("../node-info.js");
const utils_constants = require("../constants.js");
const utils_chart_chart = require("./chart.js");
const stores_panelinfo = require("../../stores/panelinfo.js");
const pieCharInit = async (instance, chartData, className, canvasId) => {
  try {
    const canvasNode = await utils_nodeInfo.getNodeInfo(instance, className);
    const { height: ctxH, width: ctxW } = canvasNode[0];
    const ctx = common_vendor.index.createCanvasContext(canvasId, instance);
    const centerX = ctxW / 2;
    const centerY = ctxH / 2;
    const outerR = ctxH / 3;
    const innerR = ctxH / 4;
    const lineOffset = ctxH / 10;
    const labelOffset = 20;
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerR, 0, Math.PI * 2, false);
    if (chartData.length > 0) {
      drwaChart(ctx, chartData, centerX, centerY, outerR, innerR, lineOffset, labelOffset);
    } else {
      ctx.beginPath();
      ctx.arc(centerX, centerY, outerR, 0, Math.PI * 2, false);
      ctx.arc(centerX, centerY, innerR, 0, Math.PI * 2, true);
      ctx.setFillStyle("#E5E5E5");
      ctx.fill();
    }
    ctx.draw();
  } catch (error) {
    console.log(error);
  }
};
const drwaChart = (ctx, chartData, centerX, centerY, outerR, innerR, lineOffset, labelOffset) => {
  let startAngle = -Math.PI / 2;
  const type = stores_panelinfo.panelinfoStore().panelList[0].type;
  const colorMap = new Map(
    type === 0 ? utils_constants.EXPENSE_TYPE.map((item) => [item.category, item.color]) : utils_constants.INCOME_TYPE.map((item) => [item.category, item.color])
  );
  chartData.forEach((info) => {
    const sliceAngle = info.percent / 100 * 2 * Math.PI;
    const endAngle = startAngle + sliceAngle;
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerR, startAngle, endAngle, false);
    ctx.arc(centerX, centerY, innerR, endAngle, startAngle, true);
    ctx.closePath();
    ctx.setFillStyle(colorMap.get(info.category));
    ctx.fill();
    if (Number(info.percent) >= 5) {
      const midAngle = startAngle + sliceAngle / 2;
      const isRight = Math.cos(midAngle) > 0;
      const lineStartX = centerX + outerR * Math.cos(midAngle);
      const lineStartY = centerY + outerR * Math.sin(midAngle);
      const lineBreakX = centerX + (outerR + lineOffset) * Math.cos(midAngle);
      const lineBreakY = centerY + (outerR + lineOffset) * Math.sin(midAngle);
      const labelX = isRight ? lineBreakX + labelOffset : lineBreakX - labelOffset;
      const labelY = lineBreakY;
      ctx.beginPath();
      ctx.moveTo(lineStartX, lineStartY);
      if (Math.cos(midAngle) > 0) {
        ctx.lineTo(lineBreakX, lineBreakY);
        ctx.lineTo(lineBreakX + lineOffset, lineBreakY);
      } else {
        ctx.lineTo(lineBreakX, lineBreakY);
        ctx.lineTo(lineBreakX - lineOffset, lineBreakY);
      }
      ctx.setStrokeStyle("#282C35");
      ctx.setLineWidth(1);
      ctx.stroke();
      const textAlign = isRight ? "left" : "right";
      drawLabelText(
        ctx,
        `${info.category} ${Number(info.percent).toFixed(1)}%`,
        labelX,
        labelY,
        textAlign,
        colorMap.get(info.category)
      );
    }
    startAngle = endAngle;
  });
};
const drawLabelText = (ctx, text, x, y, align, color) => {
  ctx.save();
  ctx.setFontSize(utils_chart_chart.CHART_STYLES.label.fontSize);
  ctx.setFillStyle(color);
  ctx.setTextAlign(align);
  ctx.setTextBaseline("middle");
  ctx.fillText(text, x, y);
  ctx.restore();
};
exports.pieCharInit = pieCharInit;
