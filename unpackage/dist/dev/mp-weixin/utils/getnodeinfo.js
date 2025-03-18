"use strict";
const common_vendor = require("../common/vendor.js");
const getNodeInfo = async (instance, nodeName) => {
  return new Promise((res, rej) => {
    const query = common_vendor.index.createSelectorQuery().in(instance);
    query.select(nodeName).boundingClientRect().exec((data) => {
      if (data && data[0]) {
        res(data);
      } else {
        rej(new Error("Element not found"));
      }
    });
  });
};
exports.getNodeInfo = getNodeInfo;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/getnodeinfo.js.map
