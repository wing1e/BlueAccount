<template>
	<view class="container">
		<canvas :canvas-id="canvasInfo.id" :class="canvasInfo.className"></canvas>
	</view>
</template>

<script setup>
import { onShow } from '@dcloudio/uni-app';
import { computed, getCurrentInstance, onMounted, watch } from 'vue';
import { userInfoStore } from '../stores/userinfo';
import { panelinfoStore } from '../stores/panelinfo.js';
import { barChartInit } from '../utils/chart/bar-chart';
onMounted(() => {
	drawChart();
});

onShow(() => {
	drawChart();
});
const { getTotal, getPartData } = userInfoStore();
const panelinfo = panelinfoStore();

const instance = getCurrentInstance();
const canvasInfo = { className: '.barChart', id: 'barChart' };

const chartData = computed(() => {
	const data = [];
	const {date:year,type} = panelinfo.panelList[2]
	let monNum = 1;
	while (monNum <= 12) {
		const ym = year + '-' + String(monNum).padStart(2, '0');
		data.push({ date: ym, amount:type===0?getTotal(ym).expense:getTotal(ym).income });
		monNum += 1;
	}
	return data;
});

const drawChart = () => {
	barChartInit(instance, chartData.value, canvasInfo.className, canvasInfo.id);
};

watch(
	() => panelinfoStore().panelList[2].date,
	(date) => {
		drawChart();
	}
);
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
