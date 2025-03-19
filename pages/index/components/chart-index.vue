<template>
	<view class="chart">
		<view class="title">
			<text style="font-size: 20rpx;color: #909090;font-weight: 600;">{{'3月支出'}}</text>
			<text style="font-size: 46rpx;letter-spacing: 1rpx;color:#de6ea6;margin-left: 20rpx;">{{"-"+total}}</text>
			<text style="font-size: 18rpx;color: #00B6E6;">{{'平均值：'+(total/7).toFixed(2)}}</text>
		</view>
		<view style="position: absolute;right: 20rpx;top: 20rpx;">
			<RightButton></RightButton>
		</view>
		<!-- 首页折线图 -->
		<canvas canvas-id="barChart" class="barChart" ></canvas>
	</view>
</template>

<script setup>
import { computed, getCurrentInstance, onMounted, ref } from 'vue';
import RightButton from '../../../components/RightButton.vue';
import { init } from '../../../utils/chartIndex';
import { userInfoStore } from '../../../stores/userinfo';
onMounted(()=>{
	const instance = getCurrentInstance()
	init(instance,chartData.value,'.barChart','barChart')
})

const store = userInfoStore()
// 截取最后七天数据
const chartData = computed(()=>{
	return [...store.datalist]
	.slice(-7)
	.map(item => ({
		date:item.date,
		expense:store.getTotalDay(item.date).expense
	}))
})

const total = computed(()=>chartData.value.reduce((acc,{expense}) => acc+expense,0)) //七天总支出




</script>

<style lang="scss">
	.chart{
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		background-color: #fff;
		box-shadow: 0rpx 6rpx 28rpx 0rpx rgba(0, 0, 0, 0.1);
		border-radius: 30rpx;
		padding:0 15rpx 15rpx;
		position: relative;
		.title{
			position: absolute;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: left;
			color: #282C35;
			top: 20px;
			left: 10px;
		}
		.barChart{
			width: 100%;
			height: 100%;
		}
	}
</style>