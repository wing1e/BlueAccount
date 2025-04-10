"use strict";
const common_vendor = require("../common/vendor.js");
const utils_constants = require("../utils/constants.js");
const panelinfoStore = common_vendor.defineStore("panelinfo", {
  state: () => {
    return {
      panelList: [
        {
          title: "分类统计",
          date: "2023-03",
          range: 1,
          allowRange: ["range_year", "range_month", "range_week", "range_day"]
        },
        {
          title: "日趋势",
          date: "2023-03",
          range: 1,
          allowRange: ["range_year", "range_month", "range_week"]
        },
        {
          title: "月度收支",
          date: "2023",
          range: 0,
          allowRange: ["range_year"]
        }
      ]
    };
  },
  getters: {
    getPanelInfo: (state) => (title) => {
      const item = state.panelList.find((item2) => item2.title === title);
      const range = item ? item.allowRange.map((range2) => utils_constants.PICKER_INFO.picker_range[range2]) : [];
      return item ? { ...item, allowRange: range } : void 0;
    }
  },
  actions: {
    setPanel(title, data) {
      const index = this.panelList.findIndex((item) => item.title === title);
      if (index > -1) {
        this.panelList.splice(index, 1, {
          ...this.panelList[index],
          ...data
        });
      }
    }
  }
});
exports.panelinfoStore = panelinfoStore;
