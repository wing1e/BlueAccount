"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_chartinterval = require("../../stores/chartinterval.js");
if (!Array) {
  const _component_template = common_vendor.resolveComponent("template");
  _component_template();
}
if (!Math) {
  (pieChartVue + lineChartVue + barChartVue + panelVue + tabbarVue + AddPopVue)();
}
const tabbarVue = () => "../../components/tabbar.js";
const panelVue = () => "./components/panel.js";
const pieChartVue = () => "./components/pieChart.js";
const lineChartVue = () => "./components/lineChart.js";
const barChartVue = () => "./components/barChart.js";
const AddPopVue = () => "../../components/AddPop.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const { status } = stores_chartinterval.chartInterval();
    const chartList = [
      {
        title: "分类统计",
        component: pieChartVue,
        interval: status.pieChart,
        height: "30%"
      },
      {
        title: "日趋势",
        component: lineChartVue,
        interval: status.lineChart,
        height: "25%"
      },
      {
        title: "月度收支",
        component: barChartVue,
        interval: status.barChart,
        height: "25%"
      }
    ];
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
              title: item.title,
              interval: item.interval
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
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/chart/index.js.map
