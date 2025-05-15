<template>
	<view class="container">
		<canvas :canvas-id="canvasInfo.id" :class="canvasInfo.className" v-show="!flag"></canvas>
		<image :src="imgUrl" v-if="imgUrl && flag" style="width: 100%; height: 100%"></image>
	</view>
</template>

<script setup>
import { computed, getCurrentInstance, nextTick, onMounted, watch, ref } from 'vue';
import { userInfoStore } from '../stores/userinfo';
import { panelinfoStore } from '../stores/panelinfo.js';
import { barChartInit } from '../utils/chart/bar-chart';
import { tabBarStore } from '../stores/tabbar';
onMounted(() => {
	initWatchers();
	drawChart(chartData.value);
});

const userstore = userInfoStore();
const panelinfo = panelinfoStore();
const tabStore = tabBarStore();
const instance = getCurrentInstance();

const canvasInfo = { className: '.barChart', id: 'barChart' };
const imgUrl = ref();
const pupSign = computed(() => tabStore.getPupSign);
const flag = ref(false);

const chartData = computed(() => {
	const data = [];
	const { date: year, type } = panelinfo.panelList[2];
	let monNum = 1;
	while (monNum <= 12) {
		const ym = year + '-' + String(monNum).padStart(2, '0');
		data.push({
			date: ym,
			amount: type === 0 ? userstore.getTotal(ym).expense : userstore.getTotal(ym).income
		});
		monNum += 1;
	}
	return data;
});

const drawChart = async (data) => {
	try {
		const res = await barChartInit(instance, data, canvasInfo.className, canvasInfo.id);
		//当拿到图片地址，并且弹窗打开时，才更新图片
		if (res && pupSign.value) {
			imgUrl.value = ''; // 先清空旧值
			await nextTick();
			imgUrl.value = res; // 再设置新值
			flag.value = true; // 显示图片
		} else {
			//其他情况，正常更新并显示canvas
			flag.value = false; // 隐藏图片
			imgUrl.value = ''; // 清空图片地址
			await nextTick();
			await barChartInit(instance, data, canvasInfo.className, canvasInfo.id);
		}
	} catch (err) {
		console.log(err);
	}
};

let watcher = null;
const initWatchers = () => {
	watcher = watch(
		[chartData, () => tabStore.pupSign],
		([newData, newPup], [data, pup]) => {
			drawChart(newData);
		},
		{ deep: true }
	);
};
</script>

<style lang="scss" scoped>
.container {
	width: 100%;
	height: 100%;
	position: relative;
	.barChart {
		width: 100%;
		height: 100%;
		position: absolute;
	}
}
</style>
