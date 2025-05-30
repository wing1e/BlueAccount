<template>
	<view class="container">
		<canvas :canvas-id="canvasInfo.id" :class="canvasInfo.className" :style="{ left: flag ? '120%' : '0' }" ></canvas>
		<image :src="imgUrl" :style="{ opacity: imgOpt }" class="content"></image>
	</view>
</template>

<script setup>
import { getCurrentInstance, computed, watch, ref, nextTick, onMounted } from 'vue';
import { lineChartInit } from '../utils/chart/line-chart.js';
import { panelinfoStore } from '../stores/panelinfo.js';
import { userInfoStore } from '../stores/userinfo';
import { tabBarStore } from '../stores/tabbar.js';
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

const instance = getCurrentInstance();
const userstore = userInfoStore();
const panelstore = panelinfoStore();
const tabStore = tabBarStore();

const canvasInfo = { className: '.lineChart', id: 'lineChart' };
const flag = ref(false);
const imgUrl = ref();
const pupSign = computed(() => tabStore.pupSign);
const imgOpt = ref(0);

const chartData = computed(() => {
	const typeVal = panelstore.panelList[1].type === 0 ? 'expense' : 'income';
	const partData = userstore.getPartData(panelstore.panelList[1].date);
	const result = partData.map((item) => ({
		date: item.date,
		amount: userstore.getTotal(item.date)[typeVal]
	}));
	return result
});
let timer = null;
const drawChart = async (data) => {
	if (timer !== null) {
		 clearTimeout(timer);
	}
	try {
		const res = await lineChartInit(instance, data, canvasInfo.className, canvasInfo.id);
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
		[chartData, pupSign],
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
	.lineChart {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
	}
}
</style>