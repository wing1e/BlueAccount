<template>
	<view class="container">
		<!-- 头部总预算设置 -->
		<view class="header">
			<view class="title">预算设置</view>
			<view class="budget-input">
				<view class="picker">
					<picker mode="selector" :key="pickerVal" :range="pickerRange" @change="pickerChange">
						<view>{{ pickerRange[pickerVal] }}</view>
					</picker>
				</view>
				<text class="currency">¥</text>
				<input type="digit" :value="inputBudget[pickerVal]" @input="budgetInput" />
			</view>
			<view class="budget-info">
				<view class="info-item">
					<text class="label">本月支出</text>
					<text class="value">{{ currentExpense }}</text>
				</view>
				<view class="info-item">
					<text class="label">剩余预算</text>
					<text class="value">{{ remainingBudget }}</text>
				</view>
			</view>
			<view class="progress-bar">
				<view class="progress" :style="{ width: progressWidth + '%' }"></view>
			</view>
		</view>

		<!-- 分类预算设置 -->
		<view class="category-budget">
			<view class="section-title">分类预算</view>
			<view class="category-list">
				<view class="category-item" v-for="(item, index) in categoryBudgets" :key="index">
					<view class="category-info">
						<view class="left">
							<text class="name">{{ item.name }}</text>
						</view>
						<view class="right">
							<text class="amount">{{ item.budget }}</text>
							<text class="unit">元</text>
						</view>
					</view>
					<view class="category-progress">
						<view class="progress-bg">
							<view class="progress-bar" :style="{ width: (item.spent / item.budget) * 100 + '%' }"></view>
						</view>
						<text class="progress-text">{{ item.spent }}/{{ item.budget }}</text>
					</view>
				</view>
			</view>
		</view>

		<view class="tutorial">
			<text v-for="(item, index) in tutorialInfo" :key="index">{{ item }}</text>
		</view>
		<!-- 底部保存按钮 -->
		<view class="footer">
			<button class="save-btn" @click="saveBudget">保存设置</button>
		</view>
	</view>
</template>

<script setup>
import { ref, computed, toRef, reactive } from 'vue';
import { userInfoStore } from '../../stores/userinfo';
import { getNowDate } from '../../utils/get-date';
import { updataBill } from '../../utils/api/updataBill';

const store = userInfoStore();

// 选择器选中的index
const pickerVal = ref(0);
// 选择器的选项
const pickerRange = computed(() => {
	const result = ['不分类预算'];
	const budget_categories = store.basicInfo.budget_categories || [];
	budget_categories.forEach((item) => {
		result.push(item.name);
	});
	return result;
});

// 输入的预算
const inputBudget = ref([]);

// 当前预算
const totalBudget = computed(() => {
	const budget_categories = store.basicInfo.budget_categories || [];
	const budget_total = store.basicInfo.budget_total;
	return (
		Number(budget_total) +
		budget_categories.reduce((prev, cur) => {
			return (prev += Number(cur.budget));
		}, 0)
	);
});
// 当前支出
const currentExpense = computed(() => {
	const { year, month } = getNowDate();
	return store.getTotal([year, month].join('-')).expense;
});

// 计算剩余预算
const remainingBudget = computed(() => {
	return totalBudget.value - currentExpense.value;
});

// 计算进度条宽度
const progressWidth = computed(() => {
	return Math.min((currentExpense.value / Number(totalBudget.value)) * 100, 100);
});

// 分类预算数据
const categoryBudgets = computed(() => {
	const budgetCategories = store.basicInfo.budget_categories||[];
	const { year, month } = getNowDate();
	const categoriesExpense = store.getCategoryInfo([year, month].join('-')).expense;
	return budgetCategories.map(item => {
		return { ...item, spent: categoriesExpense.find((Categories) => Categories.category === item.name)?.total || 0 };
	});
});
let timer = null;
// 预算输入
const budgetInput = (e) => {
	if (timer !== null) {
		clearTimeout(timer);
	}
	timer = setTimeout(() => {
		inputBudget.value[pickerVal.value] = e.detail.value;
		console.log(inputBudget.value);
	}, 200);
};

const pickerChange = (e) => {
	pickerVal.value = e.detail.value;
};

// 保存预算设置
const saveBudget = async () => {
	if(inputBudget.value.length===0){
		uni.showToast({
			icon:'none',
			title:'请先输入预算'
		})
		return
	}
	try {
		const data = [];
		data.push({ name: '不分类预算', budget: inputBudget.value[0] || store.basicInfo.budget_total });
		store.basicInfo.budget_categories.forEach((item, index) => {
			data.push({ name: item.name, budget: inputBudget.value[index + 1] || item.budget });
		});
		
		// 等待预算更新完成
		const updataBudgetRes = await store.updataBudget(data);
		if (updataBudgetRes.errCode !== 0) {
			throw new Error(updataBudgetRes.msg || '更新预算失败');
		}
		// 等待数据查询完成
		const queryRes = await store.queryData();
		if (queryRes.errCode !== 0) {
			throw new Error(queryRes.msg || '查询数据失败');
		}
		
		// 所有操作都成功后才显示提示
		uni.showToast({
			title: '保存成功',
			icon: 'success',
			duration: 1000
		});
		//清空输入
		inputBudget.value = []
		
	} catch (error) {
		uni.showToast({
			title: error.message || '保存失败',
			icon: 'error',
			duration: 2000
		});
		console.error('保存预算设置失败:', error);
	}
};

const tutorialInfo = [
	'1.只设置不分类预算即总预算;',
	'2.如果设置了不分类预算和其他分类预算，总预算为设置的不分类预算与其他的分类预算之和;',
	'3.若没有设置不分类预算，总预算为其他分类预算之和;'
];
</script>

<style lang="scss" scoped>
.container {
	width: 100%;
	min-height: 100vh;
	background-color: $bg-color-grey;
	padding-bottom: 150rpx;
	box-sizing: border-box;

	.header {
		background-color: $bg-color-white;
		padding: $space;
		margin-bottom: $space;
		border-radius: 0 0 30rpx 30rpx;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);

		.title {
			font-size: $text-size-title;
			font-weight: 600;
			color: $text-color-dark-grey;
			margin-bottom: $space;
		}

		.budget-input {
			display: flex;
			align-items: center;
			margin-bottom: $space;
			padding: 20rpx 0;
			border-bottom: 2rpx solid #f5f5f5;
			.picker {
				font-size: $text-size-title;
				font-weight: 600;
				color: $text-color-dark-grey;
				margin-right: 20rpx;
			}
			.currency {
				font-size: $text-size-title;
				color: $text-color-dark-grey;
				font-weight: 600;
				margin-right: 20rpx;
			}

			input {
				font-size: $text-size-big;
				font-weight: 600;
				color: $text-color-dark-grey;
				flex: 1;
			}
		}

		.budget-info {
			display: flex;
			justify-content: space-between;
			margin-bottom: 30rpx;

			.info-item {
				display: flex;
				flex-direction: column;
				align-items: center;

				.label {
					font-size: $text-size-med;
					color: $text-color-light-grey;
					margin-bottom: 12rpx;
				}

				.value {
					font-size: $text-size-title;
					font-weight: 600;
					color: $text-color-dark-grey;
				}
			}
		}

		.progress-bar {
			width: 100%;
			height: 12rpx;
			background-color: #f0f0f0;
			border-radius: 6rpx;
			overflow: hidden;

			.progress {
				height: 100%;
				background: linear-gradient(90deg, $blue-dark, lighten($blue-dark, 15%));
				transition: width 0.3s ease;
			}
		}
	}

	.category-budget {
		background-color: $bg-color-white;
		padding: 40rpx $space;
		border-radius: 30rpx;
		margin: 0 $space;

		.section-title {
			font-size: $text-size-title;
			font-weight: 600;
			color: $text-color-dark-grey;
			margin-bottom: 40rpx;
		}

		.category-list {
			.category-item {
				margin-bottom: 40rpx;
				padding: 20rpx;
				background-color: #fafafa;
				border-radius: 16rpx;

				&:last-child {
					margin-bottom: 0;
				}

				.category-info {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 20rpx;

					.left {
						display: flex;
						align-items: center;

						.name {
							font-size: $text-size-title;
							font-weight: 500;
							color: $text-color-dark-grey;
						}
					}

					.right {
						.amount {
							font-size: $text-size-title;
							font-weight: 600;
							color: $text-color-dark-grey;
						}

						.unit {
							font-size: $text-size-sm;
							color: $text-color-light-grey;
							margin-left: 4rpx;
						}
					}
				}

				.category-progress {
					display: flex;
					align-items: center;

					.progress-bg {
						flex: 1;
						height: 8rpx;
						background-color: #f0f0f0;
						border-radius: 4rpx;
						margin-right: 24rpx;
						overflow: hidden;

						.progress-bar {
							height: 100%;
							background: linear-gradient(90deg, $blue-dark, lighten($blue-dark, 15%));
							transition: width 0.3s ease;
						}
					}

					.progress-text {
						font-size: $text-size-sm;
						color: $text-color-light-grey;
						width: 140rpx;
						text-align: right;
					}
				}
			}
		}
	}
	.tutorial {
		font-size: 18rpx;
		color: $text-color-light-grey;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
		padding: 50rpx;
		box-sizing: border-box;
		margin-top: 30rpx;
		text {
			margin: 5rpx 0;
			letter-spacing: 1rpx;
		}
	}

	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 20rpx $space 40rpx;
		box-sizing: border-box;
		background-color: $bg-color-white;
		box-shadow: 0 -4rpx 16rpx rgba(0, 0, 0, 0.08);
		.save-btn {
			width: 100%;
			height: 88rpx;
			line-height: 88rpx;
			text-align: center;
			background: linear-gradient(90deg, $blue-dark, lighten($blue-dark, 15%));
			color: #fff;
			border-radius: 44rpx;
			font-size: 32rpx;
			font-weight: 600;
			box-shadow: 0 4rpx 12rpx rgba(0, 122, 255, 0.2);
			transition: all 0.3s ease;

			&:active {
				transform: scale(0.98);
				box-shadow: 0 2rpx 8rpx rgba(0, 122, 255, 0.2);
			}
		}
	}
}
</style>
