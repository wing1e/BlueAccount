"use strict";
const common_vendor = require("../../../common/vendor.js");
const stores_panelinfo = require("../../../stores/panelinfo.js");
const stores_userinfo = require("../../../stores/userinfo.js");
const utils_format = require("../../../utils/format.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const PANEL_TITLE = "日趋势";
const _sfc_main = {
  __name: "trendList",
  setup(__props) {
    const userinfo = stores_userinfo.userInfoStore();
    const panelinfo = stores_panelinfo.panelinfoStore();
    const flag = common_vendor.computed(() => panelinfo.getPanelInfo(PANEL_TITLE).type === 0 ? "expense" : "income");
    const data = common_vendor.computed(() => {
      const listDate = panelinfo.getPanelInfo(PANEL_TITLE).date;
      const partData = userinfo.getPartData(listDate);
      const originData = partData.map((item) => {
        const date = item.date;
        const others = item.records.reduce(
          (acc, record) => {
            record.type === "expense" ? acc.expense += record.amount : acc.income += record.amount;
            acc.count++;
            return acc;
          },
          { expense: 0, income: 0, count: 0 }
        );
        const total = userinfo.getTotal(listDate);
        return { date, ...others, percent: { expense: (others.expense / total.expense * 100).toFixed(2), income: (others.income / total.income * 100).toFixed(2) } };
      });
      return originData.filter((item) => item.count > 0);
    });
    console.log(data.value);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(data.value, (item, index, i0) => {
          return {
            a: "774075f3-0-" + i0,
            b: common_vendor.t(common_vendor.unref(utils_format.formatDate)(item.date)),
            c: common_vendor.t(item.percent[flag.value] + "%"),
            d: common_vendor.t("   ·   " + item.count + "笔"),
            e: common_vendor.t(item[flag.value]),
            f: index
          };
        }),
        b: common_vendor.p({
          type: "smallcircle-filled",
          size: "10",
          color: "#FE5D20"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-774075f3"]]);
wx.createComponent(Component);
