"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_getDate = require("../../../utils/get-date.js");
const utils_timeChain = require("../../../utils/time-chain.js");
const stores_panelinfo = require("../../../stores/panelinfo.js");
const utils_format = require("../../../utils/format.js");
const utils_constants = require("../../../utils/constants.js");
const utils_examiner = require("../../../utils/examiner.js");
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
    const typeArr = Object.values(utils_constants.PICKER_INFO.picker_type);
    const picker = common_vendor.computed(() => {
      const item = panelinfo.panelList.find(
        (item2) => item2.title === props.panelTitle
      );
      return { ...item };
    });
    const rangeChange = (e) => {
      const val = Number(e.detail.value);
      if (picker.value.range !== val) {
        const newDate = setPickerDate(range.value[val]);
        panelChange({ date: newDate, range: val });
      }
    };
    const typeChange = (e) => {
      const val = Number(e.detail.value);
      if (picker.value.type !== val) {
        panelChange({ type: val });
      }
    };
    const reduceDate = () => {
      const dateType = range.value[picker.value.range];
      const lastDate = utils_timeChain.timeChain(picker.value.date, dateType, "last");
      if (utils_examiner.OptionsActionExaminer(lastDate)) {
        panelChange({ date: lastDate, range: picker.value.range });
      } else {
        common_vendor.index.showToast({
          title: "超出当前时间范围",
          icon: "none",
          duration: 2e3
        });
      }
    };
    const addDate = () => {
      const dateType = range.value[picker.value.range];
      const nextDate = utils_timeChain.timeChain(picker.value.date, dateType, "next");
      if (utils_examiner.OptionsActionExaminer(nextDate)) {
        panelChange({ date: nextDate, range: picker.value.range });
      } else {
        common_vendor.index.showToast({
          title: "超出当前时间范围",
          icon: "none",
          duration: 2e3
        });
      }
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
      return newDate;
    };
    const reset = () => {
      panelinfo.reset(props.panelTitle);
    };
    const panelChange = (data) => {
      panelinfo.setPanel(props.panelTitle, data);
      console.log(picker.value);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "left",
          size: "14"
        }),
        b: common_vendor.o(reduceDate),
        c: common_vendor.t(common_vendor.unref(utils_format.formatOptionsDate)(picker.value.date, range.value[picker.value.range])),
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
        i: common_vendor.o(addDate),
        j: common_vendor.t(common_vendor.unref(typeArr)[picker.value.type]),
        k: common_vendor.unref(typeArr),
        l: picker.value.type,
        m: common_vendor.o(typeChange),
        n: common_vendor.o(reset)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b5b25a55"]]);
wx.createComponent(Component);
