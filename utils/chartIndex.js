
// 绘制图表
export const init = (instance)=>{
	// 获取canvas的宽和高
	const query = uni.createSelectorQuery().in(instance)
	query.select('.barChart')
	.boundingClientRect((data)=>{
		if(data){
			const ctxW = data.width //canvas的宽
			const ctxH = data.height //canvas的高
			// 绘制图形
			const ctx = uni.createCanvasContext('barChart',instance)
			// 上实线
			ctx.beginPath()
			ctx.strokeStyle = '#E3E3E5'
			ctx.lineWidth = 1
			ctx.moveTo(0,30)
			ctx.lineTo(ctxW,30)
			// 下实线
			ctx.moveTo(0,ctxH-50)
			ctx.lineTo(ctxW,ctxH-50)
			ctx.stroke()
			// 中虚线
			ctx.beginPath()
			ctx.setLineDash([2,4]) //虚线样式 2px 的实线 3px 的空白
			ctx.strokeStyle = '#E3E3E5'
			ctx.lineWidth = 1
			ctx.moveTo(0,(ctxH-50)/2+15)
			ctx.lineTo(ctxW,(ctxH-50)/2+15)
			ctx.stroke()
			// 底部标题
			const space = ctxW/6 //标题间隔大小
			// 日期，对齐方式，坐标
			const weekStrings = [
				{date:'00-00',textAlign:'left',x:0},
				{date:'00-00',textAlign:'center',x:space},
				{date:'00-00',textAlign:'center',x:2*space},
				{date:'00-00',textAlign:'center',x:3*space},
				{date:'00-00',textAlign:'center',x:4*space},
				{date:'00-00',textAlign:'center',x:5*space},
				{date:'00-00',textAlign:'right',x:ctxW},
			]
			ctx.setFontSize(8)
			// 循环生成一周的日期
			for (let i = 0; i <7; i++) {
				const {date,textAlign,x} = weekStrings[i]
				ctx.setTextAlign(textAlign)
				ctx.fillText(date,x,ctxH-10)
			}
			
			// 绘制
			ctx.draw();
		}
	})
	.exec()
}