export default function(){
	let loadingCount = 0; // 请求计数器
	
	const showLoading = () => {
		if (loadingCount === 0) {
			uni.showLoading({
				mask: true
			});
		}
		loadingCount++;
		console.log('Request Appears');
	};
	
	const hideLoading = () => {
		if (loadingCount <= 0) return;
		loadingCount--;
		console.log('Request End');
		if (loadingCount === 0) {
			uni.hideLoading();
		}
	};
	
	// 添加请求拦截器
	uni.addInterceptor('request', {
		invoke(args) {
			// const baseUrl = "https://env-00jxtfjq2ym4.dev-hz.cloudbasefunction.cn"
			// args.url = baseUrl+args.url
			showLoading(); // 请求前显示
		},
		success(args) {
			hideLoading(); // 成功时隐藏
		},
		fail(err) {
			hideLoading(); // 失败时隐藏
		},
		complete(res) {
			hideLoading(); //完成时隐藏
		}
	});
	
	
}