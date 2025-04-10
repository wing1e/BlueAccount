<template>
	<view class="container">
		<canvas :class="canvasInfo.className" :canvas-id="canvasInfo.id"></canvas>
	</view>
</template>

<script setup>
import { onMounted,getCurrentInstance, computed, watch } from 'vue';
import { indexChartInit } from '../utils/chart/line-chart.js';
import {panelinfoStore} from '../stores/panelinfo.js'
import { userInfoStore } from '../stores/userinfo';

	onMounted(()=>{
		drawChart()
		
	})
	
	const instance = getCurrentInstance()
	const canvasInfo = {className:'.lineChart',id:'lineChart'}
	
	const {getPartData,getTotal} = userInfoStore()
	const {panelList} = panelinfoStore()
	
	const chartData = computed(()=>{ 
		const partData = getPartData(panelList[1].date)
		return partData.map(item =>({
			date:item.date,
			expense:getTotal(item.date).expense
		}))
	}) 
	const drawChart = ()=>{
		indexChartInit(instance,chartData.value,canvasInfo.className,canvasInfo.id)
	}
	
	watch(()=>panelinfoStore().panelList[1].date,()=>{
		drawChart()
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