<template>
	<view class="container">
		<canvas :canvas-id="canvasInfo.id" :class="canvasInfo.className"></canvas>
	</view>
</template>

<script setup>
import { getCurrentInstance, onMounted,computed } from 'vue';
import { pieCharInit } from '../../../utils/chart/pie-chart';
import { userInfoStore } from '../../../stores/userinfo';
import { getWeek } from '../../../utils/get-date';
onMounted(()=>{
	const instance = getCurrentInstance()
	pieCharInit(instance,chartData.value,canvasInfo.className,canvasInfo.id)
})

const canvasInfo = {className:'.pieChart',id:'pieChart'}
const {getCategoryPercentages} = userInfoStore()

const pickDate = '2023-03'
const chartData = computed (()=>{
	return getCategoryPercentages(pickDate)	
})
console.log(chartData.value);
	
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