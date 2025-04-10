<template>
	<view class="container">
		<canvas :canvas-id="canvasInfo.id" :class="canvasInfo.className"></canvas>
	</view>
</template>

<script setup>
import { getCurrentInstance, onMounted,computed, watch } from 'vue';
import { pieCharInit } from '../utils/chart/pie-chart';
import { userInfoStore } from '../stores/userinfo';
import { getWeek } from '../utils/get-date';
import { panelinfoStore } from '../stores/panelinfo';
onMounted(()=>{
	drawChart()
})
const instance = getCurrentInstance()
const canvasInfo = {className:'.pieChart',id:'pieChart'}
const {getCategoryInfo} = userInfoStore()
const {panelList,getPanelInfo} = panelinfoStore()

const chartData = computed (()=>{
	const pickDate = panelList[0].date
	return getCategoryInfo(pickDate)	
})

const drawChart = ()=>{
	pieCharInit(instance,chartData.value,canvasInfo.className,canvasInfo.id)
}

watch(()=>panelinfoStore().panelList[0].date,()=>{
	console.log('change');
	drawChart()
})
	
</script>

<style lang="scss" scoped>
	.container{
		width: 100%;
		height: 100%;
		.pieChart{
			width: 100%;
			height: 100%;
		}
	}
</style>