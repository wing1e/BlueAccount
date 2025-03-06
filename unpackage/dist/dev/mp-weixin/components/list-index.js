"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
const _sfc_main = {
  __name: "list-index",
  props: ["indexH"],
  setup(__props) {
    const data = common_vendor.reactive([
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
      }
    ]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(data, (value, key, i0) => {
          return {
            a: common_vendor.t(value.date),
            b: common_vendor.f(value.records, (item, i, i1) => {
              return common_vendor.e({
                a: i !== 0
              }, i !== 0 ? {} : {}, {
                b: common_vendor.t(item.type),
                c: common_vendor.t(item.note),
                d: common_vendor.t(item.amount),
                e: i
              });
            }),
            c: key
          };
        }),
        b: common_assets._imports_0
      };
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/list-index.js.map
