// 样式常量配置
export const CHART_STYLES = {
	grid: {
		color: '#00B6E6',
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
		fontSize: 10,
		color: '#5c5c5c'
	}
}

// 坐标轴边距配置
export const AXIS_MARGIN = {
	top: 10,
	bottom: 20,
	left: 40
}

/* 计算Y轴坐标 */
export const calculateY = (value, maxValue, area) => {
	const Yrange = area.bottom - area.top
	return area.top + Yrange * (1 - value / maxValue)
}

/* 绘制网格线 */
export const drawGridLines = (ctx, canvasWidth, area, chartData) => {
	const maxValue = Math.max(...chartData.map(item => item.amount)) // 获取最大值
	const minValue = Math.min(...chartData.map(item => item.amount)) // 获取最小值
	const medValue = (maxValue / 2).toFixed(1) // 计算中间值
	const aveValue = (chartData.reduce((pre, cur) => pre + cur.amount, 0) / chartData.length).toFixed(1) //平均值
	ctx.save() // 保存当前上下文状态

	if (maxValue >= 0) {
		ctx.beginPath()
		//绘制数据刻度
		drawText(ctx, medValue, AXIS_MARGIN.left / 2, area.center)
		drawText(ctx, maxValue, AXIS_MARGIN.left / 2, area.top)
		drawText(ctx, minValue, AXIS_MARGIN.left / 2, area.bottom)
		

		// 绘制平均值线
		ctx.strokeStyle = CHART_STYLES.grid.color
		ctx.lineWidth = CHART_STYLES.grid.lineWidth
		ctx.setLineDash(CHART_STYLES.grid.dash)
		ctx.moveTo(AXIS_MARGIN.left / 2, calculateY(aveValue,maxValue,area))
		ctx.lineTo(canvasWidth, calculateY(aveValue,maxValue,area))
		
		//绘制平均值文字
		const avePointY = calculateY(aveValue,maxValue,area)-10
		const avePointX= canvasWidth-30
		drawText(ctx,`平均 ${aveValue}`,avePointX,avePointY)
	}
	ctx.stroke()

	ctx.restore() // 恢复原始上下文状态
}

export const getPath = (canvasId, instance) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			uni.canvasToTempFilePath({
				canvasId: canvasId,
				success: (res) => {
					resolve(res.tempFilePath)
				},
				fail: (res) => {
					reject(res)
				}
			}, instance)
		}, 100)
	})
}

const drawText = (ctx, text, x, y) => {
	ctx.setFontSize(CHART_STYLES.label.fontSize);
	ctx.setTextAlign("center");
	ctx.setTextBaseline("middle")
	ctx.setFillStyle(CHART_STYLES.label.color);
	ctx.fillText(text, x, y)
}