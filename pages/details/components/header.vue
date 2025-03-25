<template>
	<view class="header">
		<view class="date-pick">
			<picker mode="selector" :range="range" :value="dateRange" @change="rangeChange">
				<view style="display: flex">
					<view class="date-input">{{ showDate(pickerDate) }}</view>
					<uni-icons type="down"></uni-icons>
				</view>
			</picker>
		</view>
		<view class="order-pick">
			<picker mode="selector" :range="orderArr" @change="orderChange">
				<view style="display: flex">
					<view class="order-iuput">{{pickerOrder}}</view>
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
import { userInfoStore } from '../../../stores/userinfo.js';
import { getNowDate } from '../../../utils/now-date.js';

onMounted(()=>{
	setPickerDate(dateRange.value)
})

const { datalist } = userInfoStore();
const props = defineProps(['filterData'])
const pickerStart = ref(datalist[0].date);

const {year,month,day,date} = getNowDate()

const range = ['年范围','月范围','日范围']
const orderArr = ['日期降序','日期升序','金额降序','金额升序']

const dateRange = ref(props.filterData.range)
const pickerDate = ref(props.filterData.date);
const pickerOrder = ref(props.filterData.order)

const emit = defineEmits(['filterChange']);

// 范围改变
const rangeChange = (e) => {
	dateRange.value = e.target.value
	setPickerDate(Number(e.target.value))
	
};


// 修改时间
const setPickerDate = (rangeValue) =>{
	if(rangeValue===0){
		pickerDate.value = year
		emitFilterData()
	}else if(rangeValue===1){
		pickerDate.value = year+'-'+month
		emitFilterData()
	}else if(rangeValue===2){
		pickerDate.value = date
		emitFilterData()
	}
	
}

// 优化展示时间
const showDate = (date) => {
	if(dateRange.value==0){
		return date
	}
	if(dateRange.value==1){
		const show = date.split('-')
		if (show[0] == year) {
			return parseInt(show[1]) + '月'
		}
		return show
	}
	if(dateRange.value==2){
		const show = date.split('-')
		if (show[0] == year) {
			return parseInt(show[1])+'.'+parseInt(show[2])
		}
		return show
	}
	
};
// 排序改变
const orderChange = (e) => {
	pickerOrder.value =orderArr[e.target.value] 
	emitFilterData()
}

// 清空
const reset = () => {
	pickerDate.value = [getNowDate().year, getNowDate().month].join('-')
	pickerOrder.value = orderArr[0]
	emitFilterData()
}

// 新增统一触发方法
const emitFilterData = () => {
    emit('filterChange', {
        range: dateRange.value,
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
		min-width: 20%;
	}
	.order-pick{
		width: 25%;
	}
	.clear{
		width: 15%;
	}

}
</style>
