"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_constants = require("../../../utils/constants.js");
const stores_userinfo = require("../../../stores/userinfo.js");
const stores_panelinfo = require("../../../stores/panelinfo.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const PANEL_TITLE = "分类统计";
const _sfc_main = {
  __name: "classfiyList",
  setup(__props) {
    const panelinfo = stores_panelinfo.panelinfoStore();
    const userinfo = stores_userinfo.userInfoStore();
    const typeVal = common_vendor.computed(() => panelinfo.getPanelInfo(PANEL_TITLE).type);
    const listData = common_vendor.computed(() => {
      const listDate = panelinfo.getPanelInfo(PANEL_TITLE).date;
      const originData = userinfo.getCategoryInfo(listDate);
      if (typeVal.value === 0) {
        return originData.expense;
      } else {
        return originData.income;
      }
    });
    const getColor = (val) => {
      if (typeVal.value === 0) {
        const item = utils_constants.EXPENSE_TYPE.find((item2) => item2.category === val);
        return item ? item.color : "#9E9E9E";
      } else {
        const item = utils_constants.INCOME_TYPE.find((item2) => item2.category === val);
        return item ? item.color : "#9E9E9E";
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(listData.value, (item, index, i0) => {
          return {
            a: "0c9894ce-0-" + i0,
            b: common_vendor.p({
              type: "smallcircle-filled",
              size: "10",
              color: getColor(item.category)
            }),
            c: common_vendor.t(item.category),
            d: common_vendor.t(item.percent + "%"),
            e: common_vendor.t("     " + item.count + "笔"),
            f: common_vendor.t(item.total),
            g: index
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0c9894ce"]]);
wx.createComponent(Component);
