import {defineStore} from "pinia"
import {getNowDate} from '../utils/get-date.js'
import {date} from "../uni_modules/uview-plus/libs/function/test.js";
export const userInfoStore = defineStore('userInfo', {
	state: () => {
		return {
			datalist: [
				{
					"date": "2023-03-15",
					"weekday": "周三",
					"records": [{
							"time": "08:15:00",
							"type": "income",
							"category": "工资",
							"amount": 23580.00,
							"note": "三月工资到账",
						},
						{
							"time": "12:30:00",
							"type": "expense",
							"category": "餐饮",
							"amount": 38.50,
							"note": "午餐-麦当劳套餐",
						},
						{
							"time": "19:45:00",
							"type": "expense",
							"category": "购物",
							"amount": 299.00,
							"note": "优衣库春季衬衫",
						}
					]
				},
				{
					"date": "2023-03-16",
					"weekday": "周四",
					"records": [{
							"time": "09:00:00",
							"type": "expense",
							"category": "餐饮",
							"amount": 8.50,
							"note": "食堂早餐"
						},
						{
							"time": "12:30:00",
							"type": "expense",
							"category": "餐饮",
							"amount": 38.50,
							"note": "午餐-麦当劳套餐",
						},
						{
							"time": "17:20:00",
							"type": "income",
							"category": "兼职",
							"amount": 1500.00,
							"note": "家教课时费"
						}
					]
				},
				{
					"date": "2023-03-17",
					"weekday": "周五",
					"records": [{
							"time": "09:00:00",
							"type": "expense",
							"category": "餐饮",
							"amount": 8.50,
							"note": "食堂早餐"
						},
						{
							"time": "10:00:00",
							"type": "expense",
							"category": "交通",
							"amount": 150.00,
							"note": "机场快车",
						},
						{
							"time": "12:30:00",
							"type": "expense",
							"category": "餐饮",
							"amount": 38.50,
							"note": "午餐-麦当劳套餐",
						},
						{
							"time": "17:20:00",
							"type": "income",
							"category": "兼职",
							"amount": 1500.00,
							"note": "家教课时费"
						},
						{
							"time": "22:15:00",
							"type": "expense",
							"category": "娱乐",
							"amount": 89.00,
							"note": "深夜电影院",
						}
					]
				}
			]
		}
	},
	getters: {

		// 补全所有日期(原数据起始月期至今)
		completionDate() {
			// 辅助函数：将日期字符串转换为本地Date对象（午夜时间）
			const parseLocalDate = (dateStr) => {
				const [year, month, day] = dateStr.split('-').map(Number);
				return new Date(year, month - 1, day); // 月份从0开始
			};

			// 辅助函数：获取数据起始月第一天
			const getFirstDayOfMonth = (dateStr) => {
				const date = new Date(dateStr);
				const year = date.getFullYear();
				const month = date.getMonth();
				const firstDay = new Date(year, month, 1);

				// 格式化为YYYY-MM-DD
				const y = firstDay.getFullYear();
				const m = String(firstDay.getMonth() + 1).padStart(2, '0');
				const d = String(firstDay.getDate()).padStart(2, '0');

				return `${y}-${m}-${d}`;
			}

			// 数据起始月第一天和现在的日期字符串
			const startDateStr = getFirstDayOfMonth(this.datalist[0].date);
			const endDateStr = getNowDate().date;

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
			this.completionDate.forEach(date => {
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
		},

		// 获取最后一天的信息
		getLastData() {
			return this.datalist[this.datalist.length - 1]
		}
	},
	actions: {
		// 添加新数据
		addData(date, records) {
			// 判断日期是否存在
			const dayData = this.datalist.find(d => d.date === date);
			if (dayData) {
				// 存在则将新记录添加到该日期的记录中
				dayData.records.push(records)
			}

		},

		// 截取部分数据
		getPartData(targetDate) {
			// 若未指定日期则返回所有数据
			if (targetDate === '') {
				return this.datalist
			}
			// 过滤目标日期的数据
			if (targetDate.start) {
				const startDate = new Date(targetDate.start)
				const endDate = new Date(targetDate.end)
				return this.datalist.filter(day => {
					const date = new Date(day.date);
					return date >= startDate && date <= endDate;
				})	
			}
			const partData = this.datalist.filter(item => item.date.startsWith(targetDate))
			return partData
		},

		// 获取总统计
		getTotal(targetDate){
			const partDate =  this.getPartData(targetDate)
			if (partDate.length === 0) {
				return {
					income: 0,
					expense: 0,
					num:0
				}
			}else{
				return partDate.reduce((acc, day) => {
					day.records.forEach(record => {
						acc.num += 1
						record.type === 'income'?
							acc.income += record.amount :
							acc.expense += record.amount;
					});
					return acc;	
				},{income: 0, expense: 0,num:0})
			}
		},
		// 分类统计
		getCategoryPercentages(targetDate) {
			const filteredData = this.getPartData(targetDate)

			const categoryIncome = {};
			const categoryExpense = {};
			let totalIncome = 0;
			let totalExpense = 0;

			// 遍历筛选后的数据
			filteredData.forEach(day => {
				day.records.forEach(record => {
					if (record.type === 'income') {
						// 累加收入
						totalIncome += record.amount;
						if (!categoryIncome[record.category]) {
							categoryIncome[record.category] = 0;
						}
						categoryIncome[record.category] += record.amount;
					} else {
						// 累加支出
						totalExpense += record.amount;
						if (!categoryExpense[record.category]) {
							categoryExpense[record.category] = 0;
						}
						categoryExpense[record.category] += record.amount;
					}
				});
			});

			// 计算百分比
			const categoryIncomePercentages = {};
			const categoryExpensePercentages = {};
			for (const category in categoryIncome) {
				categoryIncomePercentages[category] = ((categoryIncome[category] / totalIncome) * 100).toFixed(
					2);

			}
			for (const category in categoryExpense) {
				categoryExpensePercentages[category] = ((categoryExpense[category] / totalExpense) * 100)
					.toFixed(2);
			}

			return {
				income: categoryIncomePercentages,
				expense: categoryExpensePercentages
			}
		}


	}
})

const getWeekDay = (date) => {
	const day = new Date(date).getDay()
	const weekArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
	return weekArr[day]
}