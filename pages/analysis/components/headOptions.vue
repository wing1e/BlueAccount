<template>
	<view class="container">
		<view class="date-pick">
			<view class="btn-left" @click="reduceDate">
				<uni-icons type="left" size="14"></uni-icons>
			</view>
			<picker style="width: 100%" mode="selector" :range="range" :value="picker.range" @change="rangeChange">
				<view class="btn-center">
					<view class="date-input">{{ formatOptionsDate(picker.date, picker.range) }}</view>
					<uni-icons type="down"></uni-icons>
				</view>
			</picker>
			<view class="btn-right" @click="addDate">
				<uni-icons type="right" size="14"></uni-icons>
			</view>
		</view>
		<view class="type-picker">
			<picker style="width: 100%;"></picker>
		</view>
	</view>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { getNowDate, getWeek } from '../../../utils/get-date';
import { timeChain } from '../../../utils/time-chain';
import { panelinfoStore } from '../../../stores/panelinfo';
import { formatOptionsDate } from '../../../utils/format.js';
import {PICKER_INFO} from '../../../utils/constants.js'
onMounted(() => {
	range.value = panelinfo.getPanelInfo(props.panelTitle).allowRange;
});

const { year, month, date } = getNowDate();// 获取当前日期
// 接收父组件传递的属性
const props = defineProps(['panelTitle']);

const panelinfo = panelinfoStore();// 面板信息
const range = ref([]); // 范围
const type = ['支出','收入']

//根据 panelTitle 获取对应的 picker 信息
const picker = computed(() => {
  const item = panelinfo.panelList.find(item => item.title === props.panelTitle);
  return {
    date: item?.date || '',
    range: item?.range || 0,
    ...item
  };
});

// 范围改变
const rangeChange = (e) => {
	const val = Number(e.detail.value);
	if (picker.value.range !== val) {
		setPickerDate(range[val]);
	}
};

// 减少时间
const reduceDate = () => {
	const lastDate = timeChain(picker.value.date, picker.value.range, 'last');
	panelChange({ date: lastDate, range: picker.value.range });
};

//增加时间
const addDate = () => {

	const nextDate = timeChain(picker.value.date, picker.value.range, 'next');
	
	panelChange({ date: nextDate, range: picker.value.range });
};


// 修改时间范围
const setPickerDate = (rangeValue) => {
	const {range_year,range_month,range_week,range_day} = PICKER_INFO.picker_range
	let newDate;
	switch (rangeValue) {
		case range_year:
			newDate = String(year);
			break;
		case range_month:
			newDate = `${year}-${month}`;
			break;
		case range_week:
			const { start, end } = getWeek(date);
			newDate = { start: start, end: end };
			break;
		case range_day:
			newDate = date;
			break;
		default:
			console.error('无效的范围值:', rangeValue);
			return;
	}
	const data = { date: newDate, range: rangeValue };
	panelChange(data);
};

// 面板信息改变
const panelChange = (data) => {
	panelinfo.setPanel(props.panelTitle, data);
	
};
</script>

<style scoped lang="scss">
@mixin wh100 {
	width: 100%;
	height: 100%;
}
@mixin flex-center {
	display: flex;
	justify-content: center;
	align-items: center;
}
.container {
	@include wh100;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	box-sizing: border-box;
	padding: 25rpx 0;
	.date-pick {
		height: 100%;
		min-width: 35%;
		display: flex;
		background-color: #fff;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 10rpx;
		border-radius: 20rpx;
		filter: $shadow;
		font-size: $text-size-med;
		font-weight: 600;
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
	.type-picker{
		
	}
}
</style>
