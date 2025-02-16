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
	</view>
</template>

<script setup>

</script>

<style lang="scss" scoped>
	.index {
		width: 750rpx;
		height:100vh;
		display: flex;
		flex-direction: column;
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
	}
</style>