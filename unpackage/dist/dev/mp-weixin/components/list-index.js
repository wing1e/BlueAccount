"use strict";
const _sfc_main = {
  __name: "list-index",
  props: ["indexH"],
  setup(__props) {
    const prop = __props;
    return (_ctx, _cache) => {
      return {
        a: prop.indexH * 0.05 + "px",
        b: prop.indexH * 0.5 + "px"
      };
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/list-index.js.map
