<template>
	<view class="index">
		<view class="head">
			<indexChartVue></indexChartVue>
		</view>
		
		<view class="list" >
			<listVue></listVue>
		</view>
		<view class="tabbar">
			<tabbarVue></tabbarVue>
		</view>
	</view>
</template>

<script setup>
import { computed, getCurrentInstance, onMounted, ref } from 'vue';
import indexChartVue from './components/indexChart.vue'; 
import listVue from './components/list.vue';
import tabbarVue from '../../components/tabbar.vue';
import { userInfoStore } from '../../stores/userinfo';
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
			height:63%;
		}
		.tabbar{
			width: 100%;
			height: 7%;
		}
		
	}
</style>