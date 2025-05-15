<template>
	<view class="container">
		<canvas :canvas-id="canvasInfo.id" :class="canvasInfo.className" v-show="!flag"></canvas>
		<image :src="imgUrl" v-if="imgUrl && flag" style="width: 100%; height: 100%"></image>
	</view>
</template>

<script setup>
import { getCurrentInstance, computed, watch, ref, nextTick ,onMounted} from 'vue';
import { lineChartInit } from '../utils/chart/line-chart.js';
import { panelinfoStore } from '../stores/panelinfo.js';
import { userInfoStore } from '../stores/userinfo';
import { tabBarStore } from '../stores/tabbar.js';
onMounted(() => {
	initWatchers();
	drawChart(chartData.value);
});

const instance = getCurrentInstance();
const userstore = userInfoStore();
const panelstore = panelinfoStore();
const tabStore = tabBarStore();

const canvasInfo = { className: '.lineChart', id: 'lineChart' };
const flag = ref(false);
const imgUrl = ref();
const pupSign = computed(() => tabStore.getPupSign);

const chartData = computed(() => {
	const typeVal = panelstore.panelList[1].type === 0 ? 'expense' : 'income';
	const partData = userstore.getPartData(panelstore.panelList[1].date);
	return partData.map((item) => ({
		date: item.date,
		amount: userstore.getTotal(item.date)[typeVal]
	}));
});
const drawChart = async (data) => {
	try {
		const res = await lineChartInit(instance, data, canvasInfo.className, canvasInfo.id);
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
			await lineChartInit(instance, data, canvasInfo.className, canvasInfo.id);
		}
	} catch (err) {
		console.log(err);
	}
};

let watcher = null;
const initWatchers = () => {
	watcher = watch(
		[ chartData, () => tabStore.pupSign],
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
	.lineChart {
		width: 100%;
		height: 100%;
		position: absolute;
	}
}
</style>
