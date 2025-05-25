<template>
	<view class="container">
		<!-- 头部用户信息区域 -->
		<view class="header">
			<view class="user-info">
				<view>
					<button open-type="chooseAvatar" class="avatar-btn" @chooseavatar="updataAvatar"><image class="avatar" :src="store.basicInfo.avatar" mode="aspectFit"></image></button>
				</view>

				<view class="user-detail">
					<text class="nickname" v-if="store.datalist.length === 0" @click="getUserInfo">{{ store.basicInfo.nickname }}</text>
					<input type="nickname" v-if="store.datalist.length > 0" class="nickname" :value="store.basicInfo.nickname" @blur="updataNickName" />
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
					<text class="number">{{ budget || '0.00' }}</text>
					<text class="label">预算</text>
				</view>
			</view>

			<!-- 功能列表 -->
			<view class="function-list">
				<view class="function-group">
					<view class="group-title">账户管理</view>
					<view class="function-item" v-for="(item, index) in accountFunctions" :key="index" @click="item.action">
						<view class="left">
							<view class="iconfont" :class="item.icon">
								<uni-icons :type="item.icon"></uni-icons>
							</view>
							<text class="title">{{ item.title }}</text>
						</view>
						<view class="iconfont icon-arrow-right">
							<RightButtonVue></RightButtonVue>
						</view>
					</view>
				</view>

				<view class="function-group">
					<view class="group-title">系统设置</view>
					<view class="function-item" v-for="(item, index) in systemFunctions" :key="index" @click="item.action">
						<view class="left">
							<view class="iconfont" :class="item.icon">
								<uni-icons :type="item.icon"></uni-icons>
							</view>
							<text class="title">{{ item.title }}</text>
						</view>
						<view class="iconfont icon-arrow-right">
							<RightButtonVue></RightButtonVue>
						</view>
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
import { userInfoStore } from '../../stores/userinfo';
import tabbarVue from '../../components/Tabbar.vue';
import AddPopVue from '../../components/AddPop.vue';
import RightButtonVue from '../../components/RightButton.vue';
import { getNowDate } from '../../utils/get-date';
import router from '../../utils/router';
const store = userInfoStore();

const total = computed(() => {
	const { year, month } = getNowDate();
	const date = [year, month].join('-');
	return store.getTotal(date);
});
const budget = computed(() => {
	const budget_categories = store.basicInfo.budget_categories || [];
	const budget_total = store.basicInfo.budget_total;
	return (
		Number(budget_total) +
		budget_categories.reduce((prev, cur) => {
			return (prev += Number(cur.budget));
		}, 0)
	);
});

// 账户管理功能列表
const accountFunctions = reactive([
	{
		title: '预算管理',
		icon: 'wallet',
		action: () => router.navigateTo({ url: '/pages/budget/index' })
	},
	{
		title: '标签管理',
		icon: 'list',
		action: () => handleLabel()
	},
	{
		title: '账单导出',
		icon: 'cloud-upload',
		action: () => handleExport()
	}
]);

// 系统设置功能列表
const systemFunctions = reactive([
	{
		title: '主题设置',
		icon: 'color',
		action: () => handleTheme()
	},
	{
		title: '消息通知',
		icon: 'notification',
		action: () => handleNotification()
	},
	{
		title: '关于我们',
		icon: 'fire',
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
			title: '授权登录',
			content: '允许通过code获取openid和用户匿名信息登录',
			success: async (res) => {
				if (res.confirm) {
					await store.login();
				}
			}
		});
	} catch (err) {
		uni.showToast({
			icon: 'none',
			title: '登录失败'
		});
		throw new Error(err);
	}
};

const updataNickName = async (e) => {
	try {
		const newNmae = e.detail.value;
		const res = await store.updataUser({ nickName: newNmae });
		if (res.errCode === 0) {
			uni.showToast({
				icon: 'none',
				title: res.msg
			});
		}
	} catch (error) {
		uni.showToast({
			icon: 'none',
			title: '修改失败'
		});
		throw new Error(error);
	}
};
const updataAvatar = async (e) => {
	try {
		const avatar = e.detail.avatarUrl;
		const baseUrl = 'https://env-00jxtfjq2ym4.normal.cloudstatic.cn/'
		const { _id } = uni.getStorageSync('userinfo');
		const path = `avatarImage/${_id}/avatar${getNowDate().timeStamp}.jpg`
		await uniCloud.uploadFile({
			filePath: avatar,
			cloudPath: path,
			cloudPathAsRealPath: true
		});
		const avatarUrl = baseUrl+path
		const res = await store.updataUser({ avatarUrl: avatarUrl });
		if (res.errCode === 0) {
			uni.showToast({
				icon: 'none',
				title: res.msg
			});
		}
	} catch (error) {
		uni.showToast({
			icon: 'none',
			title: '修改失败'
		});
		throw new Error(error);
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
			.avatar-btn {
				width: 120rpx;
				height: 120rpx;
				border-radius: 60rpx;
				border: 4rpx solid rgba(255, 255, 255, 0.8);
				background-color: $blue-med;
				position: relative;
				overflow: hidden;
				.avatar {
					width: 120rpx;
					height: 120rpx;
					position: absolute;
					top: 0;
					left: 0;
				}
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
							margin-right: 20rpx;
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
		position: fixed;
		bottom: 0;
	}
}
</style>
