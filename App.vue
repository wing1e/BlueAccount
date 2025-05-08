<script>
	import loading from './utils/loading.js'
	export default {
		onLaunch: function() {
			loading() //添加全局Loading
			console.log('App Launch')
		},
		onShow: function() {
			uni.hideTabBar()
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "@/uni_modules/uview-plus/index.scss";
</style>
