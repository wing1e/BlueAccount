<template>
	<view class="contents">
		<view class="tabbar">
			<tabbarVue></tabbarVue>
		</view>
		
	</view>
</template>

<script setup>
	import tabbarVue from '../../components/tabbar.vue';
</script>

<style lang="scss">
	.contents{
		width: 100%;
		height:100vh;
		display: flex;
		justify-content: end;
		flex-direction: column;
		.tabbar{
			width: 100%;
			height: 12%;
			margin-top: auto;
		}
	}
</style>
