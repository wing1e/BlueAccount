<template>
	<view class="detail">
		<view class="header">
			<headerVue :filterData="filterData" @filterChange="handleFilterChange" />
		</view>
		<view class="container">
			<text class="num">
				{{ getTotal(filterData.date).num + '笔交易' }}
			</text>
			<view class="brand">
				<view class="brand-item" v-for="(item, index) in brandData" :key="index">
					<text>{{ item.title }}</text>
					<text style="font-size: 32rpx">{{ item.num }}</text>
					<view style="font-size: 16rpx">
						<text style="margin-right: 15rpx">{{ item.qoq }}</text>
						<text>{{ item.percentage }}</text>
					</view>
				</view>
			</view>
			<view class="list">
				<listVue :filterData="filterData"></listVue>
			</view>
		</view>
		<editVue :flag="popFlag"></editVue>
	</view>
</template>

<script setup>
import { computed, onMounted, provide, reactive, ref, watch } from 'vue';
import headerVue from './components/headOptions.vue';
import listVue from './components/list.vue';
import editVue from './components/editPop.vue' 
import { getNowDate } from '../../utils/get-date.js';
import { userInfoStore } from '../../stores/userinfo';
import { formatAmount } from '../../utils/format.js';
import { timeChain } from '../../utils/time-chain.js';
import { calcQOQ, calcPercentage } from '../../utils/calc.js';
import { PICKER_INFO } from '../../utils/constants';

onMounted(() => fillBrand());
const { getTotal } = userInfoStore();
// 获取当前日期
const { year, month } = getNowDate();
const rangeArr = ['年范围', '月范围', '周范围', '日范围'];
// 定义筛选数据条件
const filterData = reactive({
	range: 1, // 选择的日期范围
	date: [year, month].join('-'), //指定的日期
	order: 0 //排序方式
});



// 定义统计面板
const brandData = reactive([
	{ title: '支出', num: '000.00', qoq: '000.00', percentage: '0' },
	{ title: '收入', num: '000.00', qoq: '000.00', percentage: '0' },
	{ title: '结余', num: '000.00', qoq: '000.00', percentage: '0' }
]);


const handleFilterChange = (data) => {
	// 更新筛选数据
	Object.assign(filterData, data);
	// 重新填充数据
	fillBrand();
};

// 填充数据
const fillBrand = () => {
	// 获取当前数据
	const current = getTotal(filterData.date);
	const currentExpense = current.expense || 0;
	const currentIncome = current.income || 0;
	const currentBalance = currentIncome - currentExpense;

	// 获取环比数据
	const rangStr = rangeArr[filterData.range];
	const lastMonth = getTotal(timeChain(filterData.date, rangStr, 'last'));
	const lastExpense = lastMonth.expense || 0;
	const lastIncome = lastMonth.income || 0;
	const lastBalance = lastIncome - lastExpense;

	// 更新数据
	brandData[0].num = formatAmount(-currentExpense);
	brandData[1].num = formatAmount(currentIncome);
	brandData[2].num = formatAmount(currentBalance);

	// 计算环比变化
	brandData[0].qoq = calcQOQ(currentExpense, lastExpense);
	brandData[1].qoq = calcQOQ(currentIncome, lastIncome);
	brandData[2].qoq = calcQOQ(currentBalance, lastBalance);

	// 计算百分比变化
	brandData[0].percentage = calcPercentage(currentExpense, lastExpense);
	brandData[1].percentage = calcPercentage(currentIncome, lastIncome);
	brandData[2].percentage = calcPercentage(currentBalance, lastBalance);
};

</script>

<style lang="scss" scoped>
@mixin flex-center {
	display: flex;
	justify-content: center;
	align-items: center;
}
@mixin padding30 {
	box-sizing: border-box;
	padding: 0 30rpx;
}
.detail {
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #f2f6f9;
	@include padding30;
	.header {
		width: 100%;
		height: 7%;
	}
	.container {
		width: 100%;
		height: 95%;
		overflow: auto;

		.num {
			width: 100%;
			height: 5%;
			box-sizing: border-box;
			padding: 20rpx;
			font-size: $text-size-big;
			color: #a3b2c6;
			position: relative;
			right: 50%;
			transform: translate(50%, 0);
			display: block;
		}
		.brand {
			width: 100%;
			height: 15%;
			box-sizing: border-box;
			display: flex;
			justify-content: space-around;
			align-items: center;
			background: linear-gradient(to right, #485161, #00005b);
			filter: $shadow;
			border-radius: 40rpx;
			.brand-item {
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-evenly;
				align-items: center;
				font-size: $text-size-med;
				color: #fff;
			}
		}
		.list {
			width: 100%;
		}
	}
}
</style>
