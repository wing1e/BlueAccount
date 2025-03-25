"use strict";
const common_vendor = require("../../../common/vendor.js");
const stores_userinfo = require("../../../stores/userinfo.js");
if (!Math) {
  RightButtonVue();
}
const RightButtonVue = () => "../../../components/RightButton.js";
const _sfc_main = {
  __name: "panel",
  props: {
    title: String,
    interval: String
  },
  setup(__props) {
    const { getTotal } = stores_userinfo.userInfoStore();
    const props = __props;
    const count = common_vendor.computed(() => {
      return getTotal(props.interval);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(props.title),
        b: common_vendor.t("-" + count.value.expense),
        c: common_vendor.t(props.interval)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-800bd557"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/chart/components/panel.js.map
