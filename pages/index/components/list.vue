<template>
	<view class="list">
		<view class="head">
			<text class="title">最近交易</text>
			<view @click="toDetails">
				<RightButtonVue></RightButtonVue>
			</view>
		</view>
		<view class="body">
			<view class="list-group" v-for="(item, index) in data" :key="index">
				<uni-icons type="smallcircle-filled" size="10" :color="dotColor(item.type)"></uni-icons>
				<view class="left-text">
					<text class="category">{{ item.category }}</text>
					<text class="date">{{ item.date }}</text>
				</view>
				<text class="amount" :style="{ color: amountSign(item.type, item.amount).color }">{{ amountSign(item.type, item.amount).text }}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { computed } from 'vue';
import { userInfoStore } from '../../../stores/userinfo';
import RightButtonVue from '../../../components/RightButton.vue';
import { formatDate } from '../../../utils/format';
import router from '../../../utils/router.js'
const store = userInfoStore();
const data = computed(() => {
	//原始数据
	const origin = JSON.parse(JSON.stringify(store.getDataList));
	//筛选后的数据
	const filter = [];
	origin.reverse().forEach((item) => {
		const date = formatDate(item.date).split('.').join('/');
		if (item.records.length > 0) {
			const records = [...item.records];
			records.reverse().forEach((record) => {
				if (filter.length < 8) {
					const { type, category, amount } = record;
					filter.push({ date, type, category, amount });
				}
			});
		}
	});
	return filter;
});

const dotColor = (type) => {
	if (type === 'expense') {
		return '#FE5D20';
	} else {
		return '#00B26A';
	}
};

const amountSign = (type, num) => {
	if (type === 'expense') {
		return { color: '#000', text: '-' + num };
	}
	return { color: '#00B26A', text: num };
};

const toDetails = () => {
	router.navigateTo({url:'/pages/details/index'})
};
</script>

<style lang="scss" scoped>
// 间距
$space: 30rpx;
@mixin flex-center {
	display: flex;
	justify-content: center;
	align-items: center;
}
@mixin padding {
	box-sizing: border-box;
	padding: $space $space 0;
}

.list {
	width: 100%;
	height: 100%;
	@include padding;
	display: flex;
	flex-direction: column;
	background-color: $bg-color-white;
	border-radius: 30rpx;
	filter: $shadow;
	.head {
		width: 100%;
		height: 5%;
		display: flex;
		justify-content: space-between;
		align-items: start;
		.title {
			font-size: $text-size-title;
		}
	}
	.body {
		width: 100%;
		height: 95%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		.list-group {
			width: 100%;
			height: 12%;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			padding: $space 0;
			.left-text {
				display: flex;
				flex-direction: column;
				align-items: start;
				justify-content: center;
				margin-left: $space;
				margin-right: auto;
				.category {
					font-size: $text-size-title;
					letter-spacing: 2rpx;
					font-weight: 600;
				}
				.date {
					font-size: $text-size-sm;
					color: $text-color-dark-grey;
				}
			}
			.amount {
				font-size: $text-size-title;
				font-weight: 600;
			}
		}
	}
}
</style>
