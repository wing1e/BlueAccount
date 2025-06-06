import {
	defineStore
} from "pinia"
import {
	getNowDate
} from '../utils/get-date.js'
import {
	login
} from '../utils/api/login.js';
import {
	add
} from "../utils/api/add.js";
import {
	query
} from "../utils/api/query.js";
import {
	updataBill
} from '../utils/api/updataBill.js'
import {
	remove
} from '../utils/api/remove.js'
import {
	updataBudget
} from "../utils/api/updataBudget.js";
import { updataUser } from "../utils/api/updataUser.js";
export const userInfoStore = defineStore('userInfo', {
	state: () => {
		return {
			basicInfo: {
				avatar: '',
				nickname: '',
				budget_total: '',
				budget_categories: [],
				categories: []
			},
			datalist: []
		}
	},
	getters: {
		//返回用户数据
		getDataList: (state) => state.datalist,

		// 获取指定日期的数据
		getPartData: (state) => (targetDate) => {
			// 若未指定日期则返回所有数据
			if (targetDate === '') {
				return state.datalist
			}
			// 过滤目标日期的数据
			if (targetDate.start) {
				const startDate = new Date(targetDate.start)
				const endDate = new Date(targetDate.end)
				return state.datalist.filter(day => {
					const date = new Date(day.date);
					return date >= startDate && date <= endDate;
				})
			}
			const partData = state.datalist.filter(item => item.date.startsWith(targetDate))
			return partData
		},
		// 获取总数
		getTotal() {
			return (targetDate) => {
				const partDate = this.getPartData(targetDate)
				if (partDate.length === 0) {
					return {
						income: 0,
						expense: 0,
						num: 0
					}
				} else {
					// 计算总收入/支出
					return partDate.reduce((acc, day) => {
						day.records.forEach(record => {
							acc.num += 1
							record.type === 'income' ?
								acc.income = ((acc.income * 10 + record.amount * 10) / 10).toFixed(2) :
								acc.expense = ((acc.expense * 10 + record.amount * 10) / 10).toFixed(2);
						});
						return acc;
					}, {
						income: 0,
						expense: 0,
						num: 0
					})
				}
			}
		},
		// 获取分类信息
		getCategoryInfo() {
			return (targetDate) => {
				const filteredData = this.getPartData(targetDate) // 获取指定日期的数据
				const result = {
					income: [],
					expense: [],
				}
				// 计算总收入/支出
				const totals = filteredData.reduce((acc, day) => {
					day.records.forEach(record => {
						if (record.type === 'income') {
							acc.incomeTotal += record.amount
						} else {
							acc.expenseTotal += record.amount
						}
					})
					return acc
				}, {
					incomeTotal: 0,
					expenseTotal: 0
				})

				// 计算每个分类的总金额和数量
				const categoryMap = filteredData.reduce((acc, day) => {
					day.records.forEach(record => {
						const type = record.type // 类型(支出/收入)
						const category = record.category // 分类
						// 若不存在分类则创建
						if (!acc[type][category]) {
							acc[type][category] = {
								amount: 0,
								count: 0
							}
						}

						acc[type][category].amount = (acc[type][category].amount * 10 + record.amount * 10) / 10
						acc[type][category].count++
					})
					return acc
				}, {
					income: {},
					expense: {}
				})

				const typeArr = ['income', 'expense'] // 类型数组
				// 计算每个分类的百分比
				typeArr.forEach(type => {
					Object.entries(categoryMap[type]).forEach(([category, data]) => {
						const total = type === 'income' ? totals.incomeTotal : totals.expenseTotal
						result[type].push({
							category,
							percent: ((data.amount / total) * 100).toFixed(2),
							count: data.count,
							total: data.amount
						})
					})
				})

				return result
			}
		}
	},
	actions: {
		setNickName (value){
			this.basicInfo.nickname = value
		},
		// 登录
		async login() {
			try {
				const [loginRes, {
					userInfo
				}] = await Promise.all([
					uni.login({
						provider: 'weixin'
					}),
					uni.getUserInfo({
						provider: 'weixin'
					})
				])
				if (loginRes.errMsg !== 'login:ok') throw Error('获取code失败');

				//登录
				const res = await login({
					code: loginRes.code,
					userinfo: userInfo
				});
				const data = res.result;
				//请求成功
				if (res.errCode === 0) {
					// 修改pinia的状态，储存用户信息
					this.$patch({
						basicInfo: {
							nickname: data.nickName,
							avatar: data.avatarUrl
						}
					});
					// 储存token
					uni.setStorageSync('userinfo', data);
					// 重新拉取数据
					const queryRes = await this.queryData();
					if (queryRes.errCode === 0) {
						return {
							errCode: queryRes.errCode,
							msg: '登录成功'
						}
					}
				}
			} catch (error) {
				throw new Error(error)
			}
		},
		// 获取用户信息
		async queryData() {
			try {
				const res = await query()
				const {categories,budget_categories,dataList,budget_total} = res.result
				//将数据添加到pinia中
				this.$patch({
					datalist:dataList,
					basicInfo:{
						categories:categories,
						budget_categories:budget_categories,
						budget_total:budget_total
					}
				})
				this.fillData()
				return {
					errCode: 0,
					msg: '获取成功'
				}

			} catch (e) {
				throw new Error('获取失败')
			}
		},
		// 添加新数据
		async addData(records) {
			try {
				const res = await add({
					records
				})
				if (res.errCode === 0) {
					return {
						errCode: 0,
						msg: '提交成功'
					}
				} else {
					throw Error('添加新数据失败')
				}

			} catch (e) {
				throw new Error(e.message)
			}

		},
		// 修改用户信息
		async updataUser(userinfo){
			try {
				const updataRes = await updataUser({userinfo})
				const {nickName,avatarUrl} = updataRes.result.info
				if (updataRes.errCode === 0) {
					this.$patch({basicInfo:{
						nickname:nickName,
						avatar:avatarUrl
					}})
					return {
						errCode: 0,
						msg: '修改成功'
					}
				} else {
					throw Error('修改新数据失败')
				}
				
			} catch (error) {
				//TODO handle the exception
			}
		},
		async updataBill(records) {
			try {
				const res = await updataBill({
					records
				})
				if (res.errCode === 0) {
					return {
						errCode: 0,
						msg: '修改成功'
					}
				} else {
					throw Error('修改数据失败')
				}
			} catch (e) {
				throw new Error(e.message)
			}
		},
		async updataBudget(data) {
			try {
				const res = await updataBudget({
					data
				})
				if (res.errCode === 0) {
					return {
						errCode: 0,
						msg: '修改成功'
					}
				} else {
					throw Error('修改数据失败')
				}
			} catch (error) {
				//TODO handle the exception
			}
		},
		async delete(_id) {
			try {
				const res = await remove({
					_id
				})
				if (res.errCode === 0) {
					return {
						errCode: 0,
						msg: '删除成功'
					}
				} else {
					throw Error('删除数据失败')
				}
			} catch (e) {
				throw new Error(e.message)
			}
		},
		// 补全所有日期(原数据起始月第一周的第一天至今天这一周的最后一天)
		completionDate() {
			// 数据起始月第一天和现在的日期字符串
			const startDateStr = getFirstDay(this.datalist[0].date);
			const endDateStr = getEndDay(getNowDate().date);
			// 转换为Date对象
			let currentDate = parseLocalDate(startDateStr);
			const endDate = parseLocalDate(endDateStr);

			const dateArr = [];

			// 循环直到当前日期超过结束日期
			while (currentDate <= endDate) {
				// 格式化为YYYY-MM-DD
				const formattedDate = [
					currentDate.getFullYear(),
					String(currentDate.getMonth() + 1).padStart(2, '0'),
					String(currentDate.getDate()).padStart(2, '0')
				].join('-');

				dateArr.push(formattedDate);

				// 增加一天
				currentDate.setDate(currentDate.getDate() + 1);
			}
			return dateArr;
		},
		// 填充所有日期
		fillData() {
			this.completionDate().forEach(date => {
				// 判断日期是否存在
				const dayData = this.datalist.find(d => d.date === date);
				if (!dayData) {
					// 不存在则创建一个新的日期对象
					const newDay = {
						date: date,
						weekday: getWeekDay(date),
						records: []
					};
					// 添加到datalist中
					this.datalist.push(newDay);
					// 对日期进行排序
					this.datalist.sort((a, b) => {
						const dateA = new Date(a.date);
						const dateB = new Date(b.date);
						return dateA - dateB;
					});
				}
			})
		}
	}
})

// 将日期字符串转换为本地Date对象（午夜时间）
const parseLocalDate = (dateStr) => {
	const [year, month, day] = dateStr.split('-').map(Number);
	return new Date(year, month - 1, day); // 月份从0开始
};

// 计算数据的第一天
const getFirstDay = (dateStr) => {
	const date = new Date(dateStr);
	const year = date.getFullYear();
	const month = date.getMonth();
	// 月份的第一天
	const firstDay = new Date(year, month, 1);
	// 该天是星期几
	const day0fWeek = firstDay.getDay()

	const targetDay = new Date(firstDay)
	targetDay.setDate(firstDay.getDate() - day0fWeek)

	// 格式化为YYYY-MM-DD
	const y = targetDay.getFullYear();
	const m = String(targetDay.getMonth() + 1).padStart(2, '0');
	const d = String(targetDay.getDate()).padStart(2, '0');

	return `${y}-${m}-${d}`;
}

//计算数据的最后一天
const getEndDay = (dateStr) => {
	const date = new Date(dateStr);
	const year = date.getFullYear();
	const month = date.getMonth();
	// 月份的最后一天
	const endDay = new Date(year, month + 1, 0);
	// 该天是星期几
	const day0fWeek = endDay.getDay()

	const targetDay = new Date(endDay)
	targetDay.setDate(endDay.getDate() + 6 - day0fWeek)

	// 格式化为YYYY-MM-DD
	const y = targetDay.getFullYear();
	const m = String(targetDay.getMonth() + 1).padStart(2, '0');
	const d = String(targetDay.getDate()).padStart(2, '0');

	return `${y}-${m}-${d}`;
}

const getWeekDay = (date) => {
	const day = new Date(date).getDay()
	const weekArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
	return weekArr[day]
}