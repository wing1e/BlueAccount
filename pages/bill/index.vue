<template>
	<view class="container">
		<!-- 顶部栏 -->
		<view class="top-bar">
			<picker mode="selector" :range="yearList" :value="selectedYearIndex" @change="onYearChange">
				<view class="year-select">
					<text>{{ yearList[selectedYearIndex] }}年</text>
					<uni-icons type="down" color="#fff" size="15" style="margin-left: 10rpx"></uni-icons>
				</view>
			</picker>
			<view class="title">账单</view>
		</view>

		<!-- 汇总卡片 -->
		<view class="summary-card">
			<view class="left">
				<view class="label">结余</view>
				<view class="balance">{{ summary.balance }}</view>
				<view class="row">
					<text class="income-label">收入</text>
					<text class="income-value">{{ summary.income }}</text>
					<text class="expense-label">支出</text>
					<text class="expense-value">{{ summary.expense }}</text>
				</view>
			</view>
			<view class="right">
				<text class="iconfont icon-money"></text>
			</view>
		</view>

		<!-- 月份明细表格 -->
		<view class="table">
			<view class="table-header">
				<text class="col month">月份</text>
				<text class="col income">月收入</text>
				<text class="col expense">月支出</text>
				<text class="col balance">月结余</text>
			</view>
			<view class="table-row" v-for="item in monthList" :key="item.month">
				<text class="col month">{{ item.month }}月</text>
				<text class="col income">{{ item.income }}</text>
				<text class="col expense">{{ item.expense }}</text>
				<text class="col balance" :class="{ negative: item.balance < 0 }">{{ item.balance }}</text>
			</view>
		</view>

		<!-- 底部导航栏 -->
		<view class="tabbar">
			<TabbarVue />
		</view>
		<!-- 新增数据 -->
		<AddPopVue></AddPopVue>
	</view>
</template>

<script setup>
import { computed, ref } from 'vue';
import TabbarVue from '../../components/Tabbar.vue';
import { userInfoStore } from '../../stores/userinfo';
import { getNowDate } from '../../utils/get-date';
import AddPopVue from '../../components/AddPop.vue';
const userstore = userInfoStore();
const { year, month } = getNowDate();
// 年份选择
const yearList = computed(() => {
	const minDate = userstore.datalist[0].date || 0;
	const maxDate = userstore.datalist[userstore.datalist.length - 1].date || 0;
	const minYear = 2023||Number(minDate.split('-')[0]);
	const maxYear = Number(maxDate.split('-')[0]);
	const yearArr = [];
	for (let i = maxYear; i >= minYear; i--) {
		yearArr.push(String(i));
	}
	return yearArr;
});
// 选中的年份
const selectedYearIndex = ref(yearList.value.findIndex((y) => y == year));
const onYearChange = (e) => {
	selectedYearIndex.value = e.detail.value;
};

// 汇总数据
const summary = computed(()=>{
	const summaryYear = yearList.value[selectedYearIndex.value];
	const {income, expense} = userstore.getTotal(summaryYear)
	return {balance: income - expense,income,expense}
});

// 月份明细
const monthList = computed(() => {
	const listDateYear = yearList.value[selectedYearIndex.value];
	const list = [];
	const monthLength = listDateYear == year ? month : 12
	for (let i = monthLength; i >= 1; i--) {
		const listMonth = String(i).padStart(2, '0');
		const { income, expense } = userstore.getTotal([listDateYear, listMonth].join('-'));
		list.push({ month: listMonth, income, expense, balance: income - expense });
	}
	return list;
});
</script>

<style lang="scss" scoped>
.container {
	width: 100%;
	min-height: 100vh;
	background: $bg-color-white;
	box-sizing: border-box;
	padding-bottom: 120rpx;
}

.top-bar {
	padding: var(--status-bar-height) $space 0;
	box-sizing: border-box;
	background-color: $blue-dark;
	height: 175rpx;
	width: 100%;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	.year-select {
		font-size: $text-size-med;
		position: absolute;
		left: 30rpx;
		display: flex;
		align-items: center;
	}

	.title {
		font-size: $text-size-big;
		text-align: center;
		position: absolute;
		bottom: 25rpx;
	}
}

.summary-card {
	border: 1rpx solid black;
	margin: $space $space 0 $space;
	background: linear-gradient(to right, #485161, #00005b);
	border-radius: 40rpx;
	display: flex;
	padding: $space;
	color: #fff;
	.left {
		width: 100%;
		.label {
			font-size: $text-size-med;
			margin-bottom: 10rpx;
		}

		.balance {
			font-size: 40rpx;
			margin-bottom: 10rpx;
		}
		.row {
			width: 80%;
			display: flex;
			align-items: center;
			.income-label,
			.expense-label {
				font-size: $text-size-med;
			}
			.expense-label {
				margin-left: auto;
			}

			.income-value,
			.expense-value {
				font-size: $text-size-big;
				margin-left: 10rpx;
			}

			.income-value {
			}

			.expense-value {
			}
		}
	}

	.right {
		.iconfont {
			font-size: 100rpx;
			color: $blue-light;
			opacity: 0.3;
		}
	}
}

.table {
	margin: 40rpx $space 0 $space;
	.table-header,
	.table-row {
		display: flex;
		align-items: center;
		padding: 20rpx 0;
		border-bottom: 1rpx solid $bg-color-grey;

		.col {
			flex: 1;
			text-align: center;
			font-size: $text-size-med;
			color: $text-color-dark-grey;

			&.balance.negative {
				color: #ff4d4f;
			}
		}

		.col.month {
			flex: 0.8;
		}
	}

	.table-header {
		font-weight: bold;
		background: $bg-color-grey;
	}
}

.tabbar {
	width: 100%;
	position: fixed;
	bottom: 0;
}
</style>
