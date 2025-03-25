<template>
	<view class="container">
		<canvas :class="canvasInfo.className" :canvas-id="canvasInfo.id"></canvas>
	</view>
</template>

<script setup>
import { onMounted,getCurrentInstance, computed } from 'vue';
import { indexChartInit } from '../../../utils/chart/line-chart.js';
import {chartInterval} from '../../../stores/chartinterval.js'
import { userInfoStore } from '../../../stores/userinfo';

	onMounted(()=>{
		const instance = getCurrentInstance()
		indexChartInit(instance,chartData.value,canvasInfo.className,canvasInfo.id)
	})
	const canvasInfo = {className:'.lineChart',id:'lineChart'}
	
	const {getPartData,getTotal} = userInfoStore()
	
	const chartData = computed(()=>{
		const partData = getPartData(chartInterval().status.lineChart)
		return partData.map(item =>({
			date:item.date,
			expense:getTotal(item.date).expense
		}))
	}) 
	
</script>

<style lang="scss" scoped>
	.container{
		width: 100%;
		height: 100%;
		.lineChart{
			width: 100%;
			height: 100%;
		}
	}
</style>