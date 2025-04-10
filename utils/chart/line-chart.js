import {
	examiner
} from "../examiner.js"
import {
	getNodeInfo
} from "../node-info.js"
import {
	CHART_STYLES,
	AXIS_MARGIN,
	drawGridLines,
	calculateY
} from "./chart.js"

export const indexChartInit = async (instance, chartData, className, canvasId) => {
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

		// 绘制网格系统
		drawGridLines(ctx, ctxW, drawArea)

		// 绘制底部标签
		drawBottomLabels(ctx, ctxW, drawArea.bottom, chartData)

		// 绘制数据折线
		if (examiner(chartData)) {
			drawChartLine(ctx, chartData, ctxW, drawArea)
		}

		ctx.draw()
	} catch (error) {
		console.error('图表初始化失败:', error)
		// 可在这里添加错误处理逻辑
	}
}

/* 绘制底部日期标签 */
const drawBottomLabels = (ctx, canvasWidth, bottomY, data) => {
	const labelSpace = canvasWidth / (data.length + 1) // 动态计算间距

	ctx.save()
	ctx.setFontSize(CHART_STYLES.label.fontSize)
	ctx.fillStyle = CHART_STYLES.label.color
	if (data.length <= 12) {
		data.forEach((item, index) => {
			const dateStr = item.date.split('-').slice(-1) // 提取DD
			const xPos = (index + 1) * labelSpace
			ctx.setTextAlign('center')
			ctx.fillText(dateStr, xPos, bottomY + 15) // 下移15px避免重叠
		})
	} else {
		data.forEach((item, index) => {
			if (index % 6 === 0) {
				const dateStr = item.date.split('-').slice(-1) // 提取DD
				const xPos = (index + 1) * labelSpace
				ctx.setTextAlign('center')
				ctx.fillText(dateStr, xPos, bottomY + 15) // 下移15px避免重叠
			}

		})
	}

	ctx.restore()
}

/* 绘制折线图主体 */
const drawChartLine = (ctx, data, canvasWidth, area) => {
	const maxValue = Math.max(...data.map(item => item.expense))
	const pointSpace = canvasWidth / (data.length + 1)

	// 生成坐标点
	const points = data.map((item, index) => ({
		x: (index + 1) * pointSpace,
		y: calculateY(item.expense, maxValue, area),
		value: item.expense
	}))

	// 绘制连接线
	ctx.save()
	ctx.beginPath()
	ctx.strokeStyle = CHART_STYLES.line.color
	ctx.lineWidth = CHART_STYLES.line.lineWidth
	ctx.setLineDash([]) // 确保使用实线

	points.forEach((point, index) => {
		index === 0 ? ctx.moveTo(point.x, point.y) : ctx.lineTo(point.x, point.y)
	})
	ctx.stroke()

	// 绘制数据点
	points.forEach(point => {
		ctx.beginPath()
		ctx.arc(point.x, point.y, CHART_STYLES.point.radius, 0, Math.PI * 2)
		ctx.fillStyle = CHART_STYLES.point.fill
		ctx.fill()
		if (CHART_STYLES.point.stroke) {
			ctx.stroke()
		}
	})

	ctx.restore()
}