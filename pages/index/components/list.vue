<template>
	<view class="list-index">
		<view class="list-head">
			<text style="font-weight: 600; font-size: 26rpx; letter-spacing: 4rpx; margin-left: 25rpx">七日交易</text>
			<uni-icons type="right" size="20" color="#00B6E6" style="margin-right: 25rpx" @click="toDetails"></uni-icons>
		</view>
		<view class="list">
			<view class="list-item" v-for="(value, key) in data" :key="key">
				<!-- 时间轴 -->
				<view class="item-data" v-if="value.records[0]">
					<view class="data-word">
						<text class="day">{{ value.date.split('-')[1] + '-' + value.date.split('-')[2] }}</text>
						<text class="year">{{ value.date.split('-')[0] + '年' }}</text>
					</view>
					<view class="data-line">
						<view class="dot"></view>
						<view class="line" v-if="key !== data.length - 1"></view>
					</view>
				</view>
				<!-- 账单明细 -->
				<view class="items">
					<view class="item" v-for="(item, i) in value.records" :key="i">
						<view class="divider" v-if="i !== 0"></view>
						<view class="detail">
							<view class="category">
								{{ item.category }}
							</view>
							<view class="note">
								{{ item.note }}
							</view>
						</view>

						<view class="amount">
							{{ item.type === 'income' ? item.amount : '-' + item.amount }}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { reactive, ref, getCurrentInstance, computed } from 'vue';
import { userInfoStore } from '../../../stores/userinfo';
import { examiner } from '../../../utils/examiner';
const { datalist } = userInfoStore();
const data = computed(() => {
	const origin = datalist.slice(-7).reverse();
	return origin.filter(item => {
		if(item.records[0]){
			return item
		}
	})
});

const toDetails = () =>{
	uni.navigateTo({
		url:'/pages/details/index'
	})
}

</script>

<style lang="scss" scoped>
@mixin flex-center {
	display: flex;
	justify-content: center;
	align-items: center;
}

.list-index {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	background-color: #f2f6f9;

	.list-head {
		height: 5%;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 3rpx solid #e5e9ea;
	}

	.list {
		width: 100%;
		height: 95%;
		padding: 0rpx 20rpx 7vh;
		box-sizing: border-box;
		overflow: auto;
		display: flex;
		flex-direction: column;

		.list-item {
			margin-top: 20rpx;
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			position: relative;

			.item-data {
				width: 15%;
				display: flex;
				flex-direction: column;
				align-items: center;
				position: absolute;
				left: 0;
				height: calc(100% + 20rpx);

				.data-word {
					display: flex;
					flex-direction: column;
					align-items: center;

					.day {
						font-weight: 800;
						font-size: 26rpx;
						color: #000;
					}

					.year {
						font-weight: 600;
						font-size: 18rpx;
						color: #909090;
					}
				}

				.data-line {
					display: flex;
					flex-direction: column;
					align-items: center;
					height: 100%;

					.dot {
						width: 20rpx;
						aspect-ratio: 1/1;
						border-radius: 20rpx;
						background-color: #00b6e6;
					}

					.line {
						border-left: 3rpx dashed #bababa;
						height: 100%;
					}
				}
			}

			.items {
				background-color: #fff;
				filter: drop-shadow(0 2rpx 4rpx rgba(0, 0, 0, 0.1));
				width: 85%;
				display: flex;
				flex-direction: column;
				border-radius: 20rpx;

				.item {
					@include flex-center;
					height: 120rpx;
					position: relative;
					padding: 20rpx;
					box-sizing: border-box;

					.divider {
						width: 90%;
						height: 3rpx;
						position: absolute;
						background-color: #f2f6f9;
						top: 0;
					}

					.detail {
						height: 100%;
						display: flex;
						flex-direction: column;
						align-items: left;
						justify-content: space-around;

						.category {
							font-size: 27rpx;
							letter-spacing: 2rpx;
						}

						.note {
							font-size: 18rpx;
							color: #8b97a9;
						}
					}

					.amount {
						display: flex;
						align-items: start;
						margin-left: auto;
						height: 100%;
					}
				}
			}
		}
	}
}
</style>
