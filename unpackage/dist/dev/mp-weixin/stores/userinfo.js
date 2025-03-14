"use strict";
const common_vendor = require("../common/vendor.js");
const userInfoStore = common_vendor.defineStore("userinfo", {
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
              "category": "学习",
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
              "category": "旅游",
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
    // 获取最后一天的信息
    getLastData() {
      return this.datalist[this.datalist.length - 1];
    }
  },
  actions: {
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
    getTotalMon(month) {
      return this.datalist.reduce((acc, day) => {
        if (day.date.startsWith(month)) {
          day.records.forEach((record) => {
            record.type === "income" ? acc.income += record.amount : acc.expense += record.amount;
          });
        }
        return acc;
      }, { income: 0, expense: 0 });
    },
    // 获取年统计 e.g ('2025')
    getTotalYear(year) {
      return this.datalist.reduce((acc, day) => {
        if (day.date.startsWith(year)) {
          day.records.forEach((record) => {
            record.type === "income" ? acc.income += record.amount : acc.expense += record.amount;
          });
        }
        return acc;
      }, { income: 0, expense: 0 });
    }
  }
});
exports.userInfoStore = userInfoStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/stores/userinfo.js.map
