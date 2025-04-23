import {
	getNodeInfo
} from "../node-info.js";
import {
	CHART_STYLES,
	AXIS_MARGIN,
	drawGridLines,
	calculateY,
} from "./chart.js";

export const indexChartInit = async (
	instance,
	chartData,
	className,
	canvasId
) => {
	try {
		// 获取画布尺寸
		const canvasNode = await getNodeInfo(instance, className);
		const {
			width: ctxW,
			height: ctxH
		} = canvasNode[0];
		// 创建绘图上下文
		const ctx = uni.createCanvasContext(canvasId, instance);

		// 计算绘图区域
		const drawArea = {
			top: AXIS_MARGIN.top,
			bottom: ctxH - AXIS_MARGIN.bottom,
			left: AXIS_MARGIN.left,
			get center() {
				return (this.top + this.bottom) / 2;
			},
		};

		// 绘制网格系统
		drawGridLines(ctx, ctxW, drawArea, chartData);

		// 绘制底部标签
		drawBottomLabels(ctx, ctxW, drawArea.bottom, chartData);

		// 绘制数据折线
		if (chartData.find((item) => item.amount>0)) {
			drawChartLine(ctx, chartData, ctxW, drawArea);
		}

		ctx.draw();
	} catch (error) {
		console.error("图表初始化失败:", error);
		// 可在这里添加错误处理逻辑
	}
};

/* 绘制底部日期标签 */
const drawBottomLabels = (ctx, canvasWidth, bottomY, data) => {
	const labelSpace = (canvasWidth - AXIS_MARGIN.left) / data.length; // 动态计算间距

	ctx.save();
	ctx.setFontSize(CHART_STYLES.label.fontSize);
	ctx.fillStyle = CHART_STYLES.label.color;
	if (data.length <= 12) { // 如果数据点少于12个，显示所有日期
		data.forEach((item, index) => {
			const dateStr = item.date.split("-").slice(-1); // 提取DD
			const xPos = index * labelSpace + AXIS_MARGIN.left;
			ctx.setTextAlign("center");
			ctx.fillText(dateStr, xPos, bottomY + 15); // 下移15px避免重叠
		});
	} else {
		data.forEach((item, index) => {
			if (index % 6 === 0) { // 每隔6个数据点显示一次日期
				const dateStr = item.date.split("-").slice(-1); // 提取DD
				const xPos = index * labelSpace + AXIS_MARGIN.left;
				ctx.setTextAlign("center");
				ctx.fillText(dateStr, xPos, bottomY + 15); // 下移15px避免重叠
			}
		});
	}

	ctx.restore();
};

//绘制折线图主体
const drawChartLine = (ctx, chartData, canvasWidth, area) => {
	const maxValue = Math.max(...chartData.map((item) => item.amount));
	const pointSpace = (canvasWidth - AXIS_MARGIN.left) / chartData.length;

	// 生成坐标点
	const points = chartData.map((item, index) => ({
		x: index * pointSpace + AXIS_MARGIN.left,
		y: calculateY(item.amount, maxValue, area),
		value: item.amount,
	}));

	ctx.save();
	ctx.beginPath();

	if (points.length > 0) {
		// ------绘制填充区域------
		// 移动到起始点
		ctx.moveTo(points[0].x, points[0].y);
		// 绘制曲线
		for (let i = 1; i < points.length; i++) {
			const curr = points[i];
			const prev = points[i - 1];

			// 计算控制点
			const m = 0.4; // 控制曲线的平滑度
			const cp1x = prev.x + (curr.x - prev.x) * m;
			const cp1y = prev.y;
			const cp2x = prev.x + (curr.x - prev.x) * (1 - m);
			const cp2y = curr.y;

			// 使用三次贝塞尔曲线
			ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, curr.x, curr.y);
		}

		// 闭合路径用于填充
		ctx.lineTo(points[points.length - 1].x, area.bottom); // 连接到右下角
		ctx.lineTo(points[0].x, area.bottom); // 连接到左下角
		ctx.closePath();

		// 设置填充样式并填充
		ctx.fillStyle = CHART_STYLES.line.fill;
		ctx.fill();

		// ------绘制曲线------
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

		// 设置线条样式并描边
		ctx.strokeStyle = CHART_STYLES.line.color;
		ctx.lineWidth = CHART_STYLES.line.lineWidth;
		ctx.stroke();
	}

	ctx.restore();
};