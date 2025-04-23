<template>
	<view class="container">
		<canvas :class="canvasInfo.className" :canvas-id="canvasInfo.id"></canvas>
	</view>
</template>

<script setup>
import { onShow } from '@dcloudio/uni-app';
import { onMounted, getCurrentInstance, computed, watch } from 'vue';
import { indexChartInit } from '../utils/chart/line-chart.js';
import { panelinfoStore } from '../stores/panelinfo.js';
import { userInfoStore } from '../stores/userinfo';

onMounted(() => {
	drawChart();
});
onShow(() => {
	drawChart();
});

const instance = getCurrentInstance();
const canvasInfo = { className: '.lineChart', id: 'lineChart' };

const { getPartData, getTotal } = userInfoStore();
const { panelList } = panelinfoStore();

const chartData = computed(() => {
	const typeVal = panelinfoStore().panelList[1].type===0?'expense':'income';
	const partData = getPartData(panelList[1].date);
	return partData.map((item) => ({
		date: item.date,
		amount: getTotal(item.date)[typeVal]
	}));
});
console.log(chartData.value);
const drawChart = () => {
	indexChartInit(instance, chartData.value, canvasInfo.className, canvasInfo.id);
};

watch(
	() => panelinfoStore().panelList[1],
	() => {
		drawChart();
	},{deep:true}
);
</script>

<style lang="scss" scoped>
.container {
	width: 100%;
	height: 100%;
	.lineChart {
		width: 100%;
		height: 100%;
	}
}
</style>
