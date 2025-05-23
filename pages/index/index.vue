<template>
	<view class="index">
		<view class="head">
			<indexChartVue v-if="isShow"></indexChartVue>
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
import {onShow,onHide} from '@dcloudio/uni-app'
import indexChartVue from './components/indexChart.vue'; 
import listVue from './components/list.vue';
import TabbarVue from '../../components/Tabbar.vue';
import AddPopVue from '../../components/AddPop.vue';
import { ref } from 'vue';

onShow(()=>{
	isShow.value = true
})
onHide(()=>{
	isShow.value = false
})
const isShow = ref(false)

</script>

<style lang="scss" scoped>
	.index {
		width: 100%;
		height:100vh;
		display: flex;
		flex-direction: column;
		position: relative;
		background-color: $bg-color-grey;
		.head {
			width: 100%;
			height: 30%;
			box-sizing: border-box;
			padding: 0 30rpx;
			background:linear-gradient(to bottom,#003498 50%,#f2f6f9 50%);
		}
		
		.list{
			width: 100%;
			height:62%;
			box-sizing: border-box;
			padding:30rpx;
		}
		.tabbar{
			width: 100%;
			height: 8%;
			position: absolute;
			bottom: 0;
		}
		
	}
</style>