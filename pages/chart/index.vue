<template>
	<view class="container">
		<view class="contents">
			<view v-for="(item,index) in chartList" :key="index" :style="{height:item.height}">
				<panelVue :title="item.title">
					<template slot="chart">
						<pieChartVue v-if="index===0"></pieChartVue>
						<lineChartVue v-if="index===1"></lineChartVue>
						<barChartVue v-if="index===2"></barChartVue>
					</template>
				</panelVue>
			</view>
		</view>
		<view class="tabbar">
			<TabbarVue></TabbarVue>
		</view>
	</view>
	<!-- 添加按钮弹出框 -->
	<AddPopVue></AddPopVue>
</template>

<script setup>
	import TabbarVue from '../../components/Tabbar.vue';
	import panelVue from './components/panel.vue';
	import pieChartVue from '../../components/pieChart.vue'
	import lineChartVue from '../../components/lineChart.vue';
	import barChartVue from '../../components/barChart.vue'
	import AddPopVue from '../../components/AddPop.vue';
import { panelinfoStore } from '../../stores/panelinfo';
import { reactive } from 'vue';

	const {panelList}= panelinfoStore()
	const chartList =reactive([
		{
			...panelList[0],
			height:'30%'
		},
		{
			...panelList[1],
			height:'25%'
			
		},
		{
			...panelList[2],
			height:'25%'
		}
	]) 

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
