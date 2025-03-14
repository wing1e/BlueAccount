<template>
	<view class="chart">
		<canvas canvas-id="barChart" class="barChart"></canvas>
	</view>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from 'vue';
import { init } from '../../../utils/chartIndex';
onMounted(()=>{
	const instance = getCurrentInstance()
	init(instance)
})




</script>

<style lang="scss">
	.chart{
		width: 100%;
		height: 100%;
		background-color: #fff;
		box-shadow: 0rpx 6rpx 28rpx 0rpx rgba(0, 0, 0, 0.1);
		border-radius: 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		.barChart{
			width: 95%;
			height: 90%;
		}
	}
</style>