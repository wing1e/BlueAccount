<script>
import loading from './utils/loading.js';
import silentLogin from './utils/silentLogin.js';
export default {
	onLaunch: async function () {
		loading(); //添加全局Loading
		await silentLogin(); //静默登录
		console.log('App Launch');
	},

	onShow: async function () {
		uni.hideTabBar();
		console.log('App Show');
	},
	onHide: function () {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
@import '@/uni_modules/uview-plus/index.scss';
</style>
