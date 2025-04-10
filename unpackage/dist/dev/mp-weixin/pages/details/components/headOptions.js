"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_timeChain = require("../../../utils/time-chain.js");
const utils_getDate = require("../../../utils/get-date.js");
const utils_format = require("../../../utils/format.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const RANGE_YEAR = 0;
const RANGE_MONTH = 1;
const RANGE_WEEK = 2;
const RANGE_DAY = 3;
const _sfc_main = {
  __name: "headOptions",
  props: ["filterData"],
  emits: ["filterChange"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const { year, month, date } = utils_getDate.getNowDate();
    const range = ["年范围", "月范围", "周范围", "日范围"];
    const orderArr = ["日期降序", "日期升序", "金额降序", "金额升序"];
    const pickerRange = common_vendor.ref(props.filterData.range);
    const pickerDate = common_vendor.ref(props.filterData.date);
    const pickerOrder = common_vendor.ref(props.filterData.order);
    const emit = __emit;
    const rangeChange = (e) => {
      const val = Number(e.detail.value);
      if (pickerRange.value !== val) {
        pickerRange.value = val;
        setPickerDate(val);
      }
    };
    const reduceDate = () => {
      const lastDate = utils_timeChain.timeChain(pickerDate.value, pickerRange.value, "last");
      pickerDate.value = lastDate;
      emitFilterData();
    };
    const addDate = () => {
      const nextDate = utils_timeChain.timeChain(pickerDate.value, pickerRange.value, "next");
      pickerDate.value = nextDate;
      emitFilterData();
    };
    const setPickerDate = (rangeValue) => {
      let newDate;
      switch (rangeValue) {
        case RANGE_YEAR:
          newDate = String(year);
          break;
        case RANGE_MONTH:
          newDate = `${year}-${month}`;
          break;
        case RANGE_DAY:
          newDate = date;
          break;
        case RANGE_WEEK:
          const { start, end } = utils_getDate.getWeek(date);
          newDate = { start, end };
          break;
        default:
          console.error("无效的范围值:", rangeValue);
          return;
      }
      pickerDate.value = newDate;
      emitFilterData();
    };
    const orderChange = (e) => {
      if (pickerOrder.value !== e.target.value) {
        pickerOrder.value = e.target.value;
        emitFilterData();
      }
    };
    const reset = () => {
      pickerRange.value = 1;
      pickerOrder.value = 0;
      pickerDate.value = [year, month].join("-");
      emitFilterData();
    };
    const emitFilterData = () => {
      emit("filterChange", {
        range: pickerRange.value,
        date: pickerDate.value,
        order: pickerOrder.value
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "left",
          size: "14"
        }),
        b: common_vendor.o(reduceDate),
        c: common_vendor.t(common_vendor.unref(utils_format.formatOptionsDate)(pickerDate.value, pickerRange.value)),
        d: common_vendor.p({
          type: "down"
        }),
        e: range,
        f: pickerRange.value,
        g: common_vendor.o(rangeChange),
        h: common_vendor.p({
          type: "right",
          size: "14"
        }),
        i: common_vendor.o(addDate),
        j: common_vendor.t(orderArr[pickerOrder.value]),
        k: common_vendor.p({
          type: "down"
        }),
        l: orderArr,
        m: common_vendor.o(orderChange),
        n: common_vendor.o(reset)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d09e3cbe"]]);
wx.createComponent(Component);
