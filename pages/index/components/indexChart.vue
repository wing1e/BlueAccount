<template>
	<view class="chart">
		<view class="title">
			<text style="font-size: 24rpx; color: #909090; font-weight: 600">{{ '最近支出' }}</text>
			<text style="font-size: 46rpx; letter-spacing: 1rpx; color: #de6ea6; margin-left: 20rpx">{{ '-' + total }}</text>
			<text style="font-size: 20rpx; color: #00b6e6">{{ '平均值：' + (total / 7).toFixed(2) }}</text>
		</view>
		<view style="position: absolute; right: 20rpx; top: 20rpx">
			<RightButton></RightButton>
		</view>
		<!-- 首页折线图 -->
		<view class="chart-shift">
			<canvas :canvas-id="canvasInfo.id" :class="canvasInfo.className" v-if="!flag"></canvas>
			<image :src="imgUrl" v-if="imgUrl && flag" style="width: 100%; height: 100%"></image>
		</view>
	</view>
</template>

<script setup>
import { computed, getCurrentInstance, nextTick, onMounted, ref, watch } from 'vue';
import { onShow, onHide } from '@dcloudio/uni-app';
import RightButton from '../../../components/RightButton.vue';
import { lineChartInit } from '../../../utils/chart/line-chart.js';
import { userInfoStore } from '../../../stores/userinfo.js';
import { getNowDate } from '../../../utils/get-date.js';
import { tabBarStore } from '../../../stores/tabbar';
onMounted(() => {
	createWatch();
	drawCanvas(chartData.value);
});
const instance = getCurrentInstance();
const store = userInfoStore();
const tabStore = tabBarStore();

const canvasInfo = { className: '.indexChart', id: 'indexChart' };
const imgUrl = ref();
const flag = ref(false);
const pupSign = computed(() => tabStore.getPupSign);

// 截取最后七天数据
const chartData = computed(() => {
	return store.getDataList.slice(-7).map((item) => ({
		date: item.date,
		amount: store.getTotal(item.date).expense
	}));
});
//七天总支出
const total = computed(() => chartData.value.reduce((acc, { amount }) => acc + amount, 0));

let watcher = null;
const createWatch = () => {
	// 监听 chartData 的变化
	watcher = watch(
		[chartData, () => tabStore.pupSign],
		([newData, newPup], [data, pup]) => {
			drawCanvas(newData);
		},
		{ deep: true }
	);
};
//将canvas替换为image
const drawCanvas = async (data) => {
	try {
		const res = await lineChartInit(instance, data, canvasInfo.className, canvasInfo.id);
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
		.indexChart {
			width: 100%;
			height: 100%;
			position: absolute;
		}
	}
}
</style>
