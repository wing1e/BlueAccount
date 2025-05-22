<template>
	<view class="list">
		<!-- 日期排序列表 -->
		<view class="date-list" v-if="handleSort(props.filterData.order).key === 'date'">
			<view class="date-item" v-for="(item, index) in listData" :key="index">
				<text class="date-title" v-if="item.records[0]">{{ formatDate(item.date) + ' &nbsp; ' + item.weekday }}</text>
				<view class="item" v-if="item.records[0]">
					<view class="records" v-for="(record, i) in item.records" :key="i"  @click="openPop({date:item.date,...record})" @longpress="del">
						<uni-icons type="smallcircle-filled" size="10" :color="record.type === 'income' ? '#00B26A' : '#FE5D20'"></uni-icons>
						<view class="left-word">
							<text class="category">{{ record.category }}</text>
							<view class="info">
								<text>{{ record.time }}</text>
								<text v-if="record.note">{{ ' &nbsp; · &nbsp; ' + record.note }}</text>
							</view>
						</view>
						<text class="total" :style="{ color: record.type === 'income' ? '#00B26A' : '#000' }">
							{{ record.type === 'income' ? record.amount : '-' + record.amount }}
						</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 金额排序列表 -->
		<view class="amount-list" v-if="handleSort(props.filterData.order).key === 'amount'">
			<view class="amount-item" v-for="(item, index) in listData" :key="index">
				<uni-icons type="smallcircle-filled" size="10" color="#FE5D20"></uni-icons>
				<view class="left-word">
					<text class="category">{{ item.category }}</text>
					<view class="info">
						<text>{{ item.date }}</text>
						<text v-if="item.note">{{ ' &nbsp; · &nbsp; ' + item.note }}</text>
					</view>
				</view>
				<text class="total" :style="{ color: item.type === 'income' ? '#00B26A' : '#000' }">
					{{ item.type === 'income' ? item.amount : '-' + item.amount }}
				</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { computed, ref } from 'vue';
import { formatDate } from '../../../utils/format.js';
import { userInfoStore } from '../../../stores/userinfo.js';
import { editStore } from '../../../stores/edit.js';

const props = defineProps(['filterData']);

// 获取数据
const store = userInfoStore();

// 列表数据
const listData = computed(() => {
	const { date, order } = props.filterData;
	const { key, order: sortOrder } = handleSort(order);
	const origin = JSON.parse(JSON.stringify(store.getPartData(date))).filter((item) => item?.records && Array.isArray(item.records) && item?.records.length > 0); //深拷贝防止修改state
	// 按时间排序
	if (key === 'date') {
		// 先按日期排序
		const sortByDate = origin.sort((a, b) => {
			const dateA = new Date(a.date).getTime();
			const dateB = new Date(b.date).getTime();
			return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
		});
		// 按时间排序
		const sortByTime = sortByDate.map((item) => {
			item.records.sort((a, b) => {
				const dateA = new Date(`${item.date}T${a.time}`).getTime();
				const dateB = new Date(`${item.date}T${b.time}`).getTime();
				return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
			});
			return item;
		});
		return sortByTime;
		// 按金额排序
	} else if (key === 'amount') {
		const newData = [];
		[...origin].forEach((item) => {
			item.records.forEach((record) => {
				newData.push({ date: item.date, ...record });
			});
		});
		return newData.sort((a, b) => {
			const amountA = a.amount;
			const amountB = b.amount;
			return sortOrder === 'asc' ? amountA - amountB : amountB - amountA;
		});
	}
	return origin;
});

//排序处理
const handleSort = (orderIndex) => {
	const sortType = [
		{ key: 'date', order: 'desc' },
		{ key: 'date', order: 'asc' },
		{ key: 'amount', order: 'desc' },
		{ key: 'amount', order: 'asc' }
	];

	return sortType[orderIndex];
};
const edit = editStore()
const openPop =(data) => {
	console.log(data);
	edit.setData(data)
	edit.setPop(true);
};

</script>

<style lang="scss" scoped>
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
			font-size: $text-size-title;
			overflow-y: auto;
			.date-title {
				width: 100%;
				display: flex;
				box-sizing: border-box;
				padding: 10rpx 30rpx;
				font-size: $text-size-med;
				color: $text-color-light-grey;
			}
			.item {
				width: 100%;
				background-color: $bg-color-white;
				filter: $shadow;
				border-radius: 20rpx;
				.records {
					@include row-layout;
					.left-word {
						@include row-left;
						.category {
							font-size: $text-size-title;
							letter-spacing: 2rpx;
							font-weight: 600;
						}
						.info {
							font-size: $text-size-sm;
							color: $text-color-dark-grey;
						}
					}
					.total {
						font-size: $text-size-title;
						font-weight: 600;
					}
				}
			}
		}
	}
	.amount-list {
		margin-top: 30rpx;
		border-radius: 20rpx;
		filter: $shadow;
		background-color: #fff;
		.amount-item {
			@include row-layout;
			.left-word {
				@include row-left;
				.category {
					font-size: $text-size-title;
					letter-spacing: 2rpx;
					font-weight: 600;
				}
				.info {
					font-size: $text-size-sm;
					color: $text-color-dark-grey;
				}
			}
			.total {
				font-size: $text-size-title;
				font-weight: 600;
			}
		}
	}
}
</style>
