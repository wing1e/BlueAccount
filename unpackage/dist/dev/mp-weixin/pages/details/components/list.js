"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_format = require("../../../utils/format.js");
const stores_userinfo = require("../../../stores/userinfo.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "list",
  props: ["filterData"],
  setup(__props) {
    const props = __props;
    const { getPartData } = stores_userinfo.userInfoStore();
    const listData = common_vendor.computed(() => {
      const { date, order } = props.filterData;
      const { key, order: sortOrder } = handleSort(order);
      const origin = getPartData(date).filter((item) => (item == null ? void 0 : item.records) && Array.isArray(item.records) && (item == null ? void 0 : item.records.length) > 0);
      if (key === "date") {
        const sortByDate = [...origin].sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        });
        return sortByDate.map((item) => {
          item.records = item.records.sort((a, b) => {
            const dateA = (/* @__PURE__ */ new Date(`${item.date} ${a.time}`)).getTime();
            const dateB = (/* @__PURE__ */ new Date(`${item.date} ${b.time}`)).getTime();
            return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
          });
          return item;
        });
      } else if (key === "amount") {
        const newData = [];
        origin.forEach((item) => {
          item.records.forEach((record) => {
            newData.push({ date: item.date, ...record });
          });
        });
        const a = newData.sort((a2, b) => {
          const amountA = a2.amount;
          const amountB = b.amount;
          return sortOrder === "asc" ? amountA - amountB : amountB - amountA;
        });
        common_vendor.index.__f__("log", "at pages/details/components/list.vue:83", a);
        return a;
      }
      return origin;
    });
    const handleSort = (orderIndex) => {
      const sortType = [
        { key: "date", order: "desc" },
        { key: "date", order: "asc" },
        { key: "amount", order: "desc" },
        { key: "amount", order: "asc" }
      ];
      return sortType[orderIndex];
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: handleSort(props.filterData.order).key === "date"
      }, handleSort(props.filterData.order).key === "date" ? {
        b: common_vendor.f(listData.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.records[0]
          }, item.records[0] ? {
            b: common_vendor.t(common_vendor.unref(utils_format.formatDate)(item.date) + "   " + item.weekday)
          } : {}, {
            c: item.records[0]
          }, item.records[0] ? {
            d: common_vendor.f(item.records, (record, i, i1) => {
              return common_vendor.e({
                a: "cee0d0e9-0-" + i0 + "-" + i1,
                b: common_vendor.t(record.category),
                c: common_vendor.t(record.time),
                d: record.note
              }, record.note ? {
                e: common_vendor.t("   ·   " + record.note)
              } : {}, {
                f: common_vendor.t(record.type === "income" ? record.amount : "-" + record.amount),
                g: i
              });
            }),
            e: common_vendor.p({
              type: "smallcircle-filled",
              size: "8",
              color: "#FE5D20"
            })
          } : {}, {
            f: index
          });
        })
      } : {}, {
        c: handleSort(props.filterData.order).key === "amount"
      }, handleSort(props.filterData.order).key === "amount" ? {
        d: common_vendor.f(listData.value, (item, index, i0) => {
          return common_vendor.e({
            a: "cee0d0e9-1-" + i0,
            b: common_vendor.t(item.category),
            c: common_vendor.t(item.date),
            d: item.note
          }, item.note ? {
            e: common_vendor.t("   ·   " + item.note)
          } : {}, {
            f: common_vendor.t(item.type === "income" ? item.amount : "-" + item.amount),
            g: index
          });
        }),
        e: common_vendor.p({
          type: "smallcircle-filled",
          size: "8",
          color: "#FE5D20"
        })
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cee0d0e9"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/details/components/list.js.map
