<template>
	<view class="index">
		<view class="head">
			<view class="total">
				<view class="total-left">
					<view class="total-pic">
						<image src="/static/index-Icon/wallet.png" mode="aspectFill"></image>
					</view>
					<view class="total-num">
						<text class="num-title">
							支出
						</text>
						<view class="num">
							<image src="/static/index-Icon/money.png" mode="aspectFill"></image>
							<text>12,345</text>
						</view>
					</view>
				</view>
				<view class="detail-btn">
					明细
				</view>
			</view>
		</view>
		<view class="mychart" >
			<chartIndexVue></chartIndexVue>
		</view>
		<view class="list" >
			<list-index-vue :indexH="indexH"></list-index-vue>
		</view>
		<view class="bnb">
			<BottomNavigationBarVue></BottomNavigationBarVue>
		</view>
	</view>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from 'vue';
import chartIndexVue from '../../components/chart-index.vue';
import listIndexVue from '../../components/list-index.vue';
import BottomNavigationBarVue from '../../components/BottomNavigationBar.vue';
onMounted(()=>{
	getInfo()
})


const indexH = ref()
const getInfo = ()=>{
	const instance = getCurrentInstance()
	const query = uni.createSelectorQuery().in(instance)
	query.select('.index')
	.boundingClientRect((data)=>{
		indexH.value = data.height
		console.log(indexH.value);
	})
	.exec()
}

</script>

<style lang="scss" scoped>
	.index {
		width: 750rpx;
		height:100vh;
		display: flex;
		justify-content: end;
		flex-direction: column;
		position: static;
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
						image {
							width: 50%;
							height: 50%;
						}
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
							image {
								width: 15rpx;
								height: 25rpx;
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
			top: 12%;
		}
		.list{
			width: 100%;
			height:43%;
			position: absolute;
			top: 45%;
		}
		.bnb{
			width: 100%;
			height: 12%;
			position: absolute;
			bottom: 0;
		}
		
	}
</style>