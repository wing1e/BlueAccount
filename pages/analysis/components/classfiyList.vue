<template>
	<view class="list">
		<view class="list-item" v-for="(item, index) in listData" :key="index">
			<uni-icons type="smallcircle-filled" size="10" :color="getColor(item.category)"></uni-icons>
			<view class="left-word">
				<text class="category">{{ item.category }}</text>
				<view class="info">
					<text>{{ item.percent + '%' }}</text>
					<text>{{ ' &nbsp; &nbsp; ' + item.count + '笔' }}</text>
				</view>
			</view>
			<text class="total">
				{{ item.total }}
			</text>
		</view>
	</view>
</template>

<script setup>
import { computed } from 'vue';
import { EXPENSE_TYPE, INCOME_TYPE } from '../../../utils/constants.js';
import { userInfoStore } from '../../../stores/userinfo.js';
import { panelinfoStore } from '../../../stores/panelinfo.js';

const panelinfo = panelinfoStore();
const userinfo = userInfoStore();

const PANEL_TITLE = '分类统计';
const typeVal = computed(() => panelinfo.getPanelInfo(PANEL_TITLE).type);
const listData = computed(() => {
	const listDate = panelinfo.getPanelInfo(PANEL_TITLE).date;
	const originData = userinfo.getCategoryInfo(listDate);
	if (typeVal.value === 0) {
		return originData.expense;
	} else {
		return originData.income;
	}
	return [];
});
const getColor = (val) => {
	if (typeVal.value === 0) {
		const item = EXPENSE_TYPE.find((item) => item.category === val);
		return item ? item.color : '#9E9E9E'; // 如果找不到类别，返回默认颜色
	} else {
		const item = INCOME_TYPE.find((item) => item.category === val);
		return item ? item.color : '#9E9E9E'; // 如果找不到类别，返回默认颜色
	}
};
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
			.category {
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
