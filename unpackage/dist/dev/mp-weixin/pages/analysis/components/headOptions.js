"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_getDate = require("../../../utils/get-date.js");
const utils_timeChain = require("../../../utils/time-chain.js");
const stores_panelinfo = require("../../../stores/panelinfo.js");
const utils_format = require("../../../utils/format.js");
const utils_constants = require("../../../utils/constants.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "headOptions",
  props: ["panelTitle"],
  setup(__props) {
    common_vendor.onMounted(() => {
      range.value = panelinfo.getPanelInfo(props.panelTitle).allowRange;
    });
    const { year, month, date } = utils_getDate.getNowDate();
    const props = __props;
    const panelinfo = stores_panelinfo.panelinfoStore();
    const range = common_vendor.ref([]);
    const picker = common_vendor.computed(() => {
      const item = panelinfo.panelList.find((item2) => item2.title === props.panelTitle);
      return {
        date: (item == null ? void 0 : item.date) || "",
        range: (item == null ? void 0 : item.range) || 0,
        ...item
      };
    });
    const rangeChange = (e) => {
      const val = Number(e.detail.value);
      if (picker.value.range !== val) {
        setPickerDate(range[val]);
      }
    };
    const reduceDate = () => {
      const lastDate = utils_timeChain.timeChain(picker.value.date, picker.value.range, "last");
      panelChange({ date: lastDate, range: picker.value.range });
    };
    const addDate = () => {
      const nextDate = utils_timeChain.timeChain(picker.value.date, picker.value.range, "next");
      panelChange({ date: nextDate, range: picker.value.range });
    };
    const setPickerDate = (rangeValue) => {
      const { range_year, range_month, range_week, range_day } = utils_constants.PICKER_INFO.picker_range;
      let newDate;
      switch (rangeValue) {
        case range_year:
          newDate = String(year);
          break;
        case range_month:
          newDate = `${year}-${month}`;
          break;
        case range_week:
          const { start, end } = utils_getDate.getWeek(date);
          newDate = { start, end };
          break;
        case range_day:
          newDate = date;
          break;
        default:
          console.error("无效的范围值:", rangeValue);
          return;
      }
      const data = { date: newDate, range: rangeValue };
      panelChange(data);
    };
    const panelChange = (data) => {
      panelinfo.setPanel(props.panelTitle, data);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "left",
          size: "14"
        }),
        b: common_vendor.o(reduceDate),
        c: common_vendor.t(common_vendor.unref(utils_format.formatOptionsDate)(picker.value.date, picker.value.range)),
        d: common_vendor.p({
          type: "down"
        }),
        e: range.value,
        f: picker.value.range,
        g: common_vendor.o(rangeChange),
        h: common_vendor.p({
          type: "right",
          size: "14"
        }),
        i: common_vendor.o(addDate)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b5b25a55"]]);
wx.createComponent(Component);
