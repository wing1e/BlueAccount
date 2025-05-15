const { verifyToken } = require('wx-token')
const db = uniCloud.database()
const userCollection = db.collection('user')

// 检查用户是否登录
async function checkLogin(event) {
	try {
		const token = event.token || event.headers?.token
		if (!token) {
			throw new Error('未登录')
		}
		
		// 验证token
		const tokenInfo = verifyToken(token)
		if (!tokenInfo) {
			throw new Error('登录已过期')
		}
		
		// 查询用户信息
		const user = await userCollection.where({
			openid: tokenInfo.openid
		}).get()
		
		if (!user.data.length) {
			throw new Error('用户不存在或token已失效')
		}
		
		return true
	} catch (error) {
		throw new Error(error.message)
	}
}

module.exports = {
	checkLogin
}
