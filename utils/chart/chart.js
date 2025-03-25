// 样式常量配置
export const CHART_STYLES = {
	grid: {
		color: '#E3E3E5',
		lineWidth: 1,
		dash: [2, 4]
	},
	line: {
		color: '#de6ea6',
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
export const AXIS_MARGIN = {
	top: 10,
	bottom: 20
}

/* 计算Y轴坐标 */
export const calculateY = (value, maxValue, area) => {
	const Yrange = area.bottom - area.top
	return area.top + Yrange * (1 - value / maxValue)
}


/* 绘制网格线 */
export const drawGridLines = (ctx, canvasWidth, area) => {
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

