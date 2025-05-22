<template>
	<view class="list">
		<view class="list-item" v-for="(item, index) in data" :key="index">
			<uni-icons type="smallcircle-filled" size="10" :color="flag === 'expense' ? '#FE5D20' : '#00B26A'"></uni-icons>
			<view class="left-word">
				<text class="date">{{ formatDate(item.date) }}</text>
				<view class="info">
					<text>{{ item.percent[flag] + '%' }}</text>
					<text>{{ ' &nbsp; · &nbsp; ' + item.count + '笔' }}</text>
				</view>
			</view>
			<text class="total" :style="{ color: flag === 'expense' ? '#000' : '#00B26A' }">
				{{ item[flag] }}
			</text>
		</view>
	</view>
</template>

<script setup>
import { computed, ref } from 'vue';
import { panelinfoStore } from '../../../stores/panelinfo';
import { userInfoStore } from '../../../stores/userinfo';
import { formatDate } from '../../../utils/format';

const userinfo = userInfoStore();
const panelinfo = panelinfoStore();
const PANEL_TITLE = '日趋势';
const flag = computed(() => (panelinfo.getPanelInfo(PANEL_TITLE).type === 0 ? 'expense' : 'income'));
const data = computed(() => {
	const listDate = panelinfo.getPanelInfo(PANEL_TITLE).date;
	const partData = userinfo.getPartData(listDate);
	const originData = partData.map((item) => {
		const date = item.date;
		const others = item.records.reduce(
			(acc, record) => {
				record.type === 'expense' ? (acc.expense =(acc.expense*10+ record.amount*10)/10) : (acc.income =(acc.income*10+ record.amount*10)/10);
				acc.count++;
				return acc;
			},
			{ expense: 0, income: 0, count: 0 }
		);
		const total = userinfo.getTotal(listDate);
		return { date: date, ...others, percent: { expense: ((others.expense / total.expense) * 100).toFixed(2), income: ((others.income / total.income) * 100).toFixed(2) } };
	});

	return originData.filter((item) => item.count > 0);
});
console.log(data.value);
</script>

<style lang="scss" scoped>
.list {
	width: 100%;
	box-sizing: border-box;
	padding:5rpx $space 0;
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
