<template>
	<view class="index">
		<view class="head">
			<indexChartVue></indexChartVue>
		</view>
		
		<view class="list" >
			<listVue></listVue>
		</view>
		<view class="tabbar">
			<TabbarVue></TabbarVue>
		</view>
	</view>
	<!-- 添加按钮弹出框 -->
	<AddPopVue></AddPopVue>
</template>

<script setup>
import { computed, getCurrentInstance, onMounted, ref } from 'vue';
import indexChartVue from './components/indexChart.vue'; 
import listVue from './components/list.vue';
import TabbarVue from '../../components/Tabbar.vue';
import AddPopVue from '../../components/AddPop.vue';
import { userInfoStore } from '../../stores/userinfo';
import { getNodeInfo } from '../../utils/node-info';
onMounted(()=>{
	fillData
})
const {fillData} = userInfoStore()



</script>

<style lang="scss" scoped>
	.index {
		width: 100%;
		height:100vh;
		display: flex;
		flex-direction: column;
		position: relative;
		.head {
			width: 100%;
			height: 30%;
			box-sizing: border-box;
			padding: 20rpx;
			background:linear-gradient(to bottom,#0039A4 50%,#fff 50%);
		}
		
		.list{
			width: 100%;
			height:70%;
		}
		.tabbar{
			width: 100%;
			height: 8%;
			position: absolute;
			bottom: 0;
		}
		
	}
</style>