<template>
	<view class="index">
		<view class="head">
			<chartIndexVue></chartIndexVue>
		</view>
		
		<view class="list" >
			<list-index-vue></list-index-vue>
		</view>
		<view class="tabbar">
			<tabbarVue></tabbarVue>
		</view>
	</view>
</template>

<script setup>
import { computed, getCurrentInstance, onMounted, ref } from 'vue';
import chartIndexVue from './components/chart-index.vue';
import listIndexVue from './components/list-index.vue';
import tabbarVue from '../../components/tabbar.vue';
import { getNodeInfo } from '../../utils/getnodeinfo';
import { userInfoStore } from '../../stores/userinfo';

const {getLastData,getTotalDay} = userInfoStore()

const total = computed(()=>{
	const lastDate = getLastData.date
	const {expense} = getTotalDay(lastDate)
	return expense
})


// 解析日期
const parseDateString = (dateStr) =>{
	const parts = dateStr.split(/[-/]/)
	if(parts.length !==3){
		throw new Error('无效的日期格式')
	}
	return {
		year:parseInt(parts[0],10),
		month:parseInt(parts[1],10),
		day:parseInt(parts[2],10)
	}

}


</script>

<style lang="scss">
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