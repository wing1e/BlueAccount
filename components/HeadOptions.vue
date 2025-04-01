<template>
	<view class="header">
		<view class="date-pick">
			<view class="btn-left" @click="reduceDate">
				<uni-icons type="left" size="14"></uni-icons>
			</view>
			<picker style="width: 100%;" mode="selector" :range="range"  :value="pickerRange" @change="rangeChange">
				<view class="btn-center">
					<view class="date-input">{{ showDate(pickerDate) }}</view>
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
					<view class="order-iuput">{{orderArr[pickerOrder]}}</view>
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
import { onMounted, ref } from 'vue';
import { timeChain } from '../utils/time-chain';
import {formatDate} from '../utils/format.js'
import { getNowDate,getWeek } from "../utils/get-date.js";

const RANGE_YEAR = 0;
const RANGE_MONTH = 1;
const RANGE_WEEK = 2;
const RANGE_DAY = 3;

onMounted(()=>{
	// setPickerDate(pickerRange.value)
})

const props = defineProps(['filterData'])

const {year,month,date} = getNowDate()

const range = ['年范围','月范围','周范围','日范围']
const orderArr = ['日期降序','日期升序','金额降序','金额升序']

const pickerRange = ref(props.filterData.range)
const pickerDate = ref(props.filterData.date);
const pickerOrder = ref(props.filterData.order)

const emit = defineEmits(['filterChange']);

// 范围改变
const rangeChange = (e) => {
	const val = Number(e.detail.value)
	if(pickerRange.value!==val){
		pickerRange.value = val
		setPickerDate(val)	
	}
	
};

// 减少时间
const reduceDate = () =>{
	const lastDate =  timeChain(pickerDate.value,pickerRange.value,'last')
	pickerDate.value = lastDate
	emitFilterData()
}

//增加时间
const addDate = () =>{
	const nextDate = timeChain(pickerDate.value,pickerRange.value,'next')
	pickerDate.value = nextDate
	emitFilterData()
}


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
			const {start,end} = getWeek(date)
            newDate = {start:start,end:end};
            break;
        default:
            console.error('无效的范围值:', rangeValue);
            return;
    }
    pickerDate.value = newDate;
    emitFilterData();
};


// 优化展示时间
const showDate = (date) => {
    switch (pickerRange.value) {
        case RANGE_YEAR:
            return date;
        case RANGE_MONTH:
            const [showYear, showMonth] = date.split('-');
            if (showYear === String(year)) {
                return `${parseInt(showMonth)}月`;
            }
            return `${parseInt(showYear)}年${parseInt(showMonth)}月`;
		case RANGE_WEEK:
			const {start,end} = getWeek(date.start)
			
			return `${formatDate(start)}-${formatDate(end)}`
        case RANGE_DAY:
            const [dayYear, dayMonth, dayDay] = date.split('-');
            if (dayYear === String(year)) {
                return `${parseInt(dayMonth)}.${parseInt(dayDay)}`;
            }
            return `${parseInt(dayYear)}.${parseInt(dayMonth)}.${parseInt(dayDay)}`;
        default:
            return date;
    }
};
// 排序改变
const orderChange = (e) => {
	if(pickerOrder.value!==e.target.value ){
		pickerOrder.value =e.target.value
		emitFilterData()
	}
}

// 清空
const reset = () => {
	pickerDate.value = [year, month].join('-')
	pickerOrder.value = 0
	emitFilterData()
}

// 触发方法
const emitFilterData = () => {
    emit('filterChange', {
        range: pickerRange.value,
		date:pickerDate.value,
        order: pickerOrder.value
    })
}




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
	display:flex;
	align-items: center;
	.date-pick,.order-pick,.clear {
		@include flex-center;
		font-size: 21rpx;
		font-weight: 600;
		background-color: #fff;
		box-sizing: border-box;
		padding: 10rpx;
		filter: drop-shadow(0 1rpx 5rpx rgba(0, 0, 0, 0.1));
		border-radius: 20rpx;
		margin-right: 20rpx;
	}
	.date-pick{
		min-width: 35%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		$border-side:1rpx solid #8B97A9;
		$width-side:25%;
		.btn-left{
			@include flex-center;
			border-right: $border-side;
			width: $width-side;
		}
		.btn-center{
			@include flex-center;
		}
		.btn-right{
			@include flex-center;
			border-left:  $border-side;
			width: $width-side;
		}
	}
	.order-pick{
		width: 25%;
	}
	.clear{
		width: 15%;
	}

}
</style>
