<template>
	<view class="chart">
		<view class="title">
			<text style="font-size: 20rpx;">{{'总支出：'+total}}</text>
			<text style="font-size: 18rpx;">{{'平均值：'+(total/7).toFixed(2)}}</text>
		</view>
		<canvas canvas-id="barChart" class="barChart"></canvas>
	</view>
</template>

<script setup>
import { computed, getCurrentInstance, onMounted, ref } from 'vue';
import { init } from '../../../utils/chartIndex';
import { userInfoStore } from '../../../stores/userinfo';
onMounted(()=>{
	const instance = getCurrentInstance()
	init(instance,chartData.value)
})

const store = userInfoStore()

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