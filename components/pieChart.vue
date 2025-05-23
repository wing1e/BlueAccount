<template>
	<view class="container">
		<canvas :canvas-id="canvasInfo.id" :class="canvasInfo.className" v-show="!flag"></canvas>
		<image :src="imgUrl" v-if="imgUrl && flag" style="width: 100%; height: 100%"></image>
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
	drawChart(chartData.value);
});
const instance = getCurrentInstance();
const userstore = userInfoStore();
const panelinfo = panelinfoStore();
const tabStore = tabBarStore();

const canvasInfo = { className: '.pieChart', id: 'pieChart' };
const imgUrl = ref();

const pupSign = computed(() => tabStore.getPupSign);

const flag = ref(false); //是否显示图片/隐藏canvas
const chartData = computed(() => {
	const typeVal = panelinfo.panelList[0].type === 0 ? 'expense' : 'income';
	const pickDate = panelinfo.panelList[0].date;
	return userstore.getCategoryInfo(pickDate)[typeVal];
});

const drawChart = async (data) => {
	try {
		const res = await pieCharInit(instance, data, canvasInfo.className, canvasInfo.id);
		//当拿到图片地址，并且弹窗信号为true时，才更新图片
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
			await pieCharInit(instance, data, canvasInfo.className, canvasInfo.id);
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
const cancelWatch =()=>{
	watcher()
}
</script>

<style lang="scss" scoped>
.container {
	width: 100%;
	height: 100%;
	position: relative;

	.pieChart {
		width: 100%;
		height: 100%;
		position: absolute;
	}
}
</style>
