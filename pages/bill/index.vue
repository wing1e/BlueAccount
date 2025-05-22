<template>
	<view class="container">
		<!-- 顶部栏 -->
		<view class="top-bar">
			<picker mode="selector" :range="yearList"  :value="selectedYearIndex" @change="onYearChange">
				<view class="year-select">{{ yearList[selectedYearIndex] }}年</view>
			</picker>
			<view class="title">鲨鱼记账</view>
			<view class="right-btns">
				<button class="icon-btn" @click="onMore"><text class="iconfont icon-more"></text></button>
				<button class="icon-btn" @click="onSetting"><text class="iconfont icon-setting"></text></button>
			</view>
		</view>

		<!-- 汇总卡片 -->
		<view class="summary-card">
			<view class="left">
				<view class="label">结余</view>
				<view class="balance" :class="{ negative: summary.balance < 0 }">{{ summary.balance }}</view>
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
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import TabbarVue from '../../components/Tabbar.vue';

	// 年份选择
	const yearList = ref(['2025', '2024', '2023']);
	const selectedYearIndex = ref(0);
	const onYearChange = (e) => {
		selectedYearIndex.value = e.detail.value;
		// TODO: 切换年份后刷新数据
	};

	// 汇总数据
	const summary = ref({
		balance: -109.36,
		income: 7925.07,
		expense: 8034.43
	});

	// 月份明细
	const monthList = ref([
		{ month: '05', income: 0, expense: 0, balance: 0 },
		{ month: '04', income: 0, expense: 0, balance: 0 },
		{ month: '03', income: 0, expense: 751.34, balance: -751.34 },
		{ month: '02', income: 4150, expense: 3836.68, balance: 313.32 },
		{ month: '01', income: 3775.07, expense: 3446.41, balance: 328.66 }
	]);

	const onMore = () => {
		uni.showToast({ title: '更多功能开发中', icon: 'none' });
	};
	const onSetting = () => {
		uni.showToast({ title: '设置功能开发中', icon: 'none' });
	};
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		min-height: 100vh;
		background: #fff;
		box-sizing: border-box;
		padding-bottom: 120rpx;
	}
	.top-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100rpx;
		padding: 0 30rpx;
		.year-select {
			font-size: 32rpx;
			color: #222;
			margin-right: 20rpx;
		}
		.title {
			font-size: 36rpx;
			font-weight: bold;
			color: #222;
			flex: 1;
			text-align: center;
		}
		.right-btns {
			display: flex;
			align-items: center;
			.icon-btn {
				background: none;
				border: none;
				margin-left: 10rpx;
				padding: 0;
				.iconfont {
					font-size: 36rpx;
					color: #222;
				}
			}
		}
	}
	.summary-card {
		margin: 30rpx 30rpx 0 30rpx;
		background: #ffe066;
		border-radius: 24rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 36rpx 30rpx;
		.left {
			.label {
				font-size: 28rpx;
				color: #666;
				margin-bottom: 10rpx;
			}
			.balance {
				font-size: 48rpx;
				font-weight: bold;
				color: #222;
				margin-bottom: 10rpx;
				&.negative {
					color: #ff4d4f;
				}
			}
			.row {
				display: flex;
				align-items: center;
				.income-label, .expense-label {
					font-size: 24rpx;
					color: #666;
					margin-right: 10rpx;
				}
				.income-value, .expense-value {
					font-size: 28rpx;
					font-weight: bold;
					margin-right: 30rpx;
				}
				.income-value {
					color: #222;
				}
				.expense-value {
					color: #222;
				}
			}
		}
		.right {
			.iconfont {
				font-size: 100rpx;
				color: #ffe066;
				opacity: 0.3;
			}
		}
	}
	.table {
		margin: 40rpx 30rpx 0 30rpx;
		.table-header, .table-row {
			display: flex;
			align-items: center;
			padding: 20rpx 0;
			border-bottom: 1rpx solid #f5f5f5;
			.col {
				flex: 1;
				text-align: center;
				font-size: 28rpx;
				color: #222;
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
			background: #fafafa;
		}
	}
	.tabbar {
		width: 100%;
		height: 8%;
		position: fixed;
		bottom: 0;
	}
</style>
