<template>
	<view class="chart">
		
	</view>
</template>

<script setup>
	import * as charts from 'echarts'
import { onMounted } from 'vue'
	onMounted(()=>{
		initChart()
	})
	
	const initChart = ()=>{
		const chartContainer = document.getElementById("chartContainer")
		this.charts = echarts.init(chartContainer)
	}
</script>

<style>
</style>