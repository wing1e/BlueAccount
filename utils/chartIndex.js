import { getNodeInfo } from "./getnodeinfo"

// 初始化图表
export const init = (instance,chartData)=>{
	// 获取canvas的宽和高
	
	getNodeInfo(instance,'.barChart').then(res=>{
		const {width:ctxW,height:ctxH} = res[0]
		// 绘制图形
		const ctx = uni.createCanvasContext('barChart',instance)
		
		console.log(ctxH);
		const yMin= 50 //折线图上边缘
		const yMax = ctxH - 15 //折线图下边缘
		
		// 上实线
		ctx.beginPath()
		ctx.strokeStyle = '#E3E3E5'
		ctx.lineWidth = 1
		ctx.moveTo(0,yMin)
		ctx.lineTo(ctxW,yMin)
		
		// 下实线
		ctx.moveTo(0,yMax)
		ctx.lineTo(ctxW,yMax)
		ctx.stroke()
		
		// 中虚线
		ctx.beginPath()
		ctx.setLineDash([2,4]) //虚线样式 2px 的实线 3px 的空白
		ctx.strokeStyle = '#E3E3E5'
		ctx.lineWidth = 1
		ctx.moveTo(0,(yMax+yMin)/2)
		ctx.lineTo(ctxW,(yMax+yMin)/2)
		ctx.stroke()
		
		// 底部标题
		const space = ctxW/8 //标题间隔大小
		// 生成日期配置
		const data = [...new Set(chartData.map(item =>item.date.split(/[-]/)[1]+'-'+item.date.split(/[-]/)[2]))]
		const weekStrings = data.map((date,i) => {
			const textAlign = 'center'
			return {
				date,
				textAlign,
				x:(i+1)*space
			}
		})
		ctx.setFontSize(10)
		
		// 循环绘制日期标签
		weekStrings.forEach(({date,textAlign,x}) => {
			ctx.setTextAlign(textAlign)
			ctx.fillText(date, x, ctxH, space);
		})
		
		// 绘制坐标点
		const maxY = Math.max(...chartData.map(item => item.expense)) //支出的最大值
		const points = chartData.map((item,i) =>{
			return {
				x:(i+1)*space,
				y:((yMax-yMin)*(1-item.expense/maxY)+yMin).toFixed(1),
				expense:item.expense
			}
		})
		
		ctx.beginPath();
		ctx.lineWidth = 0.5
		ctx.moveTo(points[0].x, points[0].y);
		points.forEach(point => ctx.lineTo(point.x, point.y));
		ctx.strokeStyle = '#000000'
		ctx.setLineDash([1,0])
		ctx.stroke();
		
		points.forEach(point => {
		  ctx.beginPath();
		  ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
		  ctx.fillStyle = '#0039A4'
		  ctx.fill()
		  ctx.lineWidth = 0.5
		  ctx.stroke();
		});
		
		// 绘制
		ctx.draw();
	})
}