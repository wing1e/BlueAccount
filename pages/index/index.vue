<template>
	<view class="index">
		<view class="head">
			<view class="total">
				<view class="total-left">
					<view class="total-pic">
						<u-icon name="rmb" color="#fff"  size="26"></u-icon>
					</view>
					<view class="total-num">
						<text class="num-title">
							{{istoday()?"今日支出":"最近一天的支出"}}
						</text>
						<view class="num">
							<text>{{total}}</text>
						</view>
					</view>
				</view>
				<view class="detail-btn">
					账单记录
				</view>
			</view>
		</view>
		<view class="mychart" >
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
// 判断是不是今天
const istoday = () =>{
	const today = new Date().toLocaleDateString()
	const lastDate = getLastData.date
	try{
		const d1 = parseDateString(today)
		const d2 = parseDateString(lastDate)
		const result = d1.year === d2.year && d1.month === d2.month && d1.day === d2.day
		return result
	}catch(e){
		
		return false
	}
	
}

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

<style lang="scss" scoped>
	.index {
		width: 100%;
		height:100vh;
		display: flex;
		justify-content: end;
		flex-direction: column;
		position: relative;
		.head {
			width: 100%;
			height: 22%;
			background-color: #003498;
			.total {
				width: 100%;
				display: flex;
				justify-content: space-around;
				align-items: center;
				.total-left {
					display: flex;
					flex-direction: row;
					justify-content:space-between;
					align-items: center;
					width: 44%;

					.total-pic {
						background-color: #00B2E0;
						width: 80rpx;
						height: 80rpx;
						border-radius: 50rpx;
						border: 4rpx solid #3361B6;
						display: flex;
						justify-content: center;
						align-items: center;
						
					}
					.total-num {
						display: flex;
						flex-direction: column;
						align-items: center;
						.num-title {
							color: #fefeff;
							font-size: 28rpx;
						}
						.num {
							display: flex;
							text {
								font-size: 60rpx;
								color: white;
							}

						}

					}
				}
				.detail-btn {
					width: 26%;
					background-color: #3361B6;
					color: white;
					height: 60rpx;
					border-radius: 30rpx;
					font-size: 30rpx;
					font-weight: 400;
					line-height: 60rpx;
					text-align: center;
				}

			}
		}
		.mychart{
			box-sizing: border-box;
			width: 100%;
			height: 30%;
			padding:0 25rpx 0 25rpx;
			position: absolute;
			bottom: 55%;
		}
		.list{
			width: 100%;
			height:43%;
			margin-top: auto;
		}
		.tabbar{
			width: 100%;
			height: 12%;
		}
		
	}
</style>