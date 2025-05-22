<template>
	<view class="popup">
		<uni-popup ref="popup" type="bottom" :animation="true" @change="popChange" background-color="#fff" border-radius="20rpx 20rpx 0 0">
			<view class="container">
				<!-- 头部 -->
				<view class="header">
					<!-- 支出选项 -->
					<view class="expense" @click="(flagType = 'expense'), reset()">
						<text :style="{ color: titleStyle('expense').color }">支出</text>
						<view class="line" v-if="titleStyle('expense').line"></view>
					</view>
					<!-- 收入选项 -->
					<view class="income" @click="(flagType = 'income'), reset()">
						<text :style="{ color: titleStyle('income').color }">收入</text>
						<view class="line" v-if="titleStyle('income').line"></view>
					</view>
					<!-- 取消按钮 -->
					<text style="position: absolute; right: 0; top: 0; color: black" @click="reset(), close()">取消</text>
				</view>
				<!-- 金额输入框 -->
				<view class="input">
					<text v-if="flagType === 'expense'" style="font-size: 26rpx; margin-right: 10rpx">一</text>
					<input style="width: 100%; height: 100%" v-model.number="form.amount" />
				</view>
				<!-- 种类选择 -->
				<view class="category">
					<view
						class="category_btn"
						v-for="(item, index) in flagType === 'expense' ? EXPENSE_TYPE : INCOME_TYPE"
						:key="index"
						@click="form.category = item.category"
						:style="{ border: categoryStyle(item.category)?.bs, color: categoryStyle(item.category)?.fs }"
					>
						<text>{{ item.category }}</text>
					</view>
				</view>
				<!-- 备注 -->
				<view class="notes">
					<text style="font-size: 20rpx; color: #656565">备注</text>
					<input type="text" placeholder="点击填写备注" v-model="form.note" />
				</view>
				<!-- 保存按钮 -->
				<button @click="submit" size="default" style="width: 80%; background-color: #00b6e6; color: #fff">保存</button>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
import { reactive, ref, watch } from 'vue';
import { tabBarStore } from '../stores/tabbar';
import { EXPENSE_TYPE, INCOME_TYPE } from '../utils/constants.js';
import { getNowDate } from '../utils/get-date.js';
import { userInfoStore } from '../stores/userinfo';
import { formValidate } from '../utils/form-validate';
const pupStore = tabBarStore();
const popup = ref(null);

const flagType = ref('expense');

// 监听弹窗状态
watch(
	() => pupStore.pup,
	(newVal) => {
		newVal ? open() : close();
	}
);

// 打开弹窗
const open = () => {
	popup.value?.open();
};
// 关闭弹窗
const close = () => {
	reset()
	popup.value?.close();
};

// 弹窗状态改变
const popChange = (e) => {
	pupStore.setPup(e?.show);
};

// 表单
const form = reactive({
	type: flagType.value,
	date: '',
	time:'',
	category: '',
	amount: '',
	note: ''
});

// 动态修改标题样式
const titleStyle = (type) => {
	if (flagType.value === type) {
		return { color: '#000', line: true };
	} else {
		return { color: '#8B97A9', line: false };
	}
};

// 动态修改种类样式
const categoryStyle = (category) => {
	if (category === form.category) {
		return { bs: '#00B6E6 1rpx solid;', fs: '#00B6E6' };
	}
};

const store = userInfoStore();

// 提交
const submit = async () => {
	try {
		if (formValidate(form)) {
			form.date = getNowDate().date;
			form.time = getNowDate().time;
			const addRes = await store.addData(form);
			const queryRes = await store.queryData();
			if (addRes.errCode === 0 && queryRes.errCode === 0) {
				uni.showToast({
					title: addRes.msg,
					icon: 'success',
					duration: 1000
				});
				reset();
				close();
			} else {
				throw Error;
			}
		}
	} catch (e) {
		throw new Error(e);
	}
};
// 重置
const reset = () => {
	const originForm = {
		type: flagType.value,
		date: '',
		category: '',
		amount: '',
		note: '',
		time:''
	};
	Object.assign(form, originForm);
};
</script>

<style lang="scss" scoped>
@mixin flex-center {
	display: flex;
	justify-content: center;
	align-items: center;
}
.popup {
	width: 100%;
	height: 100%;
	.container {
		width: 100%;
		height: 60vh;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: $space;
		.header {
			@include flex-center;
			position: relative;
			width: 100%;
			.expense,
			.income {
				width: 20%;
				height: 60rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.line {
					width: 20%;
					background-color: #00b6e6;
					height: 5rpx;
				}
				text {
					height: 100%;
					@include flex-center;
					font-size: $text-size-title;
				}
			}
		}
		.input {
			width: 100%;
			height: 10%;
			@include flex-center;
			font-size: 42rpx;
			color: #dd496e;
			font-weight: 600;
			border-bottom: 2rpx solid #8b97a9;
		}
		.category {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			margin-bottom: auto;
			.category_btn {
				width: 20%;
				height: 60rpx;
				@include flex-center;
				margin-right: auto;
				margin-top: 20rpx;
				border-radius: 20rpx;
				border: #e5e9ea 1rpx solid;
			}
		}
		.notes {
			width: 100%;
			margin-bottom: 50rpx;
			border-bottom: 2rpx solid #8b97a9;
		}
	}
}
</style>
