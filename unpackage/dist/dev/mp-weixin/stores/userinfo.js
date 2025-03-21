"use strict";
const common_vendor = require("../common/vendor.js");
const utils_nowDate = require("../utils/now-date.js");
const userInfoStore = common_vendor.defineStore("userInfo", {
  state: () => {
    return {
      datalist: [
        {
          "date": "2023-03-15",
          "weekday": "周三",
          "records": [
            {
              "time": "08:15:00",
              "type": "income",
              "category": "工资",
              "amount": 23580,
              "payment": "银行转账",
              "note": "三月工资到账",
              "status": "completed"
            },
            {
              "time": "12:30:00",
              "type": "expense",
              "category": "餐饮",
              "amount": 38.5,
              "payment": "支付宝-余额",
              "note": "午餐-麦当劳套餐",
              "status": "completed"
            },
            {
              "time": "19:45:00",
              "type": "expense",
              "category": "服装",
              "amount": 299,
              "payment": "微信支付-零钱",
              "note": "优衣库春季衬衫",
              "status": "completed"
            }
          ]
        },
        {
          "date": "2023-03-16",
          "weekday": "周四",
          "records": [
            {
              "time": "09:00:00",
              "type": "expense",
              "category": "餐饮",
              "amount": 8.5,
              "payment": "校园卡",
              "note": "食堂早餐",
              "status": "pending"
            },
            {
              "time": "17:20:00",
              "type": "income",
              "category": "兼职",
              "amount": 1500,
              "payment": "现金",
              "note": "家教课时费",
              "status": "completed"
            }
          ]
        },
        {
          "date": "2023-03-17",
          "weekday": "周五",
          "records": [
            {
              "time": "10:00:00",
              "type": "expense",
              "category": "交通",
              "amount": 150,
              "payment": "滴滴出行-企业账户",
              "note": "机场快车",
              "status": "refunded"
            },
            {
              "time": "22:15:00",
              "type": "expense",
              "category": "娱乐",
              "amount": 89,
              "payment": "美团-信用支付",
              "note": "深夜电影院",
              "status": "completed"
            }
          ]
        },
        {
          "date": "2023-03-18",
          "weekday": "周六",
          "records": [
            {
              "time": "11:20:00",
              "type": "expense",
              "category": "购物",
              "amount": 450,
              "payment": "支付宝-花呗",
              "note": "超市购物",
              "status": "completed"
            },
            {
              "time": "15:45:00",
              "type": "income",
              "category": "奖金",
              "amount": 5e3,
              "payment": "银行转账",
              "note": "季度奖金",
              "status": "completed"
            }
          ]
        },
        {
          "date": "2023-03-19",
          "weekday": "周日",
          "records": [
            {
              "time": "09:30:00",
              "type": "expense",
              "category": "餐饮",
              "amount": 25,
              "payment": "微信支付-零钱",
              "note": "早餐-豆浆油条",
              "status": "completed"
            },
            {
              "time": "18:00:00",
              "type": "expense",
              "category": "娱乐",
              "amount": 120,
              "payment": "支付宝-余额",
              "note": "KTV聚会",
              "status": "completed"
            }
          ]
        },
        {
          "date": "2023-03-20",
          "weekday": "周一",
          "records": [
            {
              "time": "08:00:00",
              "type": "expense",
              "category": "交通",
              "amount": 6,
              "payment": "公交卡",
              "note": "公交上班",
              "status": "completed"
            },
            {
              "time": "12:00:00",
              "type": "expense",
              "category": "餐饮",
              "amount": 20,
              "payment": "微信支付-零钱",
              "note": "午餐-快餐",
              "status": "completed"
            }
          ]
        },
        {
          "date": "2023-03-21",
          "weekday": "周二",
          "records": [
            {
              "time": "10:30:00",
              "type": "expense",
              "category": "医疗",
              "amount": 200,
              "payment": "支付宝-余额",
              "note": "药店购药",
              "status": "completed"
            },
            {
              "time": "19:00:00",
              "type": "expense",
              "category": "教育",
              "amount": 300,
              "payment": "微信支付-零钱",
              "note": "购买在线课程",
              "status": "completed"
            }
          ]
        },
        {
          "date": "2023-03-22",
          "weekday": "周三",
          "records": [
            {
              "time": "07:50:00",
              "type": "expense",
              "category": "交通",
              "amount": 10,
              "payment": "滴滴出行-个人账户",
              "note": "打车上班",
              "status": "completed"
            },
            {
              "time": "13:00:00",
              "type": "expense",
              "category": "餐饮",
              "amount": 35,
              "payment": "支付宝-余额",
              "note": "午餐-外卖",
              "status": "completed"
            }
          ]
        },
        {
          "date": "2023-03-23",
          "weekday": "周四",
          "records": [
            {
              "time": "09:00:00",
              "type": "income",
              "category": "理财",
              "amount": 1500,
              "payment": "银行转账",
              "note": "理财产品收益",
              "status": "completed"
            },
            {
              "time": "20:00:00",
              "type": "expense",
              "category": "娱乐",
              "amount": 80,
              "payment": "微信支付-零钱",
              "note": "电影票",
              "status": "completed"
            }
          ]
        },
        {
          "date": "2023-03-24",
          "weekday": "周五",
          "records": [
            {
              "time": "08:30:00",
              "type": "expense",
              "category": "餐饮",
              "amount": 15,
              "payment": "校园卡",
              "note": "食堂早餐",
              "status": "completed"
            },
            {
              "time": "18:30:00",
              "type": "expense",
              "category": "购物",
              "amount": 600,
              "payment": "支付宝-花呗",
              "note": "购买电子产品",
              "status": "completed"
            }
          ]
        },
        {
          "date": "2023-03-25",
          "weekday": "周六",
          "records": [
            {
              "time": "12:00:00",
              "type": "expense",
              "category": "餐饮",
              "amount": 50,
              "payment": "微信支付-零钱",
              "note": "朋友聚餐",
              "status": "completed"
            },
            {
              "time": "16:00:00",
              "type": "income",
              "category": "兼职",
              "amount": 800,
              "payment": "现金",
              "note": "周末兼职收入",
              "status": "completed"
            }
          ]
        },
        {
          "date": "2023-03-26",
          "weekday": "周日",
          "records": [
            {
              "time": "10:00:00",
              "type": "expense",
              "category": "旅行",
              "amount": 1200,
              "payment": "支付宝-余额",
              "note": "周末短途旅行",
              "status": "completed"
            },
            {
              "time": "21:00:00",
              "type": "expense",
              "category": "娱乐",
              "amount": 100,
              "payment": "微信支付-零钱",
              "note": "酒吧消费",
              "status": "completed"
            }
          ]
        },
        {
          "date": "2023-03-27",
          "weekday": "周一",
          "records": [
            {
              "time": "08:00:00",
              "type": "expense",
              "category": "交通",
              "amount": 8,
              "payment": "公交卡",
              "note": "公交上班",
              "status": "completed"
            },
            {
              "time": "12:30:00",
              "type": "expense",
              "category": "餐饮",
              "amount": 30,
              "payment": "支付宝-余额",
              "note": "午餐-外卖",
              "status": "completed"
            }
          ]
        }
      ]
    };
  },
  getters: {
    // 获取所有日期(原数据起始日期至今)
    completionDate() {
      const parseLocalDate = (dateStr) => {
        const [year, month, day] = dateStr.split("-").map(Number);
        return new Date(year, month - 1, day);
      };
      const startDateStr = this.datalist[0].date;
      const endDateStr = utils_nowDate.getNowDate().date;
      let currentDate = parseLocalDate(startDateStr);
      const endDate = parseLocalDate(endDateStr);
      const dateArr = [];
      while (currentDate <= endDate) {
        const formattedDate = [
          currentDate.getFullYear(),
          String(currentDate.getMonth() + 1).padStart(2, "0"),
          String(currentDate.getDate()).padStart(2, "0")
        ].join("-");
        dateArr.push(formattedDate);
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return dateArr;
    },
    // 填充所有日期
    fillData() {
      this.completionDate.forEach((date) => {
        const dayData = this.datalist.find((d) => d.date === date);
        if (!dayData) {
          const newDay = {
            date,
            weekday: "",
            records: []
          };
          this.datalist.push(newDay);
          this.datalist.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA - dateB;
          });
        }
      });
    },
    // 获取最后一天的信息
    getLastData() {
      return this.datalist[this.datalist.length - 1];
    }
  },
  actions: {
    // 获取一周数据
    getWeekData(targetDate) {
    },
    // 获取一月数据
    getMonthData(targetDate) {
    },
    // 获取一年数据
    getYearData(targetDate) {
    },
    // 获取单日统计
    getTotalDay(targetDate) {
      const dayData = this.datalist.find((d) => d.date === targetDate);
      if (!dayData)
        return {
          income: 0,
          expense: 0
        };
      return dayData.records.reduce((acc, record) => {
        record.type === "income" ? acc.income += record.amount : acc.expense += record.amount;
        return acc;
      }, {
        income: 0,
        expense: 0
      });
    },
    // 获取周统计
    getTotalWeek(targetDate) {
      const date = new Date(targetDate);
      const weekStart = new Date(date.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1)));
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      return this.datalist.reduce((acc, day) => {
        const dayDate = new Date(day.date);
        if (dayDate >= weekStart && dayDate <= weekEnd) {
          day.records.forEach((record) => {
            record.type === "income" ? acc.income += record.amount : acc.expense += record.amount;
          });
        }
        return acc;
      }, { income: 0, expense: 0 });
    },
    // 获取月统计 e.g ('2025-3')
    getTotalMon(targetDate) {
      return this.datalist.reduce((acc, day) => {
        if (day.date.startsWith(targetDate)) {
          day.records.forEach((record) => {
            record.type === "income" ? acc.income += record.amount : acc.expense += record.amount;
          });
        }
        return acc;
      }, { income: 0, expense: 0 });
    },
    // 获取年统计 e.g ('2025')
    getTotalYear(targetDate) {
      return this.datalist.reduce((acc, day) => {
        if (day.date.startsWith(targetDate)) {
          day.records.forEach((record) => {
            record.type === "income" ? acc.income += record.amount : acc.expense += record.amount;
          });
        }
        return acc;
      }, { income: 0, expense: 0 });
    },
    // 分类统计
    getCategoryPercentages(startDate, endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const filteredData = this.datalist.filter((day) => {
        const date = new Date(day.date);
        return date >= start && date <= end;
      });
      const categoryIncome = {};
      const categoryExpense = {};
      let totalIncome = 0;
      let totalExpense = 0;
      filteredData.forEach((day) => {
        day.records.forEach((record) => {
          if (record.type === "income") {
            totalIncome += record.amount;
            if (!categoryIncome[record.category]) {
              categoryIncome[record.category] = 0;
            }
            categoryIncome[record.category] += record.amount;
          } else {
            totalExpense += record.amount;
            if (!categoryExpense[record.category]) {
              categoryExpense[record.category] = 0;
            }
            categoryExpense[record.category] += record.amount;
          }
        });
      });
      const categoryIncomePercentages = {};
      const categoryExpensePercentages = {};
      for (const category in categoryIncome) {
        categoryIncomePercentages[category] = (categoryIncome[category] / totalIncome * 100).toFixed(2);
      }
      for (const category in categoryExpense) {
        categoryExpensePercentages[category] = (categoryExpense[category] / totalExpense * 100).toFixed(2);
      }
      return {
        income: categoryIncomePercentages,
        expense: categoryExpensePercentages
      };
    }
  }
});
exports.userInfoStore = userInfoStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/stores/userinfo.js.map
