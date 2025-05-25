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
const dbCmd = db.command
const user = db.collection('user')
const userRecords = db.collection('user-records')
const budget = db.collection('budget')
const categories = db.collection('categories')

module.exports = {
	_before: async function() { // 通用预处理器
		// 拿到携带的token
		const params = this.getParams()
		await checkLogin(params[0])
		const tokenRes = await verifyToken(params[0].token)
		this.openid = tokenRes.openid
	},
	//添加数据
	async add(event) {
		try {
			const {
				records,
				token
			} = event
			if (!records) throw new Error('数据为空')
			const res = await userRecords.add({
				...records,
				openid: this.openid
			})
			return {
				openid: this.openid
			}
		} catch (e) {
			throw new Error(e.message || '添加数据失败')
		}
	},
	//删除数据
	async remove(event) {
		const {
			_id,
			token
		} = event
		try {

			const delRes = await userRecords.where({
				_id
			}).remove()
			return {
				openid: this.openid
			}
		} catch (error) {
			throw new Error(error.message || '删除数据失败')
		}

	},
	//修改账单数据
	async updataBill(event) {
		try {
			const {
				token,
				records
			} = event
			if (!records) throw new Error('数据为空')
			const res = await userRecords.where({
				_id: records._id
			}).update({
				...records
			})
			return {
				openid: this.openid
			}
		} catch (e) {
			throw new Error(e.message || '数据修改失败')
		}
	},

	// 修改预算
	async updataBudget(event) {
		try {
			const {
				token,
				data
			} = event

			// 用户的分类预算表
			const budgetRes = await budget.where({
				openid: this.openid
			}).getTemp()
			// 用户的支出分类表
			const categoriesRes = await categories.where(dbCmd.or({
				openid: this.openid
			}, {
				openid: '0'
			}).and({
				type: 'expense'
			})).field('_id,name').getTemp()
			// 连表查询
			const budget_categories = await db.collection(budgetRes, categoriesRes).where({
				openid: this.openid
			}).field('categories_id').get()
			// 用户分类预算字段
			const result = budget_categories.data.map(item => {
				return {
					name: item.categories_id[0].name,
					categories_id: item.categories_id[0]._id
				}
			})
			// 循环更新
			data.forEach(async dataItem => {
				if (dataItem.name === '不分类预算') {
					await user.where({
						openid:this.openid
					}).update({
						budget_total: dataItem.budget
					})
				}
				result.forEach(async resultItem => {
					if (resultItem.name === dataItem.name) {
						await budget.where({
							openid:this.openid,
							categories_id: resultItem.categories_id
						}).update({
							budget: dataItem.budget
						})
					}
				})
			})
			// 
			return {
				openid:this.openid
			}
		} catch (error) {

		}
	},

	//查找数据
	async query(event) {
		const {
			token
		} = event
		const userRecords = db.collection('user-records')
		const categories = db.collection('categories')
		try {
			// 用户总预算
			const budgetTotal = await user.where({
				openid: this.openid
			}).field({
				budget_total: true
			}).get()
			
			//查找用户账单数据
			const recordsRes = await userRecords.where({
				openid:this.openid
			}).get()
			const formatData = formatRecrods(recordsRes)
			
			//用户的自定义分类
			const categoriesRes = await categories.where({
				openid:this.openid
			}).field({
				name: true,
				type: true,
				color: true
			}).get()

			// 用户的分类预算表
			const budgetRes = await budget.where({
				openid: this.openid
			}).getTemp()
			
			// 用户的支出分类表
			const categoriesResTemp = await categories.where(dbCmd.or({
				openid: this.openid
			}, {
				openid: '0'
			}).and({
				type: 'expense'
			})).field('_id,name').getTemp()
			
			// 连表查询
			const budget_categories = await db.collection(budgetRes, categoriesResTemp).where({
				openid: this.openid
			}).field('budget,categories_id').get()
			// 用户的分类预算
			const result = budget_categories.data.map(item => {
				return {
					name: item.categories_id[0].name,
					budget: item.budget
				}
			})
			
			return {
				categories: categoriesRes.data,
				budget_categories: result,
				dataList: formatData,
				budget_total: budgetTotal.data[0].budget_total,
				openid: this.openid
			}

		} catch (e) {
			throw new Error(e.message)
		}
	},

	_after: function(error, result) {
		if (error) {
			console.log(error);
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
// 重组数据
const formatRecrods = (queryRes) => {
	const recrods = queryRes.data.sort((a, b) => a.timestamp - b.timestamp)
	const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
	const result = []
	recrods.forEach(item => {
		const itemDate = new Date(item.date)
		//如果没有找到一样的日期
		if (!result.find(d => d.date === item.date)) {
			// 创建一个新的数据组
			const data = {
				"date": item.date,
				"weekday": weekdays[itemDate.getDay()],
				"records": [{
					"_id": item._id,
					"time": item.time || formatTime(item.timestamp),
					"type": item.type,
					"category": item.category,
					"amount": item.amount,
					"note": item.note
				}]
			}
			result.push(data)
		} else { //找到一样的日期
			//获得索引
			const index = result.findIndex(i => i.date === item.date)
			//目标数据
			const target = result[index]
			//要添加的数据
			const newData = {
				"_id": item._id,
				"time": item.time || formatTime(item.timestamp),
				"type": item.type,
				"category": item.category,
				"amount": item.amount,
				"note": item.note
			}
			target.records.push(newData)
		}

	})
	return result
}

// 转换时间戳为 HH:mm:ss 格式
const formatTime = (timestamp) => {
	const date = new Date(timestamp);
	return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
}