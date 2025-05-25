import {
	userInfoStore
} from "../stores/userinfo"

export default async function() {
	try {
		const userstore = userInfoStore()
		const userinfo = uni.getStorageSync('userinfo')
		if (userinfo) {
			const tokenRes = await uniCloud.callFunction({
				name: 'VerifyToken',
				data: {
					token: userinfo.token
				}
			})
			if (tokenRes.result.errCode === 0) {
				const store = userInfoStore()
				const loginRes = await store.login()
			} else {
				uni.showToast({
					icon: "error",
					title: '登录已过期',
					duration: 1000
				})
				uni.removeStorageSync('userinfo')
				userstore.$reset()
			}
		}
	} catch (error) {
		throw new Error(error)
	}
}