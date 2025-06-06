import {
	getNodeInfo
} from '../node-info'
import {
	CHART_STYLES,
	AXIS_MARGIN,
	drawGridLines,
	calculateY,
	getPath
} from "./chart.js"

export const barChartInit = async (instance, chartData, className, canvasId) => {
	try {
		// 获取画布尺寸
		const canvasNode = await getNodeInfo(instance, className)

		let {
			width: ctxW,
			height: ctxH
		} = canvasNode[0]
		ctxH = Math.round(ctxH)
		ctxW = Math.round(ctxW)
		// 创建绘图上下文
		const ctx = uni.createCanvasContext(canvasId, instance)

		// 计算绘图区域
		const drawArea = {
			top: AXIS_MARGIN.top,
			bottom: ctxH - AXIS_MARGIN.bottom,
			get center() {
				return (this.top + this.bottom) / 2
			}
		}

		// 绘制底部标签
		drawBottomLabels(ctx, ctxW, drawArea.bottom, chartData)
		ctx.save()
		ctx.moveTo(AXIS_MARGIN.left, ctxH - AXIS_MARGIN.bottom)
		ctx.lineTo(ctxW, ctxH - AXIS_MARGIN.bottom)
		ctx.strokeStyle = CHART_STYLES.line.color;
		ctx.lineWidth = CHART_STYLES.line.lineWidth;
		ctx.stroke()

		if (chartData.find((item) => item.amount > 0)) {
			//绘制柱状图
			drawBar(ctx, ctxW, chartData, drawArea)
			// 绘制网格系统
			drawGridLines(ctx, ctxW, drawArea, chartData)

		}

		ctx.draw(false)
		return await getPath(canvasId, instance)

	} catch (err) {
		console.log(err);
		throw new Error(err)
	}
}

/* 绘制底部日期标签 */
const drawBottomLabels = (ctx, canvasWidth, bottomY, data) => {
	const labelSpace = (canvasWidth - AXIS_MARGIN.left) / 25 // 间距

	ctx.save()
	ctx.setFontSize(CHART_STYLES.label.fontSize)
	ctx.fillStyle = CHART_STYLES.label.color
	data.forEach((item, index) => {
		const dateStr = item.date.split('-')[1] // 提取MM
		const xPos = (2 * index) * labelSpace + AXIS_MARGIN.left
		ctx.setTextAlign('left')
		ctx.fillText(dateStr, xPos, bottomY + 15) // 下移15px避免重叠
	})

	ctx.restore()
}
// 绘制柱状图
const drawBar = (ctx, ctxW, chartData, drawArea) => {
	const BarSpace = (ctxW - AXIS_MARGIN.left) / 25;

	const MaxValue = Math.max(...chartData.map(item => item.amount))

	const points = chartData.map((item, index) => ({
		x: (2 * index) * BarSpace + AXIS_MARGIN.left,
		y: calculateY(item.amount, MaxValue, drawArea),
		value: item.amount
	}))

	points.forEach(item => {
		ctx.fillRect(item.x, item.y, BarSpace, drawArea.bottom - item.y)
		ctx.setFillStyle('#de6ea6')
	})
}