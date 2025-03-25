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
              "note": "三月工资到账"
            },
            {
              "time": "12:30:00",
              "type": "expense",
              "category": "餐饮",
              "amount": 38.5,
              "note": "午餐-麦当劳套餐"
            },
            {
              "time": "19:45:00",
              "type": "expense",
              "category": "服装",
              "amount": 299,
              "note": "优衣库春季衬衫"
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
              "note": "食堂早餐"
            },
            {
              "time": "17:20:00",
              "type": "income",
              "category": "兼职",
              "amount": 1500,
              "note": "家教课时费"
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
              "note": "机场快车"
            },
            {
              "time": "22:15:00",
              "type": "expense",
              "category": "娱乐",
              "amount": 89,
              "note": "深夜电影院"
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
              "note": "超市购物"
            },
            {
              "time": "15:45:00",
              "type": "income",
              "category": "奖金",
              "amount": 5e3,
              "note": "季度奖金"
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
              "note": "早餐-豆浆油条"
            },
            {
              "time": "18:00:00",
              "type": "expense",
              "category": "娱乐",
              "amount": 120,
              "note": "KTV聚会"
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
              "note": "公交上班"
            },
            {
              "time": "12:00:00",
              "type": "expense",
              "category": "餐饮",
              "amount": 20,
              "note": "午餐-快餐"
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
              "note": "药店购药"
            },
            {
              "time": "19:00:00",
              "type": "expense",
              "category": "教育",
              "amount": 300,
              "note": "购买在线课程"
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
              "note": "打车上班"
            },
            {
              "time": "13:00:00",
              "type": "expense",
              "category": "餐饮",
              "amount": 35,
              "note": "午餐-外卖"
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
              "note": "理财产品收益"
            },
            {
              "time": "20:00:00",
              "type": "expense",
              "category": "娱乐",
              "amount": 80,
              "note": "电影票"
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
              "note": "食堂早餐"
            },
            {
              "time": "18:30:00",
              "type": "expense",
              "category": "购物",
              "amount": 600,
              "note": "购买电子产品"
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
              "note": "朋友聚餐"
            },
            {
              "time": "16:00:00",
              "type": "income",
              "category": "兼职",
              "amount": 800,
              "note": "周末兼职收入"
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
              "note": "周末短途旅行"
            },
            {
              "time": "21:00:00",
              "type": "expense",
              "category": "娱乐",
              "amount": 100,
              "note": "酒吧消费"
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
              "note": "公交上班"
            },
            {
              "time": "12:30:00",
              "type": "expense",
              "category": "餐饮",
              "amount": 30,
              "note": "午餐-外卖"
            }
          ]
        }
      ]
    };
  },
  getters: {
    // 补全所有日期(原数据起始月期至今)
    completionDate() {
      const parseLocalDate = (dateStr) => {
        const [year, month, day] = dateStr.split("-").map(Number);
        return new Date(year, month - 1, day);
      };
      const getFirstDayOfMonth = (dateStr) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const y = firstDay.getFullYear();
        const m = String(firstDay.getMonth() + 1).padStart(2, "0");
        const d = String(firstDay.getDate()).padStart(2, "0");
        return `${y}-${m}-${d}`;
      };
      const startDateStr = getFirstDayOfMonth(this.datalist[0].date);
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
            weekday: getWeekDay(date),
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
    // 添加新数据
    addData(date, records) {
      const dayData = this.datalist.find((d) => d.date === date);
      if (dayData) {
        dayData.records.push(records);
      }
    },
    // 截取部分数据
    getPartData(targetDate) {
      const partData = this.datalist.filter((item) => item.date.startsWith(targetDate));
      return partData;
    },
    // 获取总统计
    getTotal(targetDate) {
      const partDate = this.getPartData(targetDate);
      if (partDate.length === 0) {
        return {
          income: 0,
          expense: 0
        };
      } else {
        return partDate.reduce((acc, day) => {
          day.records.forEach((record) => {
            acc.num += 1;
            record.type === "income" ? acc.income += record.amount : acc.expense += record.amount;
          });
          return acc;
        }, { income: 0, expense: 0, num: 0 });
      }
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
        categoryIncomePercentages[category] = (categoryIncome[category] / totalIncome * 100).toFixed(
          2
        );
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
const getWeekDay = (date) => {
  const day = new Date(date).getDay();
  const weekArr = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  return weekArr[day];
};
exports.userInfoStore = userInfoStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/stores/userinfo.js.map
