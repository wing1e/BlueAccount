<template>
	<view class="container">
		<canvas :canvas-id="canvasInfo.id" :class="canvasInfo.className" :style="{ left: flag ? '120%' : '0' }"></canvas>
		<image :src="imgUrl" :style="{ opacity: imgOpt }" class="content"></image>
	</view>
</template>

<script setup>
import { getCurrentInstance, computed, watch, ref, nextTick, onMounted } from 'vue';
import { pieCharInit } from '../utils/chart/pie-chart';
import { userInfoStore } from '../stores/userinfo';
import { panelinfoStore } from '../stores/panelinfo';
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
const instance = getCurrentInstance();
const userstore = userInfoStore();
const panelinfo = panelinfoStore();
const tabStore = tabBarStore();

const canvasInfo = { className: '.pieChart', id: 'pieChart' };
const imgUrl = ref();
const imgOpt = ref(0);

const pupSign = computed(() => tabStore.getPupSign);

const flag = ref(false); //是否显示图片/隐藏canvas
const chartData = computed(() => {
	const typeVal = panelinfo.panelList[0].type === 0 ? 'expense' : 'income';
	const pickDate = panelinfo.panelList[0].date;
	return userstore.getCategoryInfo(pickDate)[typeVal];
});
let timer = null;
const drawChart = async (data) => {
	if (timer !== null) {
		 clearTimeout(timer);
	}
	try {
		const res = await pieCharInit(instance, data, canvasInfo.className, canvasInfo.id);
		//当拿到图片地址，并且弹窗信号为true时，才更新图片
		if (res && pupSign.value) {
			imgUrl.value = res; // 设置新值
			imgOpt.value = 1;
			timer = setTimeout(() => {
				flag.value = true;
			}, 50);
		} else {
			//其他情况，正常更新并显示canvas
			await pieCharInit(instance, data, canvasInfo.className, canvasInfo.id);
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
const cancelWatch = () => {
	watcher();
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
	.pieChart {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
	}
}
</style>
