"use strict";
const common_vendor = require("../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "ListOptions",
  props: ["optionData"],
  setup(__props) {
    const props = __props;
    const { time, category, note, amount, type } = props.optionData;
    common_vendor.index.__f__("log", "at components/ListOptions.vue:20", props.optionData);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          type: "smallcircle-filled",
          size: "8",
          color: "#FE5D20"
        }),
        b: common_vendor.t(common_vendor.unref(category)),
        c: common_vendor.unref(note)
      }, common_vendor.unref(note) ? {
        d: common_vendor.t("   ·   " + common_vendor.unref(note))
      } : {}, {
        e: common_vendor.t(common_vendor.unref(type) === "income" ? common_vendor.unref(amount) : "-" + common_vendor.unref(amount))
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b1f5ba4b"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/ListOptions.js.map
