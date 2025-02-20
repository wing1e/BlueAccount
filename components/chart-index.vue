<template>
	<view class="chart">
		<canvas canvas-id="barChart" class="barChart"></canvas>
	</view>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from 'vue';
onMounted(()=>{
	init()
})
const init = ()=>{
	const instance = getCurrentInstance()
	const chartWhith = ref()
	const chartHeight = ref()
	// 获取canvas的宽和高
	const query = uni.createSelectorQuery().in(instance)
	query.select('.barChart')
	.boundingClientRect((data)=>{
		// canvas的高 data.height 宽 data.width
		if(data){
			console.log(data.height,data.width);
			const ctxW = data.width
			const ctxH = data.height
			// 绘制图形
			const ctx = uni.createCanvasContext('barChart',instance)
			// 上虚线
			ctx.beginPath()
			ctx.setLineDash([2,4]) //虚线样式 2px 的实线 3px 的空白
			ctx.strokeStyle = '#E3E3E5'
			ctx.lineWidth = 1
			ctx.moveTo(0,20)
			ctx.lineTo(ctxW,20)
			// 下虚线
			ctx.moveTo(0,ctxH-50)
			ctx.lineTo(ctxW,ctxH-50)
			ctx.stroke()
			// 中实线
			ctx.beginPath()
			ctx.setLineDash([1,0]) 
			ctx.strokeStyle = '#E3E3E5'
			ctx.lineWidth = 1
			ctx.moveTo(0,(ctxH-50)/2+10)
			ctx.lineTo(ctxW,(ctxH-50)/2+10)
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
</script>

<style lang="scss">
	.chart{
		width: 100%;
		height: 100%;
		background-color: #fff;
		box-shadow: 0rpx 6rpx 28rpx 0rpx rgba(0, 0, 0, 0.1);
		border-radius: 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		.barChart{
			width: 95%;
			height: 90%;
		}
	}
</style>