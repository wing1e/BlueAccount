"use strict";
const common_vendor = require("../../../common/vendor.js");
const stores_userinfo = require("../../../stores/userinfo.js");
const utils_format = require("../../../utils/format.js");
const stores_panelinfo = require("../../../stores/panelinfo.js");
if (!Math) {
  RightButtonVue();
}
const RightButtonVue = () => "../../../components/RightButton.js";
const _sfc_main = {
  __name: "panel",
  props: {
    title: String
  },
  setup(__props) {
    const { getTotal } = stores_userinfo.userInfoStore();
    const panelinfo = stores_panelinfo.panelinfoStore();
    const props = __props;
    const panelData = common_vendor.computed(() => {
      const { date, allowRange, range, type } = panelinfo.getPanelInfo(props.title);
      return {
        date,
        rangeVal: allowRange[range],
        type,
        typeText: type === 0 ? "支出" : "收入",
        amount: type === 0 ? getTotal(date).expense : getTotal(date).income
      };
    });
    console.log(panelData.value);
    const toAnalysis = () => {
      common_vendor.index.navigateTo({
        url: `/pages/analysis/index?title=${props.title}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(props.title),
        b: common_vendor.t(panelData.value.type === 0 ? "-" : ""),
        c: common_vendor.t(panelData.value.amount),
        d: common_vendor.t(common_vendor.unref(utils_format.formatOptionsDate)(panelData.value.date, panelData.value.rangeVal) + " · " + panelData.value.typeText),
        e: common_vendor.o(toAnalysis)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-800bd557"]]);
wx.createComponent(Component);
