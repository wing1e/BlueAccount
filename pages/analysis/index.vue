<template>
	<view class="container">
		<view class="head">
			<headOptionsVue :panel-title="title"></headOptionsVue>
		</view>
		<view class="panel">
			<view class="total">
				<text class="amount">{{ type === 'expense' ? `-${data.amount}` : data.amount }}</text>
				<text class="qoq">{{ `环比 ${data.QOQ}` }}</text>
			</view>
			<view class="chart">
				<pieChartVue v-if="title === '分类统计' && isShow"></pieChartVue>
				<lineChartVue v-else-if="title === '日趋势' && isShow"></lineChartVue>
				<barChartVue v-else-if="title === '月度收支' && isShow"></barChartVue>
			</view>
		</view>
		<view class="list">
			<classfiyListVue v-if="title === '分类统计' && isShow"></classfiyListVue>
			<trendListVue v-else-if="title === '日趋势' && isShow"></trendListVue>
			<incomeAndExpenseListVue v-else-if="title === '月度收支' && isShow"></incomeAndExpenseListVue>
		</view>
	</view>
</template>

<script setup>
import { onLoad, onReady, onShow, onHide } from '@dcloudio/uni-app';
import { computed, ref } from 'vue';
import headOptionsVue from './components/headOptions.vue';
import barChartVue from '../../components/barChart.vue';
import lineChartVue from '../../components/lineChart.vue';
import pieChartVue from '../../components/pieChart.vue';
import classfiyListVue from './components/classfiyList.vue';
import trendListVue from './components/trendList.vue';
import incomeAndExpenseListVue from './components/incomeAndExpenseList.vue';
import { userInfoStore } from '../../stores/userinfo';
import { panelinfoStore } from '../../stores/panelinfo';
import { calcPercentage } from '../../utils/calc.js';
import { timeChain } from '../../utils/time-chain';

const title = ref();
const type = ref('expense');

onLoad((options) => {
	title.value = options.title;
});
onReady(() => {
	uni.setNavigationBarTitle({
		title: title.value
	});
});
onShow(() => {
	isShow.value = true;
});
onHide(() => {
	isShow.value = false;
});
const { getTotal } = userInfoStore();
const panelinfo = panelinfoStore();
const isShow = ref(false);
const data = computed(() => {
	if (title.value) {
		const { date, range, allowRange } = panelinfo.getPanelInfo(title.value);
		const rangeStr = allowRange[range];
		// 当前日期数据
		const { expense: currentExpense, income: currentIncome } = getTotal(date);

		// 上一个环比数据
		const { expense: lastExpense, income: lastIncome } = getTotal(timeChain(date, rangeStr, 'last'));
		const amount = type.value === 'expense' ? currentExpense : currentIncome;
		const QOQ = type.value === 'expense' ? calcPercentage(currentExpense, lastExpense) : calcPercentage(currentIncome, lastIncome);

		return { amount: amount, QOQ: QOQ };
	}
	return { amount: 0, QOQ: 0 };
});
</script>

<style scoped lang="scss">
.container {
	width: 100%;
	height: 100vh;
	box-sizing: border-box;
	background-color: $bg-color-grey;
	display: flex;
	flex-direction: column;
	.head {
		width: 100%;
		height: 7%;
	}
	.panel {
		width: calc(100% - 60rpx);
		height: 30%;
		box-sizing: border-box;
		padding: $space;
		margin: 0 $space;
		display: flex;
		flex-direction: column;
		background-color: $bg-color-white;
		border-radius: 30rpx;
		filter: $shadow;
		.total {
			width: 100%;
			height: 15%;
			display: flex;
			align-items: center;
			justify-content: start;
			.amount {
				font-size: 46rpx;
				color: #ff6d7a;
				line-height: 1;
				margin-right: 10rpx;
			}
			.qoq {
				font-size: $text-size-sm;
				color: #00b6e6;
				line-height: 1;
			}
		}
		.chart {
			width: 100%;
			height: 85%;
		}
	}
	.list {
		width: 100%;
		height: 63%;
		margin: $space 0;
		overflow-y: auto;
	}
}
</style>
