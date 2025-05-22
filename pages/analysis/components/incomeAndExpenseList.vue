<template>
	<view class="list">
		<view class="list-item" v-for="(item, index) in listData" :key="index">
			<uni-icons type="smallcircle-filled" size="10" :color="panelInfo.type === 0 ? '#FE5D20' : '#00B26A'"></uni-icons>
			<view class="left-word">
				<text class="date">{{ formatDate(item.date) }}</text>
				<view class="info">
					<text>{{ item.percent }}</text>
					<text>{{ ' &nbsp; · &nbsp; ' + item.count + '笔' }}</text>
				</view>
			</view>
			<text class="total" :style="{ color: panelInfo.type === 0 ? '#000' : '#00B26A' }">
				{{ item.amount }}
			</text>
		</view>
	</view>
</template>

<script setup>
import { computed } from 'vue';
import { userInfoStore } from '../../../stores/userinfo';
import { panelinfoStore } from '../../../stores/panelinfo';
import { formatDate } from '../../../utils/format';

const userstore = userInfoStore();
const panelstore = panelinfoStore();

const panelInfo = computed(() => panelstore.getPanelInfo('月度收支'));
const listData = computed(() => {
	const { type, date: panelDate } = panelInfo.value;
	const typeVal = type === 0 ? 'expense' : 'income';
	const total = userstore.getTotal(panelDate);
	const result = [];
	if(total.num>0){
		for (let i = 1; i <= 12; i++) {
			const date = [panelDate, String(i).padStart(2, '0')].join('-'); //日期
			const amount = userstore.getTotal(date)[typeVal]; //总数
			const count = userstore.getTotal(date).num; //记录数量
			const percent = ((amount / total[typeVal]) * 100).toFixed(2) + '%'; //百分比
			result.push({ date, count, amount, percent });
		}
	}
	return result;
});
</script>

<style lang="scss" scoped>
.list {
	width: 100%;
	box-sizing: border-box;
	padding: 5rpx $space 0;
	.list-item {
		background-color: #fff;
		filter: $shadow;
		border-radius: 30rpx;
		margin-bottom: $space;
		@include row-layout;
		.left-word {
			@include row-left;
			.date {
				font-size: $text-size-big;
				font-weight: 600;
			}
			.info {
				font-size: $text-size-sm;
				color: $text-color-dark-grey;
			}
		}
		.total {
			font-size: $text-size-big;
			font-weight: 600;
		}
	}
}
</style>
