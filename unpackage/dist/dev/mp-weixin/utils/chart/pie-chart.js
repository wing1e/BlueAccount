"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_nodeInfo = require("../node-info.js");
const ACCOUNT_TYPE = [
  { "category": "购物", "color": "#00B6E6" },
  { "category": "餐饮", "color": "#FF6B6B" },
  { "category": "交通", "color": "#4CAF50" },
  { "category": "住房", "color": "#FFA726" },
  { "category": "娱乐", "color": "#9C27B0" },
  { "category": "医疗", "color": "#F44336" },
  { "category": "教育", "color": "#2196F3" },
  { "category": "投资", "color": "#FFD700" },
  { "category": "工资", "color": "#4CAF50" },
  { "category": "旅行", "color": "#E91E63" },
  { "category": "礼物", "color": "#FF4081" },
  { "category": "其他", "color": "#9E9E9E" }
];
const pieCharInit = async (instance, chartData, className, canvasId) => {
  try {
    const canvasNode = await utils_nodeInfo.getNodeInfo(instance, className);
    const { height: ctxH, width: ctxW } = canvasNode[0];
    const ctx = common_vendor.index.createCanvasContext(canvasId, instance);
    const centerX = ctxW / 2;
    const centerY = ctxH / 2;
    const outerR = (ctxH - 10) / 2;
    const innerR = (ctxH - 40) / 2;
    const expense = new Map(Object.entries(chartData.expense));
    let startAngle = -Math.PI / 2;
    expense.forEach((val, key) => {
      const sliceAngle = val / 100 * 2 * Math.PI;
      const endAngle = startAngle + sliceAngle;
      ctx.beginPath();
      ctx.arc(centerX, centerY, outerR, startAngle, endAngle, false);
      ctx.arc(centerX, centerY, innerR, endAngle, startAngle, true);
      ctx.closePath();
      ctx.setFillStyle(ACCOUNT_TYPE.find((item) => item.category == key).color);
      ctx.fill();
      startAngle = endAngle;
    });
    ctx.draw();
  } catch (error) {
    common_vendor.index.__f__("log", "at utils/chart/pie-chart.js:59", error);
  }
};
exports.pieCharInit = pieCharInit;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/utils/chart/pie-chart.js.map
