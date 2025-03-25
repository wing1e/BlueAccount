<template>
	<view class="container">
		<view class="header">
			<text style="font-size: 27rpx;font-weight: 600;letter-spacing: 2rpx;">{{props.title}}</text>
			<view class="count">
				<text >{{"-"+count.expense}}</text>
				<text>{{props.interval}}</text>
			</view>
			<view class="btn">
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


	const {getTotal} = userInfoStore()
	const props = defineProps({
		title:String,
		interval:String
	})
	
	const count = computed(()=>{
		return getTotal(props.interval)
	})
	
	
	

</script>

<style lang="scss" scoped>
	.container{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		padding: 20rpx;
		background-color: #fff;
		border-radius: 20rpx;
		filter: drop-shadow( 0 1rpx 5rpx rgba(0, 0, 0, 0.1));
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
			height: 80%;
			display: flex;
		}
		
	}
</style>