<template>
	<view class="list">
		<view class="date-list" v-if="handleSort(props.filterData.order).key === 'date'">
			<view class="date-item" v-for="(item, index) in listData" :key="index">
				<text style="font-size: 26rpx; color: #a3b2c6; margin-left: 20rpx" v-if="item.records[0]">{{ formatDate(item.date) + ' &nbsp; ' + item.weekday }}</text>
				<view class="item" v-if="item.records[0]">
					<view class="records" v-for="(record, i) in item.records" :key="i">
						<uni-icons type="smallcircle-filled" size="8" color="#FE5D20"></uni-icons>
						<view class="left-word">
							<text style="letter-spacing: 2rpx; font-weight: 600">{{ record.category }}</text>
							<view style="font-size: 18rpx; color: #5c6470">
								<text>{{ record.time }}</text>
								<text v-if="record.note">{{ ' &nbsp; · &nbsp; ' + record.note }}</text>
							</view>
						</view>
						<text class="total" style="font-weight: 600">
							{{ record.type === 'income' ? record.amount : '-' + record.amount }}
						</text>
					</view>
				</view>
			</view>
		</view>
		<view class="amount-list" v-if="handleSort(props.filterData.order).key === 'amount'">
			<view class="amount-item" v-for="(item, index) in listData" :key="index">
				<uni-icons type="smallcircle-filled" size="8" color="#FE5D20"></uni-icons>
				<view class="left-word">
					<text style="letter-spacing: 2rpx; font-weight: 600">{{ item.category }}</text>
					<view style="font-size: 18rpx; color: #5c6470">
						<text>{{ item.date }}</text>
						<text v-if="item.note">{{ ' &nbsp; · &nbsp; ' + item.note }}</text>
					</view>
				</view>
				<text class="total" style="font-weight: 600">
					{{ item.type === 'income' ? item.amount : '-' + item.amount }}
				</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { computed } from 'vue';
import { formatDate } from '../../../utils/format.js';
import { userInfoStore } from '../../../stores/userinfo.js';

const props = defineProps(['filterData']);

// 获取数据
const { getPartData } = userInfoStore();

const listData = computed(() => {
	const { date, order } = props.filterData;
	const { key, order: sortOrder } = handleSort(order);
	const origin = getPartData(date).filter((item) => item?.records && Array.isArray(item.records) && item?.records.length > 0);
	if (key === 'date') {
		const sortByDate = [...origin].sort((a, b) => {
			const dateA = new Date(a.date).getTime();
			const dateB = new Date(b.date).getTime();
			return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
		});
		// 按时间排序
		return sortByDate.map((item) => {
			item.records = item.records.sort((a, b) => {
				const dateA = new Date(`${item.date} ${a.time}`).getTime();
				const dateB = new Date(`${item.date} ${b.time}`).getTime();
				return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
			});
			return item;
		});
	} else if (key === 'amount') {
		// 按金额排序
		const newData = [];
		origin.forEach((item) => {
			item.records.forEach((record) => {
				newData.push({ date: item.date, ...record });
			});
		});
		const a = newData.sort((a, b) => {
			const amountA = a.amount;
			const amountB = b.amount;
			return sortOrder === 'asc' ? amountA - amountB : amountB - amountA;
		});
		console.log(a);
		return a;
	}
	return origin;
});

const handleSort = (orderIndex) => {
	const sortType = [
		{ key: 'date', order: 'desc' },
		{ key: 'date', order: 'asc' },
		{ key: 'amount', order: 'desc' },
		{ key: 'amount', order: 'asc' }
	];

	return sortType[orderIndex];
};
</script>

<style lang="scss" scoped>
	$title-size:28rpx;
	$option-height:120rpx;
	@mixin options-layout {
		width: 100%;
		height: $option-height;
		box-sizing: border-box;
		padding: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 20rpx;

	}
	@mixin option-left {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
		font-size: $title-size;
		margin-right: auto;
		margin-left: 20rpx;
	}
.list {
	width: 100%;
	height: 100%;
	.date-list,
	.amount-list {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.date-list {
		.date-item {
			width: 100%;
			margin-top: 20rpx;
			.item {
				width: 100%;
				background-color: #fff;
				filter: drop-shadow(1rpx 2rpx 5rpx rgba(0, 0, 0, 0.1));
				border-radius: 20rpx;
				.records {
					@include options-layout;
					.left-word {
						@include option-left;
					}
				}
			}
		}
	}
	.amount-list {
		.amount-item {
			background-color: #fff;
			filter: drop-shadow(1rpx 2rpx 5rpx rgba(0, 0, 0, 0.1));
			border-radius: 20rpx;
			@include options-layout;
			.left-word {
				@include option-left;
			}
		}
	}
}
</style>
