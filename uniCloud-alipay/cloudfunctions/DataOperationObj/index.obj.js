// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj

const {
	verifyToken,
	getToken
} = require('wx-token')
const {
	checkLogin
} = require('middleware')
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
const db = uniCloud.databaseForJQL()
const userRecords = db.collection('user-records')

// 转换时间戳为 HH:mm:ss 格式
const formatTime = (timestamp) => {
	const date = new Date(timestamp);
	return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
}

module.exports = {
	_before: async function() { // 通用预处理器
		// 拿到携带的token
		const params = this.getParams()
		await checkLogin(params[0])

	},
	//添加数据
	async add(event) {
		try {
			const {
				records,
				token
			} = event
			if (!records) throw new Error('数据为空')
			const tokenRes = await verifyToken(token)
			if (!tokenRes) throw Error('登录已过期')
			const res = await userRecords.add({
				...records,
				openid: tokenRes.openid
			})
			return {
				openid: tokenRes.openid
			}
		} catch (e) {
			throw new Error(e.message || '添加数据失败')
		}
	},
	//删除数据
	remove(event) {

	},
	//修改数据
	updata(event) {

	},

	//查找数据
	async query(event) {
		const {
			token
		} = event
		const userRecords = db.collection('user-records')
		try {
			//验证token
			const tokenRes = await verifyToken(token)
			if (!tokenRes) throw Error('登录已过期')
			//查找数据
			const queryRes = await userRecords.where({
				openid: tokenRes.openid
			}).get()

			const recrods = queryRes.data.sort((a,b)=>a.timestamp-b.timestamp)
			const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
			const result = []
			recrods.forEach(item => {
				const itemDate = new Date(item.date)
				//如果没有找到一样的日期
				if(!result.find(d => d.date === item.date)){
					// 创建一个新的数据组
					const data = {
						"date": item.date,
						"weekday": weekdays[itemDate.getDay()],
						"records": [
							{
								"time": formatTime(item.timestamp),
								"type": item.type,
								"category":item.category,
								"amount":item.amount,
								"note": item.note
							}
						]
					}
					result.push(data)
				}else{//找到一样的日期
					//获得索引
					const index = result.findIndex(i => i.date === item.date)
					//目标数据
					const target = result[index]
					//要添加的数据
					const newData = {
						"time": formatTime(item.timestamp),
						"type": item.type,
						"category":item.category,
						"amount":item.amount,
						"note": item.note
					}
					target.records.push(newData)
				}
				
			})
			return result
		} catch (e) {
			throw new Error(e.message)
		}
	},

	_after: function(error, result) {
		if (error) {
			return {
				errCode: error.message,
				errMsg: error.message
			}
		} else {
			const token = getToken(result.openid)
			return {
				errCode: 0,
				token: token,
				result
			}

		}
	}

}