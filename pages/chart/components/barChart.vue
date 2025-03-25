<template>
	<view class="container">
		<canvas :canvas-id="canvasInfo.id" :class="canvasInfo.className"></canvas>
	</view>
</template>

<script setup>
import { computed, getCurrentInstance, onMounted } from 'vue';
import { userInfoStore } from '../../../stores/userinfo';
import { chartInterval } from '../../../stores/chartinterval';
import { barChartInit } from '../../../utils/chart/bar-chart';
onMounted(()=>{
	const instance = getCurrentInstance()
	barChartInit(instance,chartData.value,canvasInfo.className,canvasInfo.id)
})
	const {getTotal,getPartData} = userInfoStore()
	const chartYear = chartInterval().status.barChart
	const canvasInfo = {className:'.barChart',id:'barChart'}
	const chartData = computed(()=>{
		const data = []
		let monNum = 1
		 while (monNum<=12){
			const ym = chartYear+'-'+String(monNum).padStart(2,'0')
			data.push({date:ym,expense:getTotal(ym).expense})
			monNum+=1
		}
		return data
	})
	
	
</script>

<style lang="scss" scoped>
	.container{
		width: 100%;
		height: 100%;
		.barChart{
			width: 100%;
			height: 100%;
		}
	}
</style>