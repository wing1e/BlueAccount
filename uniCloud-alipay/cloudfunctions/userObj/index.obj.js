// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
const {
	getToken
} = require('wx-token')

// 获取配置
const createConfig = require('uni-config-center')
const commonConfig = createConfig({
	pluginId: 'common-config'
})

// 连接数据库
const db = uniCloud.databaseForJQL()
const user = db.collection('user')

module.exports = {
	_before: function() { // 通用预处理器

	},

	// 登录
	async login(event) {
		const {
			code,
			userinfo
		} = event

		const APP_ID = commonConfig.config('APP_ID')
		const APP_SECRET = commonConfig.config('APP_SECRET')

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
				const wx_session = res.data.session_key

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
					})
					// 已经注册
				} else {
					// 更新token和session_key
					await user.where({
						openid: wx_openid
					}).update({
						session_key: wx_session,
					})
				}

				// 需要返回的用户信息
				const queryRes = await user.where({
					openid: wx_openid
				}).field({
					avatarUrl: true,
					nickName: true,
					budget: true
				}).get()
				return {
					...queryRes.data[0],
					token: token
				}
			} else {
				throw new Error('微信服务请求失败')
			}
		} catch (e) {
			throw new Error(e.message)
		}
	},

	_after: function(error, result) {
		if (error) {
			return {
				errCode: '登录失败',
				errMsg: error.message
			}
		}
		return {
			errCode: 0,
			result
		}
	}
}