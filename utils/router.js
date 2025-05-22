// 路由配置
const routerConfig = {
	'/pages/index/index': {
		requiresAuth: false
	}, //主页
	'/pages/chart/index': {
		requiresAuth: false
	}, //图表页
	'/pages/details/index': {
		requiresAuth: true
	}, //明细页
	'/pages/analysis/index': {
		requiresAuth: true
	}, //图表分析页
	'/pages/mypage/index': {
		requiresAuth: false
	}, //我的页
	'/pages/budget/index': {
		requiresAuth: true
	}, //预算页
	'/pages/bill/index': {
		requiresAuth: false
	} //账单页
}

// 封装 navigateTo
const navigateTo = (options) => {
	if (beforeEach(options.url)) {
		uni.navigateTo(options);
	}
}

// 封装 redirectTo
const redirectTo = (options) => {
	if (beforeEach(options.url)) {
		uni.redirectTo(options);
	}
}

// 封装 switchTab
const switchTab = (options) => {
	if (beforeEach(options.url)) {
		uni.switchTab(options);
	}
}

// 封装 reLaunch
const reLaunch = (options) => {
	if (beforeEach(options.url)) {
		uni.reLaunch(options);
	}
}

// 封装 navigateBack
const navigateBack = (options) => {
	if (beforeEach()) {
		uni.navigateBack(options);
	}
}

// 自定义路由守卫函数
const beforeEach = (url) => {
	const path = url.split('?')[0];
	// 如果不需要验证
	if (!routerConfig[path].requiresAuth) {
		return true
	}
	// 检查登录状态
	if(checkLoginState()){
		return true
	}else{
		uni.showToast({
			icon:"error",
			title:'请先登录'
		})
		return false
	}
	
}

// 检查用户是否登录
const checkLoginState =() => {
	const userinfo = uni.getStorageSync('userinfo')
	if (userinfo) {
		return true
	}
	return false
}

// 导出封装的方法
export default {
	navigateTo,
	redirectTo,
	switchTab,
	reLaunch,
	navigateBack
};