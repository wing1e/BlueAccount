<template>
	<view class="header">
		<view class="date-pick">
			<view class="btn-left" @click="reduceDate">
				<uni-icons type="left" size="14"></uni-icons>
			</view>
			<picker style="width: 100%" mode="selector" :range="range" :value="pickerRange" @change="rangeChange">
				<view class="btn-center">
					<view class="date-input">{{ formatOptionsDate(pickerDate, range[pickerRange]) }}</view>
					<uni-icons type="down"></uni-icons>
				</view>
			</picker>
			<view class="btn-right" @click="addDate">
				<uni-icons type="right" size="14"></uni-icons>
			</view>
		</view>
		<view class="order-pick">
			<picker mode="selector" :range="orderArr" @change="orderChange">
				<view style="display: flex">
					<view class="order-iuput">{{ orderArr[pickerOrder] }}</view>
					<uni-icons type="down"></uni-icons>
				</view>
			</picker>
		</view>
		<view class="clear" @click="reset">
			<text>清空</text>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { timeChain } from '../../../utils/time-chain';
import { getNowDate, getWeek } from '../../../utils/get-date.js';
import { formatOptionsDate } from '../../../utils/format.js';

const props = defineProps(['filterData']);

const { year, month, date } = getNowDate();

const range = ['年范围', '月范围', '周范围', '日范围'];
const orderArr = ['日期降序', '日期升序', '金额降序', '金额升序'];

const pickerRange = ref(props.filterData.range);
const pickerDate = ref(props.filterData.date);
const pickerOrder = ref(props.filterData.order);

const emit = defineEmits(['filterChange']);

// 范围改变
const rangeChange = (e) => {
	const val = Number(e.detail.value);
	if (pickerRange.value !== val) {
		pickerRange.value = val;
		setPickerDate(val);
	}
};

// 减少时间
const reduceDate = () => {
	const rangeVal = range[pickerRange.value];
	const lastDate = timeChain(pickerDate.value, rangeVal, 'last');
	pickerDate.value = lastDate;
	emitFilterData();
};

//增加时间
const addDate = () => {
	const rangeVal = range[pickerRange.value];
	const nextDate = timeChain(pickerDate.value, rangeVal, 'next');
	pickerDate.value = nextDate;
	emitFilterData();
};

const RANGE_YEAR = 0;
const RANGE_MONTH = 1;
const RANGE_WEEK = 2;
const RANGE_DAY = 3;
// 修改时间范围
const setPickerDate = (rangeValue) => {
	let newDate;
	switch (rangeValue) {
		case RANGE_YEAR:
			newDate = String(year);
			break;
		case RANGE_MONTH:
			newDate = `${year}-${month}`;
			break;
		case RANGE_DAY:
			newDate = date;
			break;
		case RANGE_WEEK:
			const { start, end } = getWeek(date);
			newDate = { start: start, end: end };
			break;
		default:
			console.error('无效的范围值:', rangeValue);
			return;
	}
	pickerDate.value = newDate;
	emitFilterData();
};

// 排序改变
const orderChange = (e) => {
	if (pickerOrder.value !== e.target.value) {
		pickerOrder.value = e.target.value;
		emitFilterData();
	}
};

// 清空
const reset = () => {
	pickerRange.value = 1;
	pickerOrder.value = 0;
	pickerDate.value = [year, month].join('-');

	emitFilterData();
};

// 触发方法
const emitFilterData = () => {
	emit('filterChange', {
		range: pickerRange.value,
		date: pickerDate.value,
		order: pickerOrder.value
	});
};
</script>

<style lang="scss" scoped>
@mixin flex-center {
	display: flex;
	justify-content: center;
	align-items: center;
}
.header {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-wrap: wrap;
	box-sizing: border-box;
	padding: 25rpx 0;
	.date-pick,
	.order-pick,
	.clear {
		@include flex-center;
		height: 100%;
		font-size: $text-size-med;
		font-weight: 600;
		background-color: #fff;
		box-sizing: border-box;
		padding: 10rpx;
		filter: $shadow;
		border-radius: 20rpx;
		margin-right: 20rpx;
	}
	.date-pick {
		min-width: 35%;
		max-width: 55%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		$border-side: 1rpx solid #8b97a9;
		$width-side: 60rpx;
		.btn-left {
			@include flex-center;
			border-right: $border-side;
			width: $width-side;
		}
		.btn-center {
			@include flex-center;
			margin: 15rpx;
			.date-input {
				@include flex-center;
				white-space: nowrap;
				letter-spacing: 4rpx;
			}
		}
		.btn-right {
			@include flex-center;
			border-left: $border-side;
			width: $width-side;
		}
	}
	.order-pick {
		width: 25%;
	}
	.clear {
		width: 15%;
	}
}
</style>
