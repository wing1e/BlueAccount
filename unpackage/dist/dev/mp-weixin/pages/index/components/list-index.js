"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "../../../uni_modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  _easycom_u_icon();
}
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
    common_vendor.index.__f__("log", "at pages/index/components/list-index.vue:138", data.length);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(data, (value, key, i0) => {
          return common_vendor.e({
            a: common_vendor.t(value.date.split("-")[1] + "-" + value.date.split("-")[2]),
            b: common_vendor.t(value.date.split("-")[0] + "年"),
            c: key !== data.length - 1
          }, key !== data.length - 1 ? {} : {}, {
            d: common_vendor.f(value.records, (item, i, i1) => {
              return common_vendor.e({
                a: i !== 0
              }, i !== 0 ? {} : {}, {
                b: "11ed7158-0-" + i0 + "-" + i1,
                c: common_vendor.t(item.category),
                d: common_vendor.t(item.note),
                e: common_vendor.t(item.type === "income" ? item.amount : "-" + item.amount),
                f: i
              });
            }),
            e: key
          });
        }),
        b: common_vendor.p({
          name: "star",
          size: "30"
        })
      };
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/index/components/list-index.js.map
