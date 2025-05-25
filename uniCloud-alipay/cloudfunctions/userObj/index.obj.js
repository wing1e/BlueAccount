// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
const {
	getToken,
	verifyToken
} = require('wx-token')

// 获取配置
const createConfig = require('uni-config-center')
const commonConfig = createConfig({
	pluginId: 'common-config'
})

// 连接数据库
const db = uniCloud.databaseForJQL()
const dbCmd = db.command
const user = db.collection('user')
const categories = db.collection('categories')
const budget = db.collection('budget')

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
					// 添加用户基本信息
					await user.add({
						openid: wx_openid,
						nickName: userinfo.nickName,
						avatarUrl: userinfo.avatarUrl,
						session_key: wx_session,
					})
					// 添加默认的预算表
					const categoriesRes = await categories.where({
						openid: '0',
						type: 'expense'
					}).field({
						name: true
					}).get()
					categoriesRes.data.forEach(async item => {
						await budget.add({
							openid: wx_openid,
							categories_id: item._id,
						})
					})

				} else { // 已经注册
					// 更新token和session_key
					await user.where({
						openid: wx_openid
					}).update({
						session_key: wx_session,
					})
				}

				// 需要返回的用户信息
				const userinfoRes = await user.where({
					openid: wx_openid
				}).field({
					avatarUrl: true,
					nickName: true
				}).get()
				return {
					...userinfoRes.data[0],
					token: token
				}
			} else {
				throw new Error('微信服务请求失败')
			}
		} catch (e) {
			throw new Error(e.message)
		}
	},
	async updataUser(event) {
		try {
			const {
				userinfo,
				token
			} = event
			const tokenRes = await verifyToken(token)
			const updataRes = await user.where({
				openid: tokenRes.openid
			}).update({
				...userinfo
			})
			
			const info = await user.where({
				openid: tokenRes.openid
			}).field({nickName:true,avatarUrl:true}).get()
			if (updataRes.errCode === 0) {
				return {info:info.data[0],token:getToken(tokenRes.openid)}
			}
		} catch (error) {
			throw new Error(error.message)
		}

	},

	_after: function(error, result) {
		if (error) {
			return {
				errCode: error.message,
				errMsg: '请求失败'
			}
		}
		return {
			errCode: 0,
			result
		}
	}
}