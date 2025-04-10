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
  __name: "list",
  setup(__props) {
    const { datalist } = stores_userinfo.userInfoStore();
    const data = common_vendor.computed(() => {
      const origin = datalist.slice(-7).reverse();
      return origin.filter((item) => {
        if (item.records[0]) {
          return item;
        }
      });
    });
    const toDetails = () => {
      common_vendor.index.navigateTo({
        url: "/pages/details/index"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(toDetails),
        b: common_vendor.p({
          type: "right",
          size: "20",
          color: "#00B6E6"
        }),
        c: common_vendor.f(data.value, (value, key, i0) => {
          return common_vendor.e({
            a: value.records[0]
          }, value.records[0] ? common_vendor.e({
            b: common_vendor.t(value.date.split("-")[1] + "-" + value.date.split("-")[2]),
            c: common_vendor.t(value.date.split("-")[0] + "年"),
            d: key !== data.value.length - 1
          }, key !== data.value.length - 1 ? {} : {}) : {}, {
            e: common_vendor.f(value.records, (item, i, i1) => {
              return common_vendor.e({
                a: i !== 0
              }, i !== 0 ? {} : {}, {
                b: common_vendor.t(item.category),
                c: common_vendor.t(item.note),
                d: common_vendor.t(item.type === "income" ? item.amount : "-" + item.amount),
                e: i
              });
            }),
            f: key
          });
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8420a3fd"]]);
wx.createComponent(Component);
