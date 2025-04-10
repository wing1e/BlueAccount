"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_panelinfo = require("../../stores/panelinfo.js");
if (!Array) {
  const _component_template = common_vendor.resolveComponent("template");
  _component_template();
}
if (!Math) {
  (pieChartVue + lineChartVue + barChartVue + panelVue + TabbarVue + AddPopVue)();
}
const TabbarVue = () => "../../components/Tabbar.js";
const panelVue = () => "./components/panel.js";
const pieChartVue = () => "../../components/pieChart.js";
const lineChartVue = () => "../../components/lineChart.js";
const barChartVue = () => "../../components/barChart.js";
const AddPopVue = () => "../../components/AddPop.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const { panelList } = stores_panelinfo.panelinfoStore();
    const chartList = common_vendor.reactive([
      {
        ...panelList[0],
        height: "30%"
      },
      {
        ...panelList[1],
        height: "25%"
      },
      {
        ...panelList[2],
        height: "25%"
      }
    ]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(chartList, (item, index, i0) => {
          return common_vendor.e({
            a: index === 0
          }, index === 0 ? {
            b: "4bc47aea-1-" + i0 + "," + ("4bc47aea-0-" + i0)
          } : {}, {
            c: index === 1
          }, index === 1 ? {
            d: "4bc47aea-2-" + i0 + "," + ("4bc47aea-0-" + i0)
          } : {}, {
            e: index === 2
          }, index === 2 ? {
            f: "4bc47aea-3-" + i0 + "," + ("4bc47aea-0-" + i0)
          } : {}, {
            g: "4bc47aea-0-" + i0,
            h: common_vendor.p({
              title: item.title
            }),
            i: index,
            j: item.height
          });
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4bc47aea"]]);
wx.createPage(MiniProgramPage);
