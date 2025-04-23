<template>
	<view>
		<button @click="getUserInfo">点我获取信息</button>
	</view>
</template>

<script setup>
const getUserInfo = ()=>{
	uni.getUserInfo({
		provider:'weixin',
		success(info) {
			console.log(info);
		}
	})
}
</script>

<style lang="scss" scoped>

</style>
