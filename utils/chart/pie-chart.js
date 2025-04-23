import { getNodeInfo } from "../node-info.js";

import { EXPENSE_TYPE, INCOME_TYPE } from "../constants.js";
import { CHART_STYLES } from "./chart.js";
import { panelinfoStore } from "../../stores/panelinfo.js";

const LABEL_CONFIG = {
  LINE_OFFSET: 10, // 折线延伸长度
  LABEL_OFFSET: 20, // 标签与折线拐点间距
};

export const pieCharInit = async (instance, chartData, className, canvasId) => {
  try {
    const canvasNode = await getNodeInfo(instance, className);
    const { height: ctxH, width: ctxW } = canvasNode[0];
    const ctx = uni.createCanvasContext(canvasId, instance);

    const centerX = ctxW / 2; //圆心X坐标
    const centerY = ctxH / 2; //圆心Y坐标
    const outerR = ctxH / 3; //外圆半径
    const innerR = ctxH / 4; //内圆半径
		const lineOffset = ctxH/10 // 折线偏移量
    const labelOffset = 20 // 标签偏移量
    // 绘制背景
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerR, 0, Math.PI * 2, false);

    // 绘制饼图
    if (chartData.length > 0) {
      drwaChart(ctx, chartData, centerX, centerY, outerR, innerR,lineOffset,labelOffset);
    } else {
      ctx.beginPath();
      ctx.arc(centerX, centerY, outerR, 0, Math.PI * 2, false);
      ctx.arc(centerX, centerY, innerR, 0, Math.PI * 2, true);
      ctx.setFillStyle("#E5E5E5"); // 填充颜色
      ctx.fill();
    }

    // 执行绘制
    ctx.draw();
  } catch (error) {
    console.log(error);
  }
};
const drwaChart = (ctx, chartData, centerX, centerY, outerR, innerR,lineOffset,labelOffset) => {
  let startAngle = -Math.PI / 2; // 起始角度从12点方向开始
  const type = panelinfoStore().panelList[0].type; // 获取当前类型
  // 获取颜色映射
  const colorMap = new Map(
    type === 0
      ? EXPENSE_TYPE.map((item) => [item.category, item.color])
      : INCOME_TYPE.map((item) => [item.category, item.color])
  );
  chartData.forEach((info) => {
    const sliceAngle = (info.percent / 100) * 2 * Math.PI;
    const endAngle = startAngle + sliceAngle;

    // 绘制路径
    ctx.beginPath();
    // 外圆弧（顺时针）
    ctx.arc(centerX, centerY, outerR, startAngle, endAngle, false);
    // 内圆弧（逆时针返回，形成闭合环）
    ctx.arc(centerX, centerY, innerR, endAngle, startAngle, true);
    ctx.closePath();
    // 设置填充颜色
    ctx.setFillStyle(colorMap.get(info.category));
    ctx.fill();

    // 百分比大于5显示标签
    if (Number(info.percent) >= 5) {
      const midAngle = startAngle + sliceAngle / 2;
      const isRight = Math.cos(midAngle) > 0; // 判断扇形是否在右侧
      // 计算折线起点（外圆弧中点）
      const lineStartX = centerX + outerR * Math.cos(midAngle);
      const lineStartY = centerY + outerR * Math.sin(midAngle);

      // 计算折线拐点
      const lineBreakX =
        centerX + (outerR + lineOffset) * Math.cos(midAngle);
      const lineBreakY =
        centerY + (outerR + lineOffset) * Math.sin(midAngle);

      // 标签
      const labelX = isRight
        ? lineBreakX + labelOffset
        : lineBreakX - labelOffset;
      const labelY = lineBreakY;
      // 绘制折线
      ctx.beginPath();
      ctx.moveTo(lineStartX, lineStartY); // 起点：扇形边缘中点
      if (Math.cos(midAngle) > 0) {
        // 右侧扇区：向右水平延伸
        ctx.lineTo(lineBreakX, lineBreakY); // 水平转折
        ctx.lineTo(lineBreakX + lineOffset, lineBreakY); // 向右延伸
      } else {
        // 左侧扇区：向左水平延伸
        ctx.lineTo(lineBreakX, lineBreakY); // 水平转折
        ctx.lineTo(lineBreakX - lineOffset, lineBreakY); // 向左延伸
      }

      ctx.setStrokeStyle("#282C35"); // 折线颜色与扇区一致
      ctx.setLineWidth(1);
      ctx.stroke();

      const textAlign = isRight ? "left" : "right"; // 文本对齐方式
      // 绘制文本
      drawLabelText(
        ctx,
        `${info.category} ${Number(info.percent).toFixed(1)}%`,
        labelX,
        labelY,
        textAlign,
        colorMap.get(info.category)
      );
    }

    startAngle = endAngle; // 更新起始角度
  });
};

// 绘制标签文本
const drawLabelText = (ctx, text, x, y, align, color) => {
  ctx.save();
  ctx.setFontSize(CHART_STYLES.label.fontSize);
  ctx.setFillStyle(color);
  ctx.setTextAlign(align);
  ctx.setTextBaseline("middle");
  ctx.fillText(text, x, y);
  ctx.restore();
};
