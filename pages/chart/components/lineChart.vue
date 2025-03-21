<template>
	<view class="container">
		<canvas :class="canvasInfo.className" :canvas-id="canvasInfo.id"></canvas>
	</view>
</template>

<script setup>
import { onMounted,getCurrentInstance } from 'vue';
import { indexChartInit } from '../../../utils/chart/index-chart';
import {chartInterval} from '../../../stores/chartinterval.js'

	onMounted(()=>{
		const instance = getCurrentInstance()
		// indexChartInit(instance,chartData.value,canvasInfo.className,canvasInfo.id)
	})
	const canvasInfo = {className:'.lineChart',id:'lineChart'}
	
	const chartData = chartInterval().status.lineCart
</script>

<style lang="scss" scoped>
</style>