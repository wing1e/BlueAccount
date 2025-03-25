<template>
	<view class="detail">
		<view class="header">
			<headerVue :filterData="filterData" @filterChange="handleFilterChange" />
		</view>
		<view class="container">
			<text class="num">
				{{getTotal(filterData.date).num +'笔交易' }}
			</text>
			<view class="brand">
				<view class="brand-item" v-for="(item, index) in brandData" :key="index">
					<text >{{ item.title }}</text>
					<text style="font-size: 32rpx">{{ item.num}}</text>
					<view style="font-size: 16rpx">
						<text style="margin-right: 15rpx">{{ item.qoq }}</text>
						<text>{{ item.percentage }}</text>
					</view>
				</view>
			</view>
			<view class="list">
				<view class="list-item" v-for="(item, index) in listData" :key="index">
					<view class="item" v-if="item.records[0]">
						<text style="font-size:26rpx ;color: #a3b2c6;margin-left: 20rpx;">{{formatDate(item.date)+' &nbsp; '+item.weekday}}</text>
						<view class="records" v-for="(record,i) in item.records" :key="i">
							<uni-icons type="smallcircle-filled" size="8" color="#FE5D20" ></uni-icons>
							<view class="left-word">
								<text style="letter-spacing: 2rpx;font-weight: 600;">{{record.category}}</text>
								<view style="font-size: 18rpx;color:#5c6470 ;">
									<text >{{record.time}}</text>
									<text v-if="record.note">{{' &nbsp; · &nbsp; '+record.note}}</text>
								</view>
								
							</view>
							<text class="total" style="font-weight: 600;">
								{{record.type === 'income' ? record.amount : '-' + record.amount}}
							</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import headerVue from './components/header.vue';
import { getNowDate } from '../../utils/now-date';
import { userInfoStore } from '../../stores/userinfo';

onMounted(() => fillBrand());
// 获取数据
const { getTotal,getPartData } = userInfoStore();
// 获取当前日期
const { year, month } = getNowDate();

// 定义筛选数据对象
const filterData = reactive({
	range: 1,
	date: year + '-' + month,
	order: '日期降序'
});
// 定义数据
const brandData = reactive([
	{ title: '支出', num: '-12345.00', qoq: '12345.00', percentage: '100%' },
	{ title: '收入', num: '12345.00', qoq: '12345.00', percentage: '100%' },
	{ title: '结余', num: '12345.00', qoq: '12345.00', percentage: '100%' }
]);

const listData = computed(()=> getPartData(filterData.date));

// 新增处理函数
const handleFilterChange = (data) => {
	// 更新筛选数据
	Object.assign(filterData, data);
	// 重新填充数据
	fillBrand();
};

// 填充数据
const fillBrand = () => {
	// 获取当前数据
	const current = getTotal(filterData.date);
	const currentExpense = current.expense || 0;
	const currentIncome = current.income || 0;
	const currentBalance = currentIncome - currentExpense;

	// 获取环比数据
	const lastMonth = getTotal(getLastData(filterData.date));
	const lastExpense = lastMonth.expense || 0;
	const lastIncome = lastMonth.income || 0;
	const lastBalance = lastIncome - lastExpense;

	// 更新数据
	brandData[0].num = formatAmount(-currentExpense);
	brandData[1].num = formatAmount(currentIncome);
	brandData[2].num = formatAmount(currentBalance);

	// 计算环比变化
	brandData[0].qoq = calcQOQ(currentExpense, lastExpense);
	brandData[1].qoq = calcQOQ(currentIncome, lastIncome);
	brandData[2].qoq = calcQOQ(currentBalance, lastBalance);

	// 计算百分比变化
	brandData[0].percentage = calcPercentage(currentExpense, lastExpense);
	brandData[1].percentage = calcPercentage(currentIncome, lastIncome);
	brandData[2].percentage = calcPercentage(currentBalance, lastBalance);
};

// 工具函数

const formatDate = (date) => {
	const arr = date.split('-')
	if(arr[0] == year){
		return `${parseInt(arr[1])}月${parseInt(arr[2])}日`
	}else{
		return `${parseInt(arr[0])}年${parseInt(arr[1])}月${parseInt(arr[2])}日`
	}
}

const formatAmount = (num) => {
	const sign = num >= 0 ? '+' : '-';
	return sign + Math.abs(num).toFixed(2);
};

const calcQOQ = (current, last) => {
	const diff = current - last;
	return formatAmount(diff);
};

const calcPercentage = (current, last) => {
	if (last === 0) return current === 0 ? '0%' : '100%';
	return ((current / last - 1) * 100).toFixed(1) + '%';
};

// 获取筛选数据日期的环比日期
const getLastData = (filterDate) => {
	// 判断是否是日
	if (filterData.range == 2) {
		const dateArr = filterDate.split('-');
		const lastDate = new Date(dateArr[0], dateArr[1] - 1, dateArr[2] - 1);
		const lastArr = lastDate.toLocaleDateString().split('/');
		return lastArr[0] + '-' + lastArr[1].padStart(2, '0') + '-' + lastArr[2].padStart(2, '0');
		// 判断是否是月
	} else if (filterData.range == 1) {
		const dateArr = filterDate.split('-');
		const lastDate = new Date(dateArr[0], dateArr[1] - 2);
		const lastArr = lastDate.toLocaleDateString().split('/');
		return lastArr[0] + '-' + lastArr[1].padStart(2, '0');
		// 判断是否是年
	} else if (filterData.range == 0) {
		const lastDate = new Date(filterDate - 1);
		return lastDate.toLocaleDateString().split('/')[0];
	}
};
</script>

<style lang="scss" scoped>
@mixin flex-center {
	display: flex;
	justify-content: center;
	align-items: center;
}

@mixin bc-flt {
	filter: drop-shadow(0 1rpx 5rpx rgba(0, 0, 0, 0.1));
}
.detail {
	width: 100%;
	height: 100vh;
	display: flex;
	box-sizing: border-box;
	flex-direction: column;
	align-items: center;
	background-color: #f2f6f9;
	padding: 10rpx 30rpx 0;
	.header {
		width: 100%;
		height: 5%;
		margin-bottom: auto;
	}
	.container{
		width: 100%;
		height: 95%;
		display: flex;
		flex-direction: column;
		overflow: auto;
		.num{
			width: 100%;
			height: 5%;
			box-sizing: border-box;
			padding: 20rpx;
			font-size:26rpx ;
			color: #a3b2c6;
			position: relative;
			right: 50%;
			transform: translate(50%,0);
			
		}
		.brand {
			width: 100%;
			height:15% ;
			padding: 20rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-around;
			align-items: center;
			background: linear-gradient(to right, #485161, #00005b);
			filter: drop-shadow(0 1rpx 5rpx rgba(0, 0, 0, 0.1));
			border-radius: 40rpx;
			.brand-item {
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-evenly;
				align-items: center;
				font-size: 21rpx;
				color: #fff;
			}
		}
		.list{
			width: 100%;
			height: 80%;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: flex-start;
		
			.list-item{
				width: 100%;
				.item{
					width: 100%;
					margin-top: 20rpx;
					.records{
						width: 100%;
						height: 100rpx;
						box-sizing: border-box;
						padding: 20rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						background-color: #fff;
						border-radius: 20rpx;
						margin-top: 20rpx;
						filter: drop-shadow(0 1rpx 5rpx rgba(0, 0, 0, 0.1));
						.left-word{
							height: 100%;
							display: flex;
							flex-direction: column;
							align-items: flex-start;
							justify-content: space-between;
							font-size: 26rpx;
							margin-right: auto;
							margin-left: 20rpx;
						}
						.total{
							
						}
					}
				}
			}
		}
	}
	
}
</style>
