"use strict";
const common_vendor = require("../../../common/vendor.js");
const stores_userinfo = require("../../../stores/userinfo.js");
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
  setup(__props) {
    const {
      datalist
    } = stores_userinfo.userInfoStore();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(datalist), (value, key, i0) => {
          return common_vendor.e({
            a: common_vendor.t(value.date.split("-")[1] + "-" + value.date.split("-")[2]),
            b: common_vendor.t(value.date.split("-")[0] + "年"),
            c: key !== common_vendor.unref(datalist).length - 1
          }, key !== common_vendor.unref(datalist).length - 1 ? {} : {}, {
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
