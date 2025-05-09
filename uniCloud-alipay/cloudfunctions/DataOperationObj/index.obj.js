// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj

const { verifyToken,getToken } = require('wx-token')
const {checkLogin} = require('middleware')

// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
const db = uniCloud.databaseForJQL()
const userRecords = db.collection('user-records')
module.exports = {
	_before: async function () { // 通用预处理器
	// 拿到携带的token
	const params = this.getParams()
	const tokenRes = await verifyToken(params[0].token)
	checkLogin()
	if(!tokenRes){
		throw new Error('TOKEN_EXPIRE')
	}
	
	},
	//添加数据
	async add(event){
		try{
			const {records} = event
			if(!records) throw new Error('数据为空')
			const res = await userRecords.add({...records})
			return res
		}catch(e){
			throw new Error(e.message || '添加数据失败')
		}
	},
	//删除数据
	remove(event){
		
	},
	//修改数据
	updata(event){
		
	},
	//查找数据
	query(event){
		
	},
	
	_after:function (error, result){
		if(error){
			return {errCode:error.message,errMsg:error.message}
		}else{
			const token = getToken()
			return {
				errCode:0,
				result
			}
		}
	}
	
}
