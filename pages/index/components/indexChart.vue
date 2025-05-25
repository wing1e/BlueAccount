<template>
	<view class="chart">
		<view class="title">
			<text style="font-size: 24rpx; color: #909090; font-weight: 600">{{ '最近支出' }}</text>
			<text style="font-size: 46rpx; letter-spacing: 1rpx; color: #de6ea6; margin-left: 20rpx">{{ '-' + total }}</text>
			<text style="font-size: 20rpx; color: #00b6e6">{{ '平均值：' + (total / 7).toFixed(2) }}</text>
		</view>
		<view style="position: absolute; right: 20rpx; top: 20rpx" @click="toAnalysis">
			<RightButton></RightButton>
		</view>
		<!-- 首页折线图 -->
		<view class="chart-shift">
			<canvas :canvas-id="canvasInfo.id" :class="canvasInfo.className" :style="{ left: flag ? '120%' : '0' }"></canvas>
			<image :src="imgUrl" :style="{ opacity: imgOpt }" class="content"></image>
		</view>
	</view>
</template>

<script setup>
import { computed, getCurrentInstance, nextTick, onMounted, ref, watch } from 'vue';
import RightButton from '../../../components/RightButton.vue';
import { lineChartInit } from '../../../utils/chart/line-chart.js';
import { userInfoStore } from '../../../stores/userinfo.js';
import { getNowDate } from '../../../utils/get-date.js';
import { tabBarStore } from '../../../stores/tabbar';
import router from '../../../utils/router';

const props = defineProps(['isShow']);
watch(
	() => props.isShow,
	(n) => {
		if (n) {
			//页面展示时添加监听
			createWatch();
		} else {
			//页面隐藏时取消监听
			watcher();
			clearTimeout(timer)
		}
	}
);
const instance = getCurrentInstance();
const store = userInfoStore();
const tabStore = tabBarStore();

const canvasInfo = { className: '.indexChart', id: 'indexChart' };
const imgUrl = ref();
const flag = ref(false);
const pupSign = computed(() => tabStore.pupSign);
const imgOpt = ref(0);

// 截取最后七天数据
const chartData = computed(() => {
	const diff = 7; //七天数据
	const nowIndex = store.getDataList.findIndex((item) => item.date === getNowDate().date);

	return store.getDataList.slice(nowIndex + 1 - diff, nowIndex + 1).map((item) => ({
		date: item.date,
		amount: store.getTotal(item.date).expense
	}));
});
//七天总支出
const total = computed(() => chartData.value.reduce((acc, { amount }) => acc + amount, 0));

let watcher = null;
const createWatch = () => {
	if(watcher){
		watcher()
	}
	// 监听 chartData 的变化
	watcher = watch(
		[chartData, pupSign],
		([newData, newPup], [data, pup]) => {
			drawCanvas(newData);
		},
		{ deep: true, immediate: true }
	);
};
//将canvas替换为image
let timer = null;
const drawCanvas = async (data) => {
	if(timer!==null){
		 clearTimeout(timer);
	}
	try {
		const res = await lineChartInit(instance, data, canvasInfo.className, canvasInfo.id);
		if (res && pupSign.value) {
			imgUrl.value = res; // 设置新值
			imgOpt.value = 1;
			timer = setTimeout(() => {
				flag.value = true;
			}, 50);
		} else {
			//其他情况，正常更新并显示canvas
			await lineChartInit(instance, data, canvasInfo.className, canvasInfo.id);
			flag.value = false;
			imgOpt.value = 0;
		}
	} catch (err) {
		console.log(err);
	}
};
const toAnalysis = () => {
	router.navigateTo({ url: '/pages/analysis/index?title=日趋势' });
};
</script>

<style lang="scss" scoped>
.chart {
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	position: relative;
	background-color: $bg-color-white;
	filter: $shadow;
	border-radius: 30rpx;
	padding: 30rpx;
	.title {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: left;
		top: 20px;
		left: 10px;
	}
	.chart-shift {
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
		.indexChart {
			position: absolute;
			top: 0;
			width: 100%;
			height: 100%;
		}
	}
}
</style>
