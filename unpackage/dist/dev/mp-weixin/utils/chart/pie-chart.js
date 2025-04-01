"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_nodeInfo = require("../node-info.js");
const EXPENSE_TYPE = [
  {
    "category": "购物",
    "color": "#00B6E6"
  },
  {
    "category": "餐饮",
    "color": "#FF6B6B"
  },
  {
    "category": "交通",
    "color": "#4CAF50"
  },
  {
    "category": "住房",
    "color": "#FFA726"
  },
  {
    "category": "娱乐",
    "color": "#9C27B0"
  },
  {
    "category": "医疗",
    "color": "#F44336"
  },
  {
    "category": "教育",
    "color": "#2196F3"
  },
  {
    "category": "投资",
    "color": "#FFD700"
  },
  {
    "category": "工资",
    "color": "#4CAF50"
  },
  {
    "category": "旅行",
    "color": "#E91E63"
  },
  {
    "category": "礼物",
    "color": "#FF4081"
  },
  {
    "category": "其他",
    "color": "#9E9E9E"
  }
];
const INCOME_TYPE = [
  {
    "category": "工资",
    "color": "#4CAF50"
  },
  {
    "category": "奖金",
    "color": "#9C27B0"
  },
  {
    "category": "兼职",
    "color": "#E91E63"
  },
  {
    "category": "理财",
    "color": "#FFC107"
  },
  {
    "category": "其他收入",
    "color": "#9E9E9E"
  }
];
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
    const expense = new Map(Object.entries(chartData.expense));
    let startAngle = -Math.PI / 2;
    expense.forEach((val, key) => {
      const sliceAngle = val / 100 * 2 * Math.PI;
      const endAngle = startAngle + sliceAngle;
      ctx.beginPath();
      ctx.arc(centerX, centerY, outerR, startAngle, endAngle, false);
      ctx.arc(centerX, centerY, innerR, endAngle, startAngle, true);
      ctx.closePath();
      ctx.setFillStyle(EXPENSE_TYPE.find((item) => item.category === key).color);
      ctx.fill();
      if (Number(val) >= 5) {
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
        const colorMap = new Map(EXPENSE_TYPE.map((item) => [item.category, item.color]));
        const textAlign = isRight ? "left" : "right";
        drawLabelText(ctx, `${key} ${Number(val).toFixed(1)}%`, labelX, labelY, textAlign, colorMap.get(key));
      }
      startAngle = endAngle;
    });
    ctx.draw();
  } catch (error) {
    common_vendor.index.__f__("log", "at utils/chart/pie-chart.js:166", error);
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
exports.EXPENSE_TYPE = EXPENSE_TYPE;
exports.INCOME_TYPE = INCOME_TYPE;
exports.pieCharInit = pieCharInit;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/utils/chart/pie-chart.js.map
