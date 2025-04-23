"use strict";
const common_vendor = require("../common/vendor.js");
const utils_getDate = require("../utils/get-date.js");
const userInfoStore = common_vendor.defineStore("userInfo", {
  state: () => {
    return {
      datalist: [
        {
          "date": "2023-03-01",
          "weekday": "周三",
          "records": [
            {
              "time": "09:00:00",
              "type": "expense",
              "category": "餐饮",
              "amount": 8.5,
              "note": "食堂早餐"
            },
            {
              "time": "12:30:00",
              "type": "expense",
              "category": "餐饮",
              "amount": 10.5,
              "note": "午餐-食堂"
            },
            {
              "time": "17:20:00",
              "type": "income",
              "category": "兼职",
              "amount": 200,
              "note": "咸鱼"
            }
          ]
        },
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
              "category": "购物",
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
              "time": "12:30:00",
              "type": "expense",
              "category": "餐饮",
              "amount": 38.5,
              "note": "午餐-麦当劳套餐"
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
              "time": "09:00:00",
              "type": "expense",
              "category": "餐饮",
              "amount": 8.5,
              "note": "食堂早餐"
            },
            {
              "time": "10:00:00",
              "type": "expense",
              "category": "交通",
              "amount": 150,
              "note": "机场快车"
            },
            {
              "time": "12:30:00",
              "type": "expense",
              "category": "餐饮",
              "amount": 38.5,
              "note": "午餐-麦当劳套餐"
            },
            {
              "time": "17:20:00",
              "type": "income",
              "category": "兼职",
              "amount": 1500,
              "note": "家教课时费"
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
              "time": "09:00:00",
              "type": "expense",
              "category": "餐饮",
              "amount": 8.5,
              "note": "食堂早餐"
            },
            {
              "time": "12:30:00",
              "type": "expense",
              "category": "餐饮",
              "amount": 20.5,
              "note": "午餐-麦当劳套餐"
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
          "date": "2023-03-19",
          "weekday": "周日",
          "records": [
            {
              "time": "09:00:00",
              "type": "expense",
              "category": "餐饮",
              "amount": 8.5,
              "note": "食堂早餐"
            },
            {
              "time": "12:30:00",
              "type": "expense",
              "category": "餐饮",
              "amount": 38.5,
              "note": "午餐-麦当劳套餐"
            },
            {
              "time": "17:20:00",
              "type": "income",
              "category": "兼职",
              "amount": 1e3,
              "note": "家教课时费"
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
      const endDateStr = utils_getDate.getNowDate().date;
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
    // 获取指定日期的数据
    getPartData: (state) => (targetDate) => {
      if (targetDate === "") {
        return state.datalist;
      }
      if (targetDate.start) {
        const startDate = new Date(targetDate.start);
        const endDate = new Date(targetDate.end);
        return state.datalist.filter((day) => {
          const date = new Date(day.date);
          return date >= startDate && date <= endDate;
        });
      }
      const partData = state.datalist.filter((item) => item.date.startsWith(targetDate));
      return partData;
    },
    // 获取总数
    getTotal() {
      return (targetDate) => {
        const partDate = this.getPartData(targetDate);
        if (partDate.length === 0) {
          return {
            income: 0,
            expense: 0,
            num: 0
          };
        } else {
          return partDate.reduce((acc, day) => {
            day.records.forEach((record) => {
              acc.num += 1;
              record.type === "income" ? acc.income += record.amount : acc.expense += record.amount;
            });
            return acc;
          }, {
            income: 0,
            expense: 0,
            num: 0
          });
        }
      };
    },
    // 获取分类信息
    getCategoryInfo() {
      return (targetDate) => {
        const filteredData = this.getPartData(targetDate);
        const result = {
          income: [],
          expense: []
        };
        const totals = filteredData.reduce((acc, day) => {
          day.records.forEach((record) => {
            if (record.type === "income") {
              acc.incomeTotal += record.amount;
            } else {
              acc.expenseTotal += record.amount;
            }
          });
          return acc;
        }, {
          incomeTotal: 0,
          expenseTotal: 0
        });
        const categoryMap = filteredData.reduce((acc, day) => {
          day.records.forEach((record) => {
            const type = record.type;
            const category = record.category;
            if (!acc[type][category]) {
              acc[type][category] = {
                amount: 0,
                count: 0
              };
            }
            acc[type][category].amount += record.amount;
            acc[type][category].count++;
          });
          return acc;
        }, {
          income: {},
          expense: {}
        });
        const typeArr = ["income", "expense"];
        typeArr.forEach((type) => {
          Object.entries(categoryMap[type]).forEach(([category, data]) => {
            const total = type === "income" ? totals.incomeTotal : totals.expenseTotal;
            result[type].push({
              category,
              percent: (data.amount / total * 100).toFixed(2),
              count: data.count,
              total: data.amount
            });
          });
        });
        return result;
      };
    }
  },
  actions: {
    // 添加新数据
    addData(date, records) {
      const dayData = this.datalist.find((d) => d.date === date);
      if (dayData) {
        dayData.records.push(records);
      }
    }
  }
});
const getWeekDay = (date) => {
  const day = new Date(date).getDay();
  const weekArr = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  return weekArr[day];
};
exports.userInfoStore = userInfoStore;
