<template>
	<view>
		<button @click="getUserInfo">点我获取信息</button>
	</view>
</template>

<script setup>
import { reactive } from 'vue';
import { userInfoStore } from '../../stores/userinfo';

const userinfo = userInfoStore()
const data = reactive({
	username:'',
	head:''
})
</script>

<style lang="scss" scoped>

</style>
