// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj

const { verifyToken } = require('wx-token')

// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
const db = uniCloud.database()
module.exports = {
	_before: async function () { // 通用预处理器
	const name = this.getMethodName()
	const nameArr = ['add',]
	if (!nameArr.includes(name)) {
		throw new Error('方法不存在')
	}
	// 拿到携带的token
	const params = this.getParams()
	const tokenRes = await verifyToken(params[0].token)
	if(!tokenRes){
		throw new Error('token失效')
	}
	
	},
	add(event){
		return event.a
	},
	
	_after:function (error, result){
		if(error){
			return {errCode:'TOKEN_EXPIRE',errMsg:error.message}
		}
		return result
	}
	
}
