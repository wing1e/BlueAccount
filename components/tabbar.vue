<template>
	<view class="container">
		<view class="tabbar">
			<view class="btns">
				<view class="bottomBtn" v-for="(item, index) in btnInfo" :key="index" @click="navigation(item.status)">
					<u-icon class="icon" :name="changeIcon(item).icon" size="30" :color="changeIcon(item).color"></u-icon>
				</view>
			</view>
			<!-- 添加按钮的半圆形边框 -->
			<view class="addbtn">
				<view class="cir"></view>
			</view>
			<!-- 添加按钮 -->
			<view class="icon_add" @click="open">
				<uni-icons type="plusempty" size="30" color="#fff"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script setup>
import { tabBarStore } from '../stores/tabbar';
import router from '../utils/router';
const tabstore = tabBarStore();
const btnInfo = [
	{ title: '首页', uncheck: 'home', check: 'home-fill', status: 0 },
	{ title: '图表', uncheck: 'order', check: 'order', status: 1 },
	{ title: '账单', uncheck: 'rmb-circle', check: 'rmb-circle-fill', status: 2 },
	{ title: '我的', uncheck: 'account', check: 'account-fill', status: 3 }
];

// 改变颜色
const changeIcon = (item) => {
	if (item.status === tabstore.status) {
		return { color: '#0039A4', icon: item.check };
	}
	return { color: '#8B97A9', icon: item.uncheck };
};

// [status,'页面路径']
const navigationMap = new Map([
	[0, '/pages/index/index'],
	[1, '/pages/chart/index'],
	[2, '/pages/bill/index'],
	[3, '/pages/mypage/index']
]);

// 路由
const navigation = (status) => {
	if (status === tabstore.status) return;
	tabstore.setPup(false)
	tabstore.setStatus(status)
	router.switchTab({url:navigationMap.get(status)})
};

const open = () => {
	tabstore.setPup(true);
};
</script>

<style lang="scss" scoped>
@mixin flex-center {
	display: flex;
	justify-content: center;
	align-items: center;
}
.container {
	width: 100%;
	height: 120rpx;
	display: flex;
	align-items: start;
	justify-content: center;
	.tabbar {
		box-sizing: border-box;
		background-color: $bg-color-white;
		width: 95%;
		height: 75%;
		border-radius: 30rpx;
		filter: $shadow;
		display: flex;
		justify-content: space-between;
		position: relative;
		.addbtn {
			width: 100rpx;
			height: 50rpx;
			box-sizing: border-box;
			overflow: hidden;
			position: absolute;
			transform: translate(-50%, -100%);
			left: 50%;
			top: 0;
			.cir {
				background-color: #fff;
				width: 100rpx;
				aspect-ratio: 1/1;
				border-radius: 50%;
				box-sizing: border-box;
				border: #e5e9ea 3rpx solid;
			}
		}
		.icon_add {
			@include flex-center;
			box-sizing: border-box;
			background-color: #00b6e6;
			width: 80rpx;
			aspect-ratio: 1/1;
			border-radius: 50%;
			position: absolute;
			transform: translate(-50%, -50%);
			left: 50%;
			top: 0;
		}
		.btns {
			width: 100%;
			height: 100%;
			@include flex-center;
			.bottomBtn {
				width: 22%;
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}
		}

		.bottomBtn:nth-child(3) {
			margin-left: auto;
		}
	}
}
</style>
