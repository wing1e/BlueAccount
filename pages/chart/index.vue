<template>
	<view class="container">
		<view class="contents">
			<view v-for="(item, index) in chartList" :key="index" :style="{ height: item.height }">
				<panelVue :title="item.title">
					<template slot="chart">
						<pieChartVue v-if="index === 0" :isShow="isShow"></pieChartVue>
						<lineChartVue v-else-if="index === 1" :isShow="isShow"></lineChartVue>
						<barChartVue v-else-if="index === 2" :isShow="isShow"></barChartVue>
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
import pieChartVue from '../../components/pieChart.vue';
import lineChartVue from '../../components/lineChart.vue';
import barChartVue from '../../components/barChart.vue';
import AddPopVue from '../../components/AddPop.vue';
import { panelinfoStore } from '../../stores/panelinfo';
import { reactive, ref } from 'vue';
import { onShow, onHide } from '@dcloudio/uni-app';
onShow(() => {
	isShow.value = true;
});
onHide(() => {
	isShow.value = false;
});

const { panelList } = panelinfoStore();

const isShow = ref(false);

const chartList = reactive([
	{
		...panelList[0],
		height: '30%'
	},
	{
		...panelList[1],
		height: '30%'
	},
	{
		...panelList[2],
		height: '30%'
	}
]);
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
.container {
	width: 100%;
	height: 100vh;
	background-color: $bg-color-grey;
	.contents {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: start;
		padding: 0 $space 10%;
		view {
			width: 100%;
			margin-top: $space;
		}
	}
	.tabbar {
		width: 100%;
		position: fixed;
		bottom: 0;
	}
}
</style>
