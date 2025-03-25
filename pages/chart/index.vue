<template>
	<view class="container">
		<view class="contents">
			<view v-for="(item,index) in chartList" :key="index" :style="{height:item.height}">
				<panelVue :title="item.title" :interval="item.interval">
					<template slot="chart">
						<pieChartVue v-if="index===0"></pieChartVue>
						<lineChartVue v-if="index===1"></lineChartVue>
						<barChartVue v-if="index===2"></barChartVue>
					</template>
				</panelVue>
			</view>
		</view>
		<view class="tabbar">
			<tabbarVue></tabbarVue>
		</view>
	</view>
	<!-- 添加按钮弹出框 -->
	<AddPopVue></AddPopVue>
</template>

<script setup>
	import tabbarVue from '../../components/tabbar.vue';
	import panelVue from './components/panel.vue';
	import pieChartVue from './components/pieChart.vue';
	import lineChartVue from './components/lineChart.vue';
	import barChartVue from './components/barChart.vue'
	import {chartInterval} from '../../stores/chartinterval'
	import AddPopVue from '../../components/AddPop.vue';

	const {status} = chartInterval()
	const chartList = [
		{
			title:'分类统计',
			component:pieChartVue,
			interval:status.pieChart,
			height:'30%'
		},
		{
			title:'日趋势',
			component:lineChartVue,
			interval:status.lineChart,
			height:'25%'
			
		},
		{
			title:'月度收支',
			component:barChartVue,
			interval:status.barChart,
			height:'25%'
		}
	]

</script>

<style lang="scss" scoped>
	@mixin black-border {
		border: 1rpx solid black;
	}
	@mixin flex-center {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.container{
		width: 100%;
		height:100vh;
		display: flex;
		position: relative;
		flex-direction: column;
		background-color: #F2F6F9;
		.contents{
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: start;
			padding: 20rpx;
			view{
				width: 100%;
				margin-top: 20rpx;
			}
		}
		.tabbar{
			width: 100%;
			height: 8%;
			position: absolute;
			bottom: 0;
		}
	}
</style>
