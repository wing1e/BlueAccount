// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
const {
	getToken
} = require('wx-token')

//小程序的AppID 和 AppSecret
const {APP_ID,APP_SECRET} = require('cloud-config')

const db = uniCloud.database()
const user = db.collection('user')

module.exports = {
	_before: function() { // 通用预处理器
		const name = this.getMethodName()
		const nameArr = ['login','loginInUrl']
		if (!nameArr.includes(name)) {
			throw new Error('方法不存在')
		}
	},

	// 登录
	async login(event) {
		const {
			code,
			userinfo
		} = event
		const code2Session =
			`https://api.weixin.qq.com/sns/jscode2session?appid=${APP_ID}&secret=${APP_SECRET}&js_code=${code}&grant_type=authorization_code`
		try {
			// 获取微信用户唯一标识
			const res = await uniCloud.request({
				url: code2Session
			})
			//请求成功
			if (res.statusCode === 200 && !res.data.errcode) {
				const wx_openid = res.data.openid
				const wx_session = res.data.sessin_key

				// 生成token
				const token = getToken(wx_openid)

				// 查询用户信息
				const res_user = await user.where({
					openid: wx_openid
				}).get()

				//未注册用户
				if (res_user.data.length === 0 && res_user.data) {
					// 注册
					user.add({
						openid: wx_openid,
						nickName: userinfo.nickName,
						avatarUrl: userinfo.avatarUrl,
						session_key: wx_session,
						token: token
					})
					// 已经注册
				} else {
					// 更新token和session_key
					user.where({
						openid: wx_openid
					}).update({
						session_key: wx_session,
						token: token
					})
				}

				// 需要返回的用户信息
				const query_userinfo = user.where({
					openid: wx_openid
				}).field({
					avatarUrl: true,
					nickName: true,
					token: true
				}).get()
				return query_userinfo
			} else {
				throw new Error()
			}
		} catch (e) {
			throw new Error('获取微信服务失败')
		}
	},
	async loginInUrl() {
		const {
			code,
			userinfo
		} = JSON.parse(this.getHttpInfo().body)
		const code2Session =
			`https://api.weixin.qq.com/sns/jscode2session?appid=${APP_ID}&secret=${APP_SECRET}&js_code=${code}&grant_type=authorization_code`
		try {
			// 获取微信用户唯一标识
			const res = await uniCloud.request({
				url: code2Session
			})
			//请求成功
			if (res.statusCode === 200 && !res.data.errcode) {
				const wx_openid = res.data.openid
				const wx_session = res.data.sessin_key

				// 生成token
				const token = getToken(wx_openid)

				// 查询用户信息
				const res_user = await user.where({
					openid: wx_openid
				}).get()

				//未注册用户
				if (res_user.data.length === 0 && res_user.data) {
					// 注册
					user.add({
						openid: wx_openid,
						nickName: userinfo.nickName,
						avatarUrl: userinfo.avatarUrl,
						session_key: wx_session,
						token: token
					})
					// 已经注册
				} else {
					// 更新token和session_key
					user.where({
						openid: wx_openid
					}).update({
						session_key: wx_session,
						token: token
					})
				}

				// 需要返回的用户信息
				const query_userinfo = user.where({
					openid: wx_openid
				}).field({
					avatarUrl: true,
					nickName: true,
					token: true
				}).get()
				return query_userinfo
			} else {
				throw new Error('获取微信服务失败')
			}
		} catch (e) {
			throw new Error(e.message)
		}
	},

	_after:function(error, result) {
		if (error) {
			return {
				errCode: 'LOGIN_FAILED',
				errMsg: error.message
			}
		}
		return {
			errCode: 0,
			result
		}
	}
}