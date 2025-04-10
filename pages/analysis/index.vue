<template>
	<view class="container">
		<view class="head">
			<headOptionsVue :panel-title="title"></headOptionsVue>
		</view>
		<view class="body">
			<view class="panel">
				<view class="total">
					<text class="amount">{{ type === 'expense' ? `-${data.amount}` : data.amount }}</text>
					<text class="qoq">{{ `环比 ${data.QOQ}` }}</text>
				</view>
				<view class="chart">
					<pieChartVue v-if="title === '分类统计'"></pieChartVue>
					<lineChartVue v-if="title === '日趋势'"></lineChartVue>
					<barChartVue v-if="title === '月度收支'"></barChartVue>
				</view>
			</view>
			<view class="list">
				<classfiyListVue v-if="title === '分类统计'"></classfiyListVue>
				<trendListVue v-if="title === '日趋势'"></trendListVue>
				<incomeAndExpenseListVue v-if="title === '月度收支'"></incomeAndExpenseListVue>
			</view>
		</view>
	</view>
</template>

<script setup>
import { onLoad, onReady } from '@dcloudio/uni-app';
import { computed, reactive, ref } from 'vue';
import headOptionsVue from './components/headOptions.vue';
import barChartVue from '../../components/barChart.vue';
import lineChartVue from '../../components/lineChart.vue';
import pieChartVue from '../../components/pieChart.vue';
import classfiyListVue from './components/classfiyList.vue';
import trendListVue from './components/trendList.vue';
import incomeAndExpenseListVue from './components/incomeAndExpenseList.vue';
import { userInfoStore } from '../../stores/userinfo';
import { panelinfoStore } from '../../stores/panelinfo';
import {calcPercentage } from '../../utils/calc-changes.js';
import { timeChain } from '../../utils/time-chain';

const title = ref();
const type = ref('expense')

onLoad((options) => {
	title.value = options.title;
});
onReady(() => {
	uni.setNavigationBarTitle({
		title: title.value
	});
});
const { getTotal } = userInfoStore();
const { getPanelInfo } = panelinfoStore();

const data = computed(() => {
	console.log(title.value);
	const {date,range} = getPanelInfo(title.value)

	const { expense: currentExpense, income: currentIncome } = getTotal(date);
	const { expense: lastExpense, income: lastIncome } = getTotal(timeChain(date, range, 'last'));
	const amount = type.value === 'expense' ? currentExpense : currentIncome;
	const QOQ = type.value === 'expense' ? calcPercentage(currentExpense, lastExpense) : calcPercentage(currentIncome, lastIncome);
	
	return {amount:amount,QOQ:QOQ}
});
</script>

<style scoped lang="scss">
.container {
	width: 100%;
	height: 100vh;
	box-sizing: border-box;
	background-color: $bg-color-grey;
	padding: 0 20rpx;
	.head {
		width: 100%;
		height: 7%;
	}
	.body {
		width: 100%;
		height: 93%;
		overflow: auto;
		.panel {
			width: 100%;
			height: 30%;
			box-sizing: border-box;
			padding: 0 20rpx;
			display: flex;
			flex-direction: column;
			background-color: $bg-color-white;
			border-radius: 20rpx;
			filter: $shadow;
			.total {
				width: 100%;
				height: 20%;
				display: flex;
				align-items: flex-end;
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
				height: 80%;
			}
		}
	}
}
</style>
