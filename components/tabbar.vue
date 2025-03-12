<template>
	<view class="tabbar">
		<view class="bottomBtn" v-for="(item,index) in btnInfo" :key="index" @click="navigation(item.status)">
			<u-icon :name="item.uncheck" size="32" :color="judgeStatus(item.status)"></u-icon>
			<text :style="{color:judgeStatus(item.status)}">{{item.title}}</text>
		</view>
		<view class="addbtn">
			<u-icon name="plus" size="34" color="#fff"></u-icon>
		</view>
	</view>
</template>

<script setup>
	import { tabBarStore } from '../stores/tabbar';
	const btnInfo = [
		{title:'首页',uncheck:'home',check:'home-filled',status:0},
		{title:'账单',uncheck:'map',check:'map-filled',status:1},
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
	.tabbar{ 
		width: 100%;
		height: 100%;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 15rpx 0 0 0;
		position: relative;
		.addbtn{
			background-color: #00B6E6;
			width: 15%;
			aspect-ratio: 1/1;
			position: absolute;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50%;
			top:0;
			left: 50%;
			transform: translate(-50%,-50%);
		}
		.bottomBtn{
			width: 22%;
			display: flex;
			flex-direction: column;
			justify-content: start;
			align-items: center;
			
		}
		.bottomBtn:nth-child(3){
			margin-left: auto;
		}
	}
</style>