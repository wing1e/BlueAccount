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

		const {
			width: ctxW,
			height: ctxH
		} = canvasNode[0]

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
	const labelSpace = canvasWidth / 25 // 间距

	ctx.save()
	ctx.setFontSize(CHART_STYLES.label.fontSize)
	ctx.fillStyle = CHART_STYLES.label.color
	data.forEach((item, index) => {
		const dateStr = item.date.split('-')[1] // 提取MM
		const xPos = (2 * index + 1) * labelSpace
		ctx.setTextAlign('center')
		ctx.fillText(dateStr, xPos, bottomY + 15) // 下移15px避免重叠
	})

	ctx.restore()
}

const drawBar = (ctx, ctxW, chartData, drawArea) => {
	const BarSpace = ctxW / 25;

	const MaxValue = Math.max(...chartData.map(item => item.amount))

	const points = chartData.map((item, index) => ({
		x: (2 * index + 1) * BarSpace,
		y: calculateY(item.amount, MaxValue, drawArea),
		value: item.amount
	}))

	points.forEach(item => {
		ctx.fillRect(item.x, item.y, BarSpace, drawArea.bottom - item.y)
		ctx.setFillStyle('#de6ea6')
	})
}