<template>
	<view class="tabbar">
		<view class="bottomBtn" v-for="(item,index) in btnInfo" :key="index" @click="navigation(item.status)">
			<u-icon :name="item.uncheck" size="28" :color="judgeStatus(item.status)"></u-icon>
			<text :style="{color:judgeStatus(item.status)}">{{item.title}}</text>
		</view>
		<view class="addbtn">
			<view class="cir" ></view>
		</view>
		<view class="icon_add">
			<uni-icons type="plusempty" size="30"></uni-icons>
		</view>
	</view>
</template>

<script setup>
	import { tabBarStore } from '../stores/tabbar';
	const btnInfo = [
		{title:'首页',uncheck:'home',check:'home-filled',status:0},
		{title:'图表',uncheck:'bars',check:'bars',status:1},
		{title:'资产',uncheck:'rmb-circle',check:'rmb-circle-fill',status:2},
		{title:'我的',uncheck:'account',check:'account-fill',status:3}
	]
	
	// 判断当前页面
	const judgeStatus = (status) =>{
		if(status===tabBarStore().status){
			return '#0039A4'
		}
		return '#8B97A9'
	}
	
	// [status,'页面路径']
	const navigationMap = new Map([
		[0,'/pages/index/index'],
		[1,'/pages/contents/contents']
	])
	
	// 路由
	const navigation = (status)=>{
		if(status===tabBarStore().status) return
		uni.switchTab({
			url:navigationMap.get(status),
			success() {
				tabBarStore().status = status
			}
			
		})
	}
</script>

<style lang="scss">
	@mixin flex-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.tabbar{ 
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 10rpx 0 0 10rpx;
		border-top: 5rpx solid #b1b4b6;
		position: relative;
		.addbtn{
			width: 100rpx;
			height: 50rpx;
			box-sizing: border-box;
			overflow: hidden;
			position: absolute;
			transform: translate(-50%,-100%);
			left: 50%;
			top: 0;
			.cir{
				background-color: #fff;
				width: 100rpx;
				aspect-ratio: 1/1;
				border-radius: 50%;
				box-sizing: border-box;
				border: #b1b4b6 5rpx solid;
				
			}
		}
		.icon_add{
			@include flex-center;
			box-sizing: border-box;
			background-color: #00B6E6;
			width: 80rpx;
			aspect-ratio: 1/1;
			border-radius: 50%;
			position: absolute;
			transform: translate(-50%,-50%);
			left: 50%;
			top: 0;
		}
		.bottomBtn{
			width: 22%;
			display: flex;
			flex-direction: column;
			justify-content: start;
			align-items: center;
			font-size: 20rpx;
			
		}
		.bottomBtn:nth-child(3){
			margin-left: auto;
		}
	}
</style>