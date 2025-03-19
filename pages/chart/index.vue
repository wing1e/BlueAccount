<template>
	<view class="chart">
		<view class="contents">
			<!-- 饼状图 -->
			<view class="pie-chart">
				1
			</view>
			<!-- 折线图 -->
			<view class="line-chart">
				2
			</view>
			<!-- 柱状图 -->
			<view class="bar-chart">
				3
			</view>
		</view>
		<view class="tabbar">
			<tabbarVue></tabbarVue>
		</view>
		
	</view>
</template>

<script setup>
	import tabbarVue from '../../components/tabbar.vue';
</script>

<style lang="scss">
	@mixin black-border {
		border: 1rpx solid black;
	}
	@mixin flex-center {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.chart{
		width: 100%;
		height:100vh;
		display: flex;
		flex-direction: column;
		.contents{
			@include black-border;
			width: 100%;
			height: 93%;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: start;
			padding: 20rpx;
			view{
				width: 100%;
				margin-top: 20rpx;
				background-color: rosybrown;
			}
		}
		.tabbar{
			width: 100%;
			height: 7%;
		}
	}
</style>
