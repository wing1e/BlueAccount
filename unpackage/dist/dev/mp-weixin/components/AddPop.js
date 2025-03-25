"use strict";
const common_vendor = require("../common/vendor.js");
const stores_tabbar = require("../stores/tabbar.js");
const utils_chart_pieChart = require("../utils/chart/pie-chart.js");
const utils_nowDate = require("../utils/now-date.js");
const stores_userinfo = require("../stores/userinfo.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
const _sfc_main = {
  __name: "AddPop",
  setup(__props) {
    const popup = common_vendor.ref(null);
    common_vendor.watch(() => stores_tabbar.tabBarStore().pop, (newVal) => {
      newVal ? open() : close();
    });
    const open = () => {
      var _a;
      (_a = popup.value) == null ? void 0 : _a.open();
    };
    const close = () => {
      var _a;
      (_a = popup.value) == null ? void 0 : _a.close();
    };
    const popChange = (e) => {
      stores_tabbar.tabBarStore().pop = e == null ? void 0 : e.show;
    };
    const form = common_vendor.reactive({
      date: "",
      records: {
        time: "",
        type: "expense",
        category: "",
        amount: "",
        note: ""
      }
    });
    const titleStyle = (type) => {
      if (form.records.type === type) {
        return { color: "#000", line: true };
      } else {
        return { color: "#8B97A9", line: false };
      }
    };
    const categoryStyle = (category) => {
      if (category === form.records.category) {
        return { bs: "#00B6E6 1rpx solid;", fs: "#00B6E6" };
      }
    };
    const { addData } = stores_userinfo.userInfoStore();
    const submit = () => {
      form.date = utils_nowDate.getNowDate().date;
      form.records.time = utils_nowDate.getNowDate().time;
      if (formValidate()) {
        addData(form.date, form.records);
        reset();
      }
    };
    const formValidate = () => {
      if (form.records.amount === "") {
        common_vendor.index.showToast({
          title: "请选择金额",
          icon: "error"
        });
        return false;
      } else if (form.records.category === "") {
        common_vendor.index.showToast({
          title: "请选择种类",
          icon: "error"
        });
        return false;
      }
      return true;
    };
    const reset = () => {
      form.date = "";
      form.records = {
        time: "",
        type: "expense",
        category: "",
        amount: "",
        note: ""
      };
      close();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: titleStyle("expense").color,
        b: titleStyle("expense").line
      }, titleStyle("expense").line ? {} : {}, {
        c: common_vendor.o(($event) => form.records.type = "expense"),
        d: titleStyle("income").color,
        e: titleStyle("income").line
      }, titleStyle("income").line ? {} : {}, {
        f: common_vendor.o(($event) => form.records.type = "income"),
        g: common_vendor.o(reset),
        h: form.records.type === "expense"
      }, form.records.type === "expense" ? {} : {}, {
        i: form.records.amount,
        j: common_vendor.o(common_vendor.m(($event) => form.records.amount = $event.detail.value, {
          number: true
        })),
        k: common_vendor.f(form.records.type === "expense" ? common_vendor.unref(utils_chart_pieChart.EXPENSE_TYPE) : common_vendor.unref(utils_chart_pieChart.INCOME_TYPE), (item, index, i0) => {
          var _a, _b;
          return {
            a: common_vendor.t(item.category),
            b: index,
            c: common_vendor.o(($event) => form.records.category = item.category, index),
            d: (_a = categoryStyle(item.category)) == null ? void 0 : _a.bs,
            e: (_b = categoryStyle(item.category)) == null ? void 0 : _b.fs
          };
        }),
        l: form.records.note,
        m: common_vendor.o(($event) => form.records.note = $event.detail.value),
        n: common_vendor.o(submit),
        o: common_vendor.sr(popup, "e274f890-0", {
          "k": "popup"
        }),
        p: common_vendor.o(popChange),
        q: common_vendor.p({
          type: "bottom",
          animation: true,
          ["background-color"]: "#fff",
          ["border-radius"]: "20rpx 20rpx 0 0"
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e274f890"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/AddPop.js.map
