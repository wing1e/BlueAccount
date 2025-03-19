"use strict";
const common_vendor = require("../../../common/vendor.js");
const stores_userinfo = require("../../../stores/userinfo.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "list-index",
  setup(__props) {
    const { datalist, getLastsevenData } = stores_userinfo.userInfoStore();
    const data = common_vendor.computed(() => {
      return datalist.slice(-7).reverse();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "right",
          size: "20",
          color: "#00B6E6"
        }),
        b: common_vendor.f(data.value, (value, key, i0) => {
          return common_vendor.e({
            a: common_vendor.t(value.date.split("-")[1] + "-" + value.date.split("-")[2]),
            b: common_vendor.t(value.date.split("-")[0] + "年"),
            c: key !== data.value.length - 1
          }, key !== data.value.length - 1 ? {} : {}, {
            d: common_vendor.f(value.records, (item, i, i1) => {
              return common_vendor.e({
                a: i !== 0
              }, i !== 0 ? {} : {}, {
                b: common_vendor.t(item.category),
                c: common_vendor.t(item.note),
                d: common_vendor.t(item.type === "income" ? item.amount : "-" + item.amount),
                e: i
              });
            }),
            e: key
          });
        })
      };
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/index/components/list-index.js.map
