<template>
	<view class="container">
		<uni-popup ref="pop" type="bottom" :animation="true" @change="popChange" background-color="#fff" border-radius="20rpx 20rpx 0 0">
			<view class="body">
				<view class="header">
					<text class="title">编辑</text>
					<text class="close" @click="popClose">×</text>
				</view>
				<view class="form">
					<view class="form-item">
						<text class="label">日期</text>
						<view class="item-picker">
							<picker mode="date" :value="editInfo.date" :start="editConfig.date.start" :end="editConfig.date.end" @change="bindChange" data-type="date">
								<view class="inputVal">{{ editInfo.date }}</view>
							</picker>
						</view>
					</view>
					<view class="form-item">
						<text class="label">时间</text>
						<view class="item-picker">
							<picker mode="time" :value="editInfo.time" :start="editConfig.time.start" :end="editConfig.time.end" @change="bindChange" data-type="time">
								<view class="inputVal">{{ editInfo.time }}</view>
							</picker>
						</view>
					</view>
					<view class="form-item">
						<text class="label">分类</text>
						<view class="item-picker">
							<picker :value="editInfo.category" :range="editConfig.categories" @change="bindChange" data-type="category">
								<view class="inputVal">{{ editInfo.category }}</view>
							</picker>
						</view>
					</view>
					<view class="form-item">
						<text class="label">类型</text>
						<view class="item-picker">
							<picker :value="editInfo.type" :range="editConfig.type" @change="bindChange" data-type="type">
								<view class="inputVal">{{ editInfo.type }}</view>
							</picker>
						</view>
					</view>
					<view class="form-item">
						<text class="label">金额</text>
						<view class="item-input"><input type="number" :value="editInfo.amount" placeholder="请输入金额" @input="bindChange" data-type="amount" /></view>
					</view>
					<view class="form-item">
						<text class="label">备注</text>
						<textarea :value="editInfo.note" placeholder="请输入备注信息" @input="bindChange" data-type="note" />
					</view>
				</view>
				<view class="footer">
					<button class="btn confirm" @click="delEvent">删除</button>
					<button class="btn confirm" @click="handleConfirm">确定</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
import { ref, watch } from 'vue';
import { editStore } from '../../../stores/edit';
import { EXPENSE_TYPE, INCOME_TYPE } from '../../../utils/constants';
import { userInfoStore } from '../../../stores/userinfo';

let timer = null;
const pop = ref();
const edit = editStore();
const editInfo = ref({
	_id: '',
	date: '',
	time: '',
	category: '',
	type: '',
	noet: '',
	amount: 0
});
watch(
	() => edit.pop,
	(newpop) => {
		newpop ? popOpen() : popClose();
	}
);
const editConfig = {
	date: { start: '2020-01-01', end: '2030-01-01' },
	time: { start: '00:00', end: '24:00' },
	categories: [],
	type: ['支出', '收入']
};
const popChange = (e) => {
	edit.setPop(e?.show);
};

const popOpen = () => {
	editInfo.value = edit.getData;
	editConfig.categories = switchCategory(editInfo.value.type);
	pop.value.open();
};
const popClose = () => {
	pop.value.close();
};
// 表单修改
const bindChange = (e) => {
	if (timer !== null) {
		clearTimeout(timer);
	}
	timer = setTimeout(() => {
		const { value } = e.detail;
		const { type } = e.target.dataset;
		switch (type) {
			case 'date':
				editInfo.value.date = value;
				break;
			case 'time':
				editInfo.value.time = value + ':00';
				break;
			case 'category':
				editInfo.value.category = editConfig.categories[value];
				break;
			case 'type':
				editInfo.value.type = editConfig.type[value];
				// 当类型改变时，需要更新分类列表
				editConfig.categories = switchCategory(editInfo.value.type);
				break;
			case 'amount':
				editInfo.value.amount = Number(value);
				break;
			case 'note':
				editInfo.value.note = value;
				break;
		}
	}, 200);
};
const userstore = userInfoStore();
// 提交修改
const handleConfirm = async () => {
	// 表单验证
	if (!editInfo.value.date || !editInfo.value.time || !editInfo.value.category || !editInfo.value.type || !editInfo.value.amount) {
		uni.showToast({
			title: '请填写完整信息',
			icon: 'none'
		});
		return;
	}
	try {
		const updataRes = await userstore.updata({ ...editInfo.value, type: editInfo.value.type === '支出' ? 'expense' : 'income' });
		const queryRes = await userstore.queryData();
		if (updataRes.errCode === 0 && queryRes.errCode === 0) {
			uni.showToast({
				title: updataRes.msg,
				icon: 'success'
			});
			popClose();
		} else {
			uni.showToast({
				title: '修改失败',
				icon: 'none'
			});
			throw new Error('修改失败');
		}
	} catch (e) {
		throw new Error(e);
	}
	// 提交数据
};

const delEvent = () => {
	try {
		uni.showModal({
			content: '你确定要删除这个交易吗',
			success: async (res) => {
				if (res.confirm) {
					const delRes = await userstore.delete(editInfo.value._id);
					const queryRes = await userstore.queryData()
					if(delRes.errCode === 0 && queryRes.errCode === 0){
						uni.showToast({
							title: delRes.msg,
							icon: 'success'
						});
						popClose();
					}else{
						throw new Error('删除失败');
					}
				}
			}
		});
	} catch (error) {
		uni.showToast({
			title: '删除失败',
			icon: 'none'
		});
	}

};

const switchCategory = (type) => {
	if (type === '支出') {
		return EXPENSE_TYPE.map((item) => item.category);
	} else if (type === '收入') {
		return INCOME_TYPE.map((item) => item.category);
	}
	return [];
};
</script>

<style lang="scss" scoped>
.container {
	width: 100%;
	height: 100%;

	.body {
		width: 100%;
		height: 85vh;
		padding: $space;
		box-sizing: border-box;
		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: $space;

			.title {
				font-size: 36rpx;
				font-weight: bold;
				color: #333;
			}

			.close {
				font-size: 48rpx;
				color: #999;
				padding: 10rpx;
			}
		}

		.form {
			.form-item {
				margin-bottom: $space;

				.label {
					display: block;
					font-size: $text-size-big;
					color: #666;
					margin-bottom: 10rpx;
				}
				.item-input,
				.item-picker,
				textarea {
					width: 100%;
					height: 80rpx;
					background: $bg-color-grey;
					border-radius: 8rpx;
					padding: 20rpx;
					font-size: $text-size-big;
					box-sizing: border-box;
				}
				.item-picker {
					.inputVal {
						width: 100%;
						height: 100%;
					}
				}
				textarea {
					height: 160rpx;
					padding: 20rpx;
				}
			}
		}

		.footer {
			display: flex;
			justify-content: center;

			.btn {
				width: 90%;
				height: 88rpx;
				border-radius: 44rpx;
				font-size: 32rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				background: #007aff;
				color: #fff;
			}
		}
	}
}
</style>
