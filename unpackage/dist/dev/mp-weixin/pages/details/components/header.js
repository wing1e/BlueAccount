"use strict";
const common_vendor = require("../../../common/vendor.js");
const stores_userinfo = require("../../../stores/userinfo.js");
const utils_nowDate = require("../../../utils/now-date.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "header",
  props: ["filterData"],
  emits: ["filterChange"],
  setup(__props, { emit: __emit }) {
    common_vendor.onMounted(() => {
      setPickerDate(dateRange.value);
    });
    const { datalist } = stores_userinfo.userInfoStore();
    const props = __props;
    common_vendor.ref(datalist[0].date);
    const { year, month, day, date } = utils_nowDate.getNowDate();
    const range = ["年范围", "月范围", "日范围"];
    const orderArr = ["日期降序", "日期升序", "金额降序", "金额升序"];
    const dateRange = common_vendor.ref(props.filterData.range);
    const pickerDate = common_vendor.ref(props.filterData.date);
    const pickerOrder = common_vendor.ref(props.filterData.order);
    const emit = __emit;
    const rangeChange = (e) => {
      dateRange.value = e.target.value;
      setPickerDate(Number(e.target.value));
    };
    const setPickerDate = (rangeValue) => {
      if (rangeValue === 0) {
        pickerDate.value = year;
        emitFilterData();
      } else if (rangeValue === 1) {
        pickerDate.value = year + "-" + month;
        emitFilterData();
      } else if (rangeValue === 2) {
        pickerDate.value = date;
        emitFilterData();
      }
    };
    const showDate = (date2) => {
      if (dateRange.value == 0) {
        return date2;
      }
      if (dateRange.value == 1) {
        const show = date2.split("-");
        if (show[0] == year) {
          return parseInt(show[1]) + "月";
        }
        return show;
      }
      if (dateRange.value == 2) {
        const show = date2.split("-");
        if (show[0] == year) {
          return parseInt(show[1]) + "." + parseInt(show[2]);
        }
        return show;
      }
    };
    const orderChange = (e) => {
      pickerOrder.value = orderArr[e.target.value];
      emitFilterData();
    };
    const reset = () => {
      pickerDate.value = [utils_nowDate.getNowDate().year, utils_nowDate.getNowDate().month].join("-");
      pickerOrder.value = orderArr[0];
      emitFilterData();
    };
    const emitFilterData = () => {
      emit("filterChange", {
        range: dateRange.value,
        date: pickerDate.value,
        order: pickerOrder.value
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(showDate(pickerDate.value)),
        b: common_vendor.p({
          type: "down"
        }),
        c: range,
        d: dateRange.value,
        e: common_vendor.o(rangeChange),
        f: common_vendor.t(pickerOrder.value),
        g: common_vendor.p({
          type: "down"
        }),
        h: orderArr,
        i: common_vendor.o(orderChange),
        j: common_vendor.o(reset)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3cc3660d"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/details/components/header.js.map
