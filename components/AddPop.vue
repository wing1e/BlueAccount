<template>
	<view class="popup">
		<uni-popup ref="popup" type="bottom" :animation="true" @change="popChange" background-color="#fff" border-radius="20rpx 20rpx 0 0">
			<view class="container">
				<!-- 头部 -->
				<view class="header">
					<!-- 支出选项 -->
					<view class="expense" @click="form.records.type = 'expense'">
						<text :style="{color:titleStyle('expense').color}">支出</text>
						<view class="line" v-if="titleStyle('expense').line"></view>
					</view>
					<!-- 收入选项 -->
					<view class="income" @click="form.records.type = 'income'">
						<text :style="{color:titleStyle('income').color}">收入</text>
						<view class="line" v-if="titleStyle('income').line"></view>
					</view>
					<!-- 取消按钮 -->
					<text style="position: absolute;right: 0;top: 0;color: black;" @click="reset">取消</text>
				</view>
				<!-- 金额输入框 -->
				<view class="input">
					<text v-if="form.records.type==='expense'" style="font-size: 26rpx;margin-right: 10rpx;">一</text>
					<input type="number" style="width: 100%;height: 100%;" v-model.number="form.records.amount" />
				</view>
				<!-- 种类选择 -->
				<view class="category" >
					<view class="category_btn"
					 v-for="(item,index) in form.records.type==='expense'?EXPENSE_TYPE:INCOME_TYPE " :key="index"
					  @click="form.records.category = item.category"
					  :style="{border:categoryStyle(item.category)?.bs,color:categoryStyle(item.category)?.fs}">
						<text>{{item.category}}</text>
					</view>
				</view>
				<!-- 备注 -->
				<view class="notes">
					<text style="font-size: 20rpx;color: #656565;">备注</text>
					<input type="text" placeholder="点击填写备注" v-model="form.records.note"/>
				</view>
				<!-- 保存按钮 -->
				<button @click="submit" size="default" style="width: 80%;background-color: #00B6E6;color: #fff;">保存</button>
			</view>
		</uni-popup>
	</view>
</template>

<script setup >
import { reactive, ref, watch } from 'vue';
import { tabBarStore } from '../stores/tabbar';
import {EXPENSE_TYPE,INCOME_TYPE} from '../utils/chart/pie-chart.js'
import { getNowDate } from '../utils/now-date';
import { userInfoStore } from '../stores/userinfo';

	const popup = ref(null)
	
	// 监听弹窗状态
	watch(()=>tabBarStore().pop,(newVal)=>{
		newVal?open():close()
	})
	
	// 打开弹窗
	const open = () =>{
		popup.value?.open()
		
	}
	// 关闭弹窗
	const close = () => {
		popup.value?.close()
	}
	
	// 弹窗状态改变
	const popChange = (e) =>{
		tabBarStore().pop = e?.show
	}
	
	// 表单
	const form = reactive({
		date: '',
		records:{
			time: '',
			type: "expense",
			category: '',
			amount:'' ,
			note: ''
		}
		
	})
	
	// 动态修改标题样式
	const titleStyle = (type) =>{
		if(form.records.type === type){
			return {color:"#000",line:true}
		}else{
			return {color:"#8B97A9",line:false}
		}
	}

	// 动态修改种类样式
	const categoryStyle = (category) =>{
		if(category===form.records.category){
			return {bs:'#00B6E6 1rpx solid;',fs:'#00B6E6'}
		}
	}
	
	const {addData} = userInfoStore()

	// 提交
	const submit = () =>{
		form.date = getNowDate().date
		form.records.time = getNowDate().time
		if(formValidate()){
			addData(form.date,form.records)
			reset()
		}
		
		
	}
	
	// 表单验证
	const formValidate = () =>{
		if(form.records.amount===''){
			uni.showToast({
				title:'请选择金额',
				icon:'error'
			})
			return false
		}else if(form.records.category===''){
			uni.showToast({
				title:'请选择种类',
				icon:'error'
			})
			return false
		}
		
		return true
	}
	// 重置
const reset = () =>{
    form.date = ""
    form.records = {
        time: "",
        type: "expense",
        category: "",
        amount: "",
        note: ""
    }
    close()
}
	
	
</script>

<style lang="scss" scoped>
@mixin flex-center {
	display: flex;
	justify-content: center;
	align-items: center;
	}
	.popup{
		width: 100%;
		height: 100%;
		.container{
			width: 100%;
			height: 60vh;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 20rpx;
			.header{
				@include flex-center;
				position: relative;
				width: 100%;
				.expense,.income{
					width: 20%;
					height: 60rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					.line{
						width: 20%;
						background-color: #00B6E6;
						height: 5rpx;
					}
					text{
						height: 100%;
						@include flex-center;
						font-size: 32rpx;
					}
				}
				
				
			}
			.input{
				width: 100%;
				height: 10%;
				@include flex-center;
				font-size: 42rpx;
				color: #dd496e;
				font-weight: 600;
				border-bottom:2rpx solid #8B97A9 ;
			}
			.category{
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				margin-bottom: auto;
				.category_btn{
					width: 20%;
					height: 60rpx;
					@include flex-center;
					margin-right: auto;
					margin-top:20rpx;
					border-radius: 20rpx;
					border: #e5e9ea 1rpx solid;
				}
			}
			.notes{
				width: 100%;
				margin-bottom: 50rpx;
				border-bottom:2rpx solid #8B97A9 ;
			}
		}
		
	}
	
</style>