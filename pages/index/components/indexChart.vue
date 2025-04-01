<template>
	<view class="chart">
		<view class="title">
			<text style="font-size: 20rpx;color: #909090;font-weight: 600;">{{title}}</text>
			<text style="font-size: 46rpx;letter-spacing: 1rpx;color:#de6ea6;margin-left: 20rpx;">{{"-"+total}}</text>
			<text style="font-size: 18rpx;color: #00B6E6;">{{'平均值：'+(total/7).toFixed(2)}}</text>
		</view>
		<view style="position: absolute;right: 20rpx;top: 20rpx;">
			<RightButton></RightButton>
		</view>
		<!-- 首页折线图 -->
		<canvas :canvas-id="canvasInfo.id" :class="canvasInfo.className" ></canvas>
	</view>
</template>

<script setup >
import { computed, getCurrentInstance, onMounted, ref, watch } from 'vue';
import RightButton from '../../../components/RightButton.vue';
import { indexChartInit } from '../../../utils/chart/line-chart.js';
import { userInfoStore } from '../../../stores/userinfo.js';
import { getNowDate } from '../../../utils/get-date.js';
import {storeToRefs} from 'pinia'
onMounted(()=>{
	indexChartInit(instance,chartData.value,canvasInfo.className,canvasInfo.id)
})

const canvasInfo = {className:'.barChart',id:'indexChart'}
const store =  userInfoStore()
// 截取最后七天数据
const chartData = computed(()=>{
	return [...store.datalist]
	.slice(-7)
	.map(item => ({
		date:item.date,
		expense:store.getTotal(item.date).expense
	}))
})
const title = String(getNowDate().month)+"月支出"

const total = computed(()=>chartData.value.reduce((acc,{expense}) => acc + expense,0)) //七天总支出

const instance = getCurrentInstance();

// 监听 chartData 的变化
watch(chartData, (newData) => {
    indexChartInit(instance, newData, canvasInfo.className, canvasInfo.id);
}, { deep: true });



</script>

<style lang="scss" scoped>
	.chart{
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		position: relative;
		background-color: #fff;
		box-shadow: 0rpx 6rpx 28rpx 0rpx rgba(0, 0, 0, 0.1);
		border-radius: 30rpx;
		padding:20rpx;
		.title{
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