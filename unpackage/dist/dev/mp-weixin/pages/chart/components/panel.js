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
    const data = common_vendor.computed(() => {
      const panelDate = panelinfo.getPanelInfo(props.title).date;
      return { date: panelDate, amount: getTotal(panelDate) };
    });
    const toAnalysis = () => {
      common_vendor.index.navigateTo({
        url: `/pages/analysis/index?title=${props.title}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(props.title),
        b: common_vendor.t("-" + data.value.amount.expense),
        c: common_vendor.t(common_vendor.unref(utils_format.formatDate)(data.value.date)),
        d: common_vendor.o(toAnalysis)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-800bd557"]]);
wx.createComponent(Component);
