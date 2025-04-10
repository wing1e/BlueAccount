<template>
	<view class="container">
		<canvas :canvas-id="canvasInfo.id" :class="canvasInfo.className"></canvas>
	</view>
</template>

<script setup>
import { computed, getCurrentInstance, onMounted, watch } from 'vue';
import { userInfoStore } from '../stores/userinfo';
import { panelinfoStore } from '../stores/panelinfo.js';
import { barChartInit } from '../utils/chart/bar-chart';
onMounted(() => {
	drawChart()
});
const { getTotal, getPartData } = userInfoStore();
const { panelList, getPanelInfo } = panelinfoStore();

const instance = getCurrentInstance();
const canvasInfo = { className: '.barChart', id: 'barChart' };

const chartData = computed(() => {
	const data = [];
	const chartYear = panelList[2].date;
	let monNum = 1;
	while (monNum <= 12) {
		const ym = chartYear + '-' + String(monNum).padStart(2, '0');
		data.push({ date: ym, expense: getTotal(ym).expense });
		monNum += 1;
	}
	return data;
});

const drawChart =()=>{
	barChartInit(instance, chartData.value, canvasInfo.className, canvasInfo.id);
}

watch(()=>panelinfoStore().panelList[2].date,(date)=>{
	drawChart()
})
</script>

<style lang="scss" scoped>
.container {
	width: 100%;
	height: 100%;
	.barChart {
		width: 100%;
		height: 100%;
	}
}
</style>
