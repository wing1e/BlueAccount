<template>
	<view class="list">
		<view class="list-item" v-for="(item,index) in listData.expense" :key="index">
			<uni-icons type="smallcircle-filled" size="10" :color="getColor(item.category)"></uni-icons>
			<view class="left-word">
				<text class="category">{{item.category}}</text>
				<view class="info">
					<text>{{ item.percent + '%' }}</text>
					<text>{{ ' &nbsp; · &nbsp; ' + item.count + '笔' }}</text>
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
import { EXPENSE_TYPE } from '../../../utils/constants.js';
import { userInfoStore } from '../../../stores/userinfo.js';
import { panelinfoStore } from '../../../stores/panelinfo.js';

const panelinfo = panelinfoStore();
const userinfo = userInfoStore()

const PANEL_TITLE = '分类统计'

const listData = computed(() => {
	const listDate = panelinfo.getPanelInfo(PANEL_TITLE).date
	const originData = userinfo.getCategoryInfo(listDate)
	return {expense:originData.expense,income:originData.expense};
});

const getColor = (val) => {
	return EXPENSE_TYPE.find((item) => item.category === val).color;
};
</script>

<style lang="scss" scoped>
.list {
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.list-item {
		background-color: #fff;
		filter: $shadow;
		border-radius: 20rpx;
		@include options-layout;
		.left-word {
			@include option-left;
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
			font-size: $text-size-big;
			font-weight: 600;
		}
	}
}
</style>
