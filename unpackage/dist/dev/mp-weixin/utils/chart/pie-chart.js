"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_nodeInfo = require("../node-info.js");
const utils_constants = require("../constants.js");
const LABEL_CONFIG = {
  LINE_OFFSET: 20,
  // 折线延伸长度
  LABEL_OFFSET: 30
  // 标签与折线拐点间距
};
const pieCharInit = async (instance, chartData, className, canvasId) => {
  try {
    const canvasNode = await utils_nodeInfo.getNodeInfo(instance, className);
    const {
      height: ctxH,
      width: ctxW
    } = canvasNode[0];
    const ctx = common_vendor.index.createCanvasContext(canvasId, instance);
    const centerX = ctxW / 2;
    const centerY = ctxH / 2;
    const outerR = ctxH / 3;
    const innerR = ctxH / 4;
    const expense = chartData.expense;
    let startAngle = -Math.PI / 2;
    expense.forEach((info) => {
      const sliceAngle = info.percent / 100 * 2 * Math.PI;
      const endAngle = startAngle + sliceAngle;
      ctx.beginPath();
      ctx.arc(centerX, centerY, outerR, startAngle, endAngle, false);
      ctx.arc(centerX, centerY, innerR, endAngle, startAngle, true);
      ctx.closePath();
      ctx.setFillStyle(utils_constants.EXPENSE_TYPE.find((item) => item.category === info.category).color);
      ctx.fill();
      if (Number(info.percent) >= 5) {
        const midAngle = startAngle + sliceAngle / 2;
        const isRight = Math.cos(midAngle) > 0;
        const lineStartX = centerX + outerR * Math.cos(midAngle);
        const lineStartY = centerY + outerR * Math.sin(midAngle);
        const lineBreakX = centerX + (outerR + LABEL_CONFIG.LINE_OFFSET) * Math.cos(midAngle);
        const lineBreakY = centerY + (outerR + LABEL_CONFIG.LINE_OFFSET) * Math.sin(midAngle);
        const labelX = isRight ? lineBreakX + LABEL_CONFIG.LABEL_OFFSET : lineBreakX - LABEL_CONFIG.LABEL_OFFSET;
        const labelY = lineBreakY;
        ctx.beginPath();
        ctx.moveTo(lineStartX, lineStartY);
        if (Math.cos(midAngle) > 0) {
          ctx.lineTo(lineBreakX, lineBreakY);
          ctx.lineTo(lineBreakX + LABEL_CONFIG.LINE_OFFSET, lineBreakY);
        } else {
          ctx.lineTo(lineBreakX, lineBreakY);
          ctx.lineTo(lineBreakX - LABEL_CONFIG.LINE_OFFSET, lineBreakY);
        }
        ctx.setStrokeStyle("#282C35");
        ctx.setLineWidth(1);
        ctx.stroke();
        const colorMap = new Map(utils_constants.EXPENSE_TYPE.map((item) => [item.category, item.color]));
        const textAlign = isRight ? "left" : "right";
        drawLabelText(ctx, `${info.category} ${Number(info.percent).toFixed(1)}%`, labelX, labelY, textAlign, colorMap.get(info.category));
      }
      startAngle = endAngle;
    });
    ctx.draw();
  } catch (error) {
    console.log(error);
  }
};
const drawLabelText = (ctx, text, x, y, align, color) => {
  ctx.save();
  ctx.setFontSize(12);
  ctx.setFillStyle(color);
  ctx.setTextAlign(align);
  ctx.setTextBaseline("middle");
  ctx.fillText(text, x, y);
  ctx.restore();
};
exports.pieCharInit = pieCharInit;
