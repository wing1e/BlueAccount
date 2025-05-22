<template>
	<view class="container">
		<!-- 头部总预算设置 -->
		<view class="header">
			<view class="title">总预算设置</view>
			<view class="budget-input">
				<text class="currency">¥</text>
				<input type="digit" v-model="totalBudget" placeholder="设置每月总预算" />
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
							<text class="iconfont" :class="item.icon"></text>
							<text class="name">{{ item.name }}</text>
						</view>
						<view class="right">
							<text class="amount">{{ item.budget }}</text>
							<text class="unit">元</text>
						</view>
					</view>
					<view class="category-progress">
						<view class="progress-bg">
							<view 
								class="progress-bar" 
								:style="{ width: (item.spent / item.budget * 100) + '%' }"
							></view>
						</view>
						<text class="progress-text">{{ item.spent }}/{{ item.budget }}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 底部保存按钮 -->
		<view class="footer">
			<button class="save-btn" @click="saveBudget">保存设置</button>
		</view>
	</view>
	
</template>

<script setup>
import { ref, computed } from 'vue';
import { userInfoStore } from '../../stores/userinfo';

const store = userInfoStore();

// 总预算
const totalBudget = ref('');
const currentExpense = ref(0);

// 计算剩余预算
const remainingBudget = computed(() => {
	return Number(totalBudget.value || 0) - currentExpense.value;
});

// 计算进度条宽度
const progressWidth = computed(() => {
	if (!totalBudget.value) return 0;
	return Math.min((currentExpense.value / Number(totalBudget.value)) * 100, 100);
});

// 分类预算数据
const categoryBudgets = ref([
	{
		name: '餐饮',
		icon: 'icon-food',
		budget: 2000,
		spent: 800
	},
	{
		name: '交通',
		icon: 'icon-transport',
		budget: 1000,
		spent: 300
	},
	{
		name: '购物',
		icon: 'icon-shopping',
		budget: 1500,
		spent: 1200
	},
	{
		name: '娱乐',
		icon: 'icon-entertainment',
		budget: 800,
		spent: 400
	}
]);

// 保存预算设置
const saveBudget = () => {
	uni.showToast({
		title: '保存成功',
		icon: 'success'
	});
};
</script>

<style lang="scss" scoped>
.container {
	width: 100%;
	min-height: 100vh;
	background-color: $bg-color-grey;
	padding-bottom: 120rpx;
	box-sizing: border-box;

	.header {
		background-color: $bg-color-white;
		padding: 40rpx $space;
		margin-bottom: $space;
		border-radius: 0 0 30rpx 30rpx;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);

		.title {
			font-size: 36rpx;
			font-weight: 600;
			color: $text-color-dark-grey;
			margin-bottom: 40rpx;
		}

		.budget-input {
			display: flex;
			align-items: center;
			margin-bottom: 40rpx;
			padding: 20rpx 0;
			border-bottom: 2rpx solid #f5f5f5;

			.currency {
				font-size: 56rpx;
				font-weight: 600;
				color: $text-color-dark-grey;
				margin-right: 20rpx;
			}

			input {
				font-size: 56rpx;
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
					font-size: 40rpx;
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
			font-size: 36rpx;
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

						.iconfont {
							font-size: 44rpx;
							margin-right: 24rpx;
							color: $blue-dark;
						}

						.name {
							font-size: 32rpx;
							font-weight: 500;
							color: $text-color-dark-grey;
						}
					}

					.right {
						.amount {
							font-size: 36rpx;
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

	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 20rpx $space 40rpx;
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
