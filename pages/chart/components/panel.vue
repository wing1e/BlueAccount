<template>
	<view class="container">
		<view class="header">
			<text style="font-size: 28rpx;font-weight: 600;letter-spacing: 2rpx;">{{props.title}}</text>
			<view class="count">
				<text >{{"-"+data.amount.expense}}</text>
				<text>{{formatDate(data.date)}}</text>
			</view>
			<view class="btn" @click="toAnalysis">
				<RightButtonVue></RightButtonVue>
			</view>
		</view>
		<view class="chart">
			<slot name="chart"></slot>
		</view>
	</view>
</template>

<script setup>
import { computed } from 'vue';
import RightButtonVue from '../../../components/RightButton.vue';
import { userInfoStore } from '../../../stores/userinfo';
import { formatDate } from '../../../utils/format';
import { panelinfoStore } from '../../../stores/panelinfo';



	const {getTotal} = userInfoStore()
	const panelinfo = panelinfoStore()
	const props = defineProps({
		title:String
	})
	const data = computed(()=>{
		const panelDate = panelinfo.getPanelInfo(props.title).date
		return {date:panelDate,amount:getTotal(panelDate)}
	})
	
	const toAnalysis = () =>{
		uni.navigateTo({
			url:`/pages/analysis/index?title=${props.title}`
		})
	}
	
	
	

</script>

<style lang="scss" scoped>
	.container{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		padding: 20rpx;
		background-color: $bg-color-white;
		border-radius: 20rpx;
		filter: $shadow;
		.header{
			width: 100%;
			height: 20%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: start;
			position: relative;
			.count{
				font-size: 21rpx;
				color: #8B97A9;
				text{
					margin-right: 15rpx;
				}
			}
			.btn{
				position: absolute;
				right: 0;
				top: 0;
				
			}
		}
		.chart{
			width: 100%;
			height: 100%;
			display: flex;
		}
		
	}
</style>