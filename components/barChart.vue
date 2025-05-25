<template>
	<view class="container">
		<canvas :canvas-id="canvasInfo.id" :class="canvasInfo.className" :style="{ left: flag ? '120%' : '0' }"></canvas>
		<image :src="imgUrl" :style="{ opacity: imgOpt }" class="content"></image>
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
});
const props = defineProps(['isShow']);
watch(
	() => props.isShow,
	(n) => {
		if (n) {
			initWatchers();
			return
		}
		watcher();
		clearTimeout(timer)
	}
);
const userstore = userInfoStore();
const panelinfo = panelinfoStore();
const tabStore = tabBarStore();
const instance = getCurrentInstance();

const canvasInfo = { className: '.barChart', id: 'barChart' };
const imgUrl = ref();
const pupSign = computed(() => tabStore.pupSign);
const flag = ref(false);
const imgOpt = ref(0);

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

let timer = null;
const drawChart = async (data) => {
	if (timer !== null){
		 clearTimeout(timer);
	}
	try {
		const res = await barChartInit(instance, data, canvasInfo.className, canvasInfo.id);
		//当拿到图片地址，并且弹窗打开时，才更新图片
		if (res && pupSign.value) {
			imgUrl.value = res; // 设置新值
			imgOpt.value = 1;
			timer = setTimeout(() => {
				flag.value = true;
			}, 50);
		} else {
			//其他情况，正常更新并显示canvas
			flag.value = false;
			imgOpt.value = 0;
		}
	} catch (err) {
		console.log(err);
	}
};

let watcher = null;
const initWatchers = () => {
	if(watcher){
		watcher()
	}
	watcher = watch(
		[chartData, () => tabStore.pupSign],
		([newData, newPup], [data, pup]) => {
			drawChart(newData);
		},
		{ deep: true, immediate: true }
	);
};
</script>

<style lang="scss" scoped>
.container {
	width: 100%;
	height: 100%;
	position: relative;
	.content {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transition: all 0.1s linear;
	}
	.barChart {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
	}
}
</style>
