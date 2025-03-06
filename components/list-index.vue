<template>
	<view class="list">
		<view class="detail">
			<view class="list-scroll">
				<view class="list-item">
					<view class="list" v-for="(value,key) in data" :key="key">
						<view class="item-data">
							{{value.date}}
						</view>
						<view class="items">
							<view class="item" v-for="(item,i) in  value.records" :key="i">
								<view class="divider" v-if="i!==0">
									
								</view>
								<view class="icon">
									<image src="/static/index-Icon/wallet.png" mode="aspectFit"></image>
								</view>
								<view class="detail">
									<view class="type">
										{{item.type}}
									</view>
									<view class="note">
										{{item.note}}
									</view>
								</view>
								<view class="expense">
									{{item.amount}}
								</view>
							</view>
						</view>
						
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { reactive, ref } from 'vue';

	const prop = defineProps(['indexH'])
	
	const data = reactive([
    {
      "date": "2023-03-15",
      "weekday": "周三",
      "records": [
        {
          "time": "08:15:00",
          "type": "income",
          "category": "工资",
          "amount": 23580.00,
          "payment": "银行转账",
          "note": "三月工资到账",
          "status": "completed"
        },
        {
          "time": "12:30:00",
          "type": "expense",
          "category": "餐饮",
          "amount": 38.50,
          "payment": "支付宝-余额",
          "note": "午餐-麦当劳套餐",
          "status": "completed"
        },
        {
          "time": "19:45:00",
          "type": "expense",
          "category": "服装",
          "amount": 299.00,
          "payment": "微信支付-零钱",
          "note": "优衣库春季衬衫",
          "status": "completed"
        }
      ]
    },
    {
      "date": "2023-03-16",
      "weekday": "周四",
      "records": [
        {
          "time": "09:00:00",
          "type": "expense",
          "category": "餐饮",
          "amount": 8.50,
          "payment": "校园卡",
          "note": "食堂早餐",
          "status": "pending"
        },
        {
          "time": "17:20:00",
          "type": "income",
          "category": "兼职",
          "amount": 1500.00,
          "payment": "现金",
          "note": "家教课时费",
          "status": "completed"
        }
      ]
    },
    {
      "date": "2023-03-17",
      "weekday": "周五",
      "records": [
        {
          "time": "10:00:00",
          "type": "expense",
          "category": "交通",
          "amount": 150.00,
          "payment": "滴滴出行-企业账户",
          "note": "机场快车",
          "status": "refunded"
        },
        {
          "time": "22:15:00",
          "type": "expense",
          "category": "娱乐",
          "amount": 89.00,
          "payment": "美团-信用支付",
          "note": "深夜电影院",
          "status": "completed"
        }
      ]
    }
  ])
	
	
	
	
</script>

<style lang="scss">
	.list{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #F2F6F9;
		padding: 30rpx 10rpx 5rpx;
		.detail{
			width: 100%;
			height: 100%;
		
			.list-scroll{
				width: 100%;
				height: 100%;
				overflow: auto;
				.list-item{
					.list{
						padding: 10rpx;
						display: flex;
						flex-direction: row;
						
						.item-data{
							width:10% ;
						}
						.items{
							background-color: #fff;
							width: 90%;
							display: flex;
							flex-direction: column;
							border-radius: 20rpx;
							.item{
								display: flex;
								align-items: center;
								justify-content: center;
								height: 120rpx;
								position: relative;
								.divider{
									width: 90%;
									height: 3rpx;
									position: absolute;
									background-color: #F2F6F9;
									top: 0;
								}
								.icon{
									width: 15%;
									height: 100%;
									image{
										width: 70rpx;
										height: 70rpx;
									}
								}
								.detail{
									width: 60%;
									height: 100%;
									display: flex;
									flex-direction: column;
									align-items: start;
									justify-content: center;
									.type{
										
									}
									.note{
										
									}
								}
								.expense{
									width: 25%;
									height: 100%;
								}
							}
						}
					
					}
				}
			}
		}
	}

</style>