// 样式常量配置
export const CHART_STYLES = {
	grid: {
		color: '#E3E3E5',
		lineWidth: 1,
		dash: [2, 4]
	},
	line: {
		color: 'rgba(0, 67, 164, 0.6)',
		lineWidth: 2,
		fill: 'rgba(0, 182, 230, 0.3)'
	},
	point: {
		radius: 3,
		fill: '#00B6E6',
		stroke: true
	},
	label: {
		fontSize: 12,
		color: '#5c5c5c'
	}
}

// 坐标轴边距配置
export const AXIS_MARGIN = {
	top: 10,
	bottom: 20,
	left:40
}

/* 计算Y轴坐标 */
export const calculateY = (value, maxValue, area) => {
	const Yrange = area.bottom - area.top
	return area.top + Yrange * (1 - value / maxValue)
}

/* 绘制网格线 */
export const drawGridLines = (ctx, canvasWidth, area,chartData) => {
	const maxValue = Math.max(...chartData.map(item => item.amount)) // 获取最大值
	const medValue = maxValue / 2 // 计算中间值
	ctx.save() // 保存当前上下文状态

	// 绘制底部实线
	ctx.beginPath()
	ctx.strokeStyle = CHART_STYLES.grid.color
	ctx.lineWidth = CHART_STYLES.grid.lineWidth
	ctx.moveTo(0, area.bottom)
	ctx.lineTo(canvasWidth, area.bottom)
	if(maxValue!==0){
		drawText(ctx,medValue,AXIS_MARGIN.left/2,area.center)
		drawText(ctx,maxValue,AXIS_MARGIN.left/2,area.top)
	}
	ctx.stroke()

	ctx.restore() // 恢复原始上下文状态
}

const drawText = (ctx,text,x,y) => {
	ctx.setFontSize(CHART_STYLES.label.fontSize);
	ctx.setTextAlign("center");
	ctx.setTextBaseline("middle")
	ctx.setFillStyle(CHART_STYLES.label.color);
	ctx.fillText(text,x,y)
}