<template>
	<view class="container">
		<!-- 头部用户信息区域 -->
		<view class="header">
			<view class="user-info">
				<image :src="store.basicInfo.avatar" mode="aspectFit" class="avatar"></image>
				<view class="user-detail">
					<text class="nickname" @click="getUserInfo">{{ store.basicInfo.nickname }}</text>
				</view>
			</view>
		</view>

		<!-- 功能模块区域 -->
		<view class="content">
			<!-- 数据概览卡片 -->
			<view class="overview-card">
				<view class="overview-item">
					<text class="number">{{ total.expense || '0.00' }}</text>
					<text class="label">总支出</text>
				</view>
				<view class="overview-item">
					<text class="number">{{ total.income || '0.00' }}</text>
					<text class="label">总收入</text>
				</view>
				<view class="overview-item">
					<text class="number">{{ store.basicInfo.budget || '0.00' }}</text>
					<text class="label">预算</text>
				</view>
			</view>

			<!-- 功能列表 -->
			<view class="function-list">
				<view class="function-group">
					<view class="group-title">账户管理</view>
					<view class="function-item" v-for="(item, index) in accountFunctions" :key="index" @click="item.action">
						<view class="left">
							<text class="iconfont" :class="item.icon"></text>
							<text class="title">{{ item.title }}</text>
						</view>
						<text class="iconfont icon-arrow-right"></text>
					</view>
				</view>

				<view class="function-group">
					<view class="group-title">系统设置</view>
					<view class="function-item" v-for="(item, index) in systemFunctions" :key="index" @click="item.action">
						<view class="left">
							<text class="iconfont" :class="item.icon"></text>
							<text class="title">{{ item.title }}</text>
						</view>
						<text class="iconfont icon-arrow-right"></text>
					</view>
				</view>
			</view>
		</view>

		<view class="tabbar">
			<tabbarVue></tabbarVue>
		</view>
	</view>
	<!-- 新增弹出框 -->
	<AddPopVue></AddPopVue>
</template>

<script setup>
import { computed, onMounted, reactive } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { userInfoStore } from '../../stores/userinfo';
import tabbarVue from '../../components/Tabbar.vue';
import AddPopVue from '../../components/AddPop.vue';
import { query } from '../../utils/api/query';
import { getNowDate } from '../../utils/get-date';
import router from '../../utils/router';

const store = userInfoStore();

const total = computed(() => {
	const { year, month } = getNowDate();
	const date = [year, month].join('-');
	return store.getTotal(date);
});

// 账户管理功能列表
const accountFunctions = reactive([
	{
		title: '预算设置',
		icon: 'icon-budget',
		action: () => router.navigateTo({ url: '/pages/budget/index' })
	},
	{
		title: '标签管理',
		icon: 'icon-export',
		action: () => handleLabel()
	},
	{
		title: '账单导出',
		icon: 'icon-export',
		action: () => handleExport()
	},
	{
		title: '数据备份',
		icon: 'icon-backup',
		action: () => handleBackup()
	}
]);

// 系统设置功能列表
const systemFunctions = reactive([
	{
		title: '主题设置',
		icon: 'icon-theme',
		action: () => handleTheme()
	},
	{
		title: '消息通知',
		icon: 'icon-notification',
		action: () => handleNotification()
	},
	{
		title: '关于我们',
		icon: 'icon-about',
		action: () => handleAbout()
	}
]);

// 各功能的处理方法

const handleLabel = () => {
	uni.showToast({ title: '标签管理开发中', icon: 'none' });
};
const handleExport = () => {
	uni.showToast({ title: '导出功能开发中', icon: 'none' });
};

const handleBackup = () => {
	uni.showToast({ title: '备份功能开发中', icon: 'none' });
};

const handleTheme = () => {
	uni.showToast({ title: '主题功能开发中', icon: 'none' });
};

const handleNotification = () => {
	uni.showToast({ title: '通知功能开发中', icon: 'none' });
};

const handleAbout = () => {
	uni.showToast({ title: '关于页面开发中', icon: 'none' });
};

// 登录
const getUserInfo = () => {
	try {
		uni.showModal({
			title:'授权登录',
			content:'允许通过code获取openid和用户匿名信息登录',
			success: async(res) => {
				if(res.confirm){
					await store.login()
				}
			}
		})
	} catch (err) {
		throw new Error(err);
	}
};
</script>

<style lang="scss" scoped>
.container {
	width: 100%;
	height: 100%;
	background-color: $bg-color-grey;
	position: relative;
	overflow-y: auto;
	box-sizing: border-box;
	padding: 0 0 20%;

	.header {
		width: 100%;
		height: 220rpx;
		background-color: $blue-dark;
		padding: $space;
		box-sizing: border-box;

		.user-info {
			display: flex;
			align-items: center;

			.avatar {
				width: 120rpx;
				height: 120rpx;
				border-radius: 60rpx;
				border: 4rpx solid rgba(255, 255, 255, 0.8);
				background-color: $blue-med;
			}

			.user-detail {
				margin-left: 30rpx;
				display: flex;
				flex-direction: column;

				.nickname {
					font-size: 36rpx;
					color: #fff;
					margin-bottom: 10rpx;
					font-weight: 500;
				}
			}
		}
	}

	.content {
		padding: $space;
		box-sizing: border-box;

		.overview-card {
			background-color: $bg-color-white;
			border-radius: 30rpx;
			padding: $space;
			display: flex;
			justify-content: space-around;
			margin-top: -50rpx;
			filter: $shadow;

			.overview-item {
				display: flex;
				flex-direction: column;
				align-items: center;

				.number {
					font-size: 36rpx;
					font-weight: bold;
					margin-bottom: 10rpx;
				}

				.label {
					font-size: $text-size-med;
					color: $text-color-dark-grey;
				}
			}
		}

		.function-list {
			margin-top: $space;

			.function-group {
				background-color: #fff;
				border-radius: 30rpx;
				padding: $space;
				margin-bottom: 20rpx;

				.group-title {
					font-size: $text-size-big;
					color: $text-color-light-grey;
					margin-bottom: 20rpx;
				}

				.function-item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 100rpx;
					border-bottom: 1rpx solid #f5f5f5;

					&:last-child {
						border-bottom: none;
					}

					.left {
						display: flex;
						align-items: center;

						.iconfont {
							font-size: 40rpx;
							margin-right: 20rpx;
							color: #003498;
						}

						.title {
							font-size: $text-size-big;
							color: #333;
						}
					}

					.icon-arrow-right {
						font-size: $text-size-big;
						color: #999;
					}
				}
			}
		}
	}

	.tabbar {
		width: 100%;
		height: 8%;
		position: fixed;
		bottom: 0;
	}
}
</style>
