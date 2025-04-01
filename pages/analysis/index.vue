<template>
	<view>
		123
	</view>
</template>

<script setup>
	import {onLoad} from '@dcloudio/uni-app'
import { reactive } from 'vue';
	
	onLoad((options) => {
		chartInfo.title = options.title
		chartInfo.interval = options.interval
	})
	
	const chartInfo = reactive({title:'',interval:''})
</script>

<style>
	       
</style>
