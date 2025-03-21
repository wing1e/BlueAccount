import { examiner } from "../examiner.js"
import {
	getNodeInfo
} from "../node-info.js"

// 样式常量配置
const CHART_STYLES = {
	grid: {
		color: '#E3E3E5',
		lineWidth: 1,
		dash: [2, 4]
	},
	line: {
		color: '#909090',
		lineWidth: 0.5
	},
	point: {
		radius: 3,
		fill: '#00B6E6',
		stroke: true
	},
	label: {
		fontSize: 10,
		color: '#000'
	}
}

// 坐标轴边距配置
const AXIS_MARGIN = {
	top: 100,
	bottom: 20
}

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
		const drawingArea = {
			top: AXIS_MARGIN.top,
			bottom: ctxH - AXIS_MARGIN.bottom,
			get center() {
				return (this.top + this.bottom) / 2
			}
		}
		
		// 绘制网格系统
		drawGridLines(ctx, ctxW, drawingArea)

		// 绘制底部标签
		drawBottomLabels(ctx, ctxW, drawingArea.bottom, chartData)

		// 绘制数据折线
		if(examiner(chartData)){
			drawChartLine(ctx, chartData, ctxW, drawingArea)
		}
		

		// 提交绘制
		ctx.draw()
	} catch (error) {
		console.error('图表初始化失败:', error)
		// 可在这里添加错误处理逻辑
	}
}

/* 绘制网格线 */
function drawGridLines(ctx, canvasWidth, area) {
	ctx.save() // 保存当前上下文状态

	// 绘制底部实线
	ctx.beginPath()
	ctx.strokeStyle = CHART_STYLES.grid.color
	ctx.lineWidth = CHART_STYLES.grid.lineWidth

	ctx.moveTo(0, area.bottom)
	ctx.lineTo(canvasWidth, area.bottom)
	ctx.stroke()

	// 绘制中间虚线
	ctx.beginPath()
	ctx.setLineDash(CHART_STYLES.grid.dash)
	ctx.moveTo(0, area.center)
	ctx.lineTo(canvasWidth, area.center)
	ctx.stroke()

	ctx.restore() // 恢复原始上下文状态
}

/* 绘制底部日期标签 */
function drawBottomLabels(ctx, canvasWidth, bottomY, data) {
	const labelSpace = canvasWidth / (data.length + 1) // 动态计算间距
	
	ctx.save()
	ctx.setFontSize(CHART_STYLES.label.fontSize)
	ctx.fillStyle = CHART_STYLES.label.color

	data.forEach((item, index) => {
		const dateStr = item.date.split('-').slice(1).join('-') // 提取MM-DD
		const xPos = (index + 1) * labelSpace
		ctx.setTextAlign('center')
		ctx.fillText(dateStr, xPos, bottomY + 15) // 下移15px避免重叠
	})

	ctx.restore()
}

/* 绘制折线图主体 */
function drawChartLine(ctx, data, canvasWidth, area) {
	const maxValue = Math.max(...data.map(item => item.expense))
	const pointSpace = canvasWidth / (data.length + 1)

	// 生成坐标点
	const points = data.map((item, index) => ({
		x: (index + 1) * pointSpace,
		y: calculateYPosition(item.expense, maxValue, area),
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

/* 计算Y轴坐标 */
function calculateYPosition(value, maxValue, area) {
	const verticalRange = area.bottom - area.top
	return area.top + verticalRange * (1 - value / maxValue)
}