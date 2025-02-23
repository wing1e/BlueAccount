<template>
	<view class="list">
		<view class="title" :style="{height:prop.indexH*0.05+'px'}">
			title
		</view>
		<view class="detail" :style="{height:prop.indexH*0.5+'px'}">
			detail
		</view>
	</view>
</template>

<script setup>
	const prop = defineProps(['indexH'])
</script>

<style lang="scss">
	.list{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

		.title{
			width: 100%;
		}
		.detail{
			width: 100%;
			background-color: #F2F6F9;
		}
	}

</style>