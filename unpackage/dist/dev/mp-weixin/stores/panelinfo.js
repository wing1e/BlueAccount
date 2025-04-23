"use strict";
const common_vendor = require("../common/vendor.js");
const utils_constants = require("../utils/constants.js");
const utils_getDate = require("../utils/get-date.js");
const panelinfoStore = common_vendor.defineStore("panelinfo", {
  state: () => {
    return {
      panelList: [
        {
          title: "分类统计",
          date: "2023-03",
          range: 1,
          allowRange: ["range_year", "range_month", "range_week", "range_day"],
          type: 0
        },
        {
          title: "日趋势",
          date: "2023-03",
          range: 0,
          allowRange: ["range_month", "range_week"],
          type: 0
        },
        {
          title: "月度收支",
          date: "2023",
          range: 0,
          allowRange: ["range_year"],
          type: 0
        }
      ]
    };
  },
  getters: {
    getPanelInfo: (state) => (title) => {
      const item = state.panelList.find((item2) => item2.title === title);
      const range = item ? item.allowRange.map((range2) => utils_constants.PICKER_INFO.picker_range[range2]) : [];
      return item ? {
        ...item,
        allowRange: range
      } : void 0;
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
    },
    reset(title) {
      const index = this.panelList.findIndex((item) => item.title === title);
      const { year, month, day } = utils_getDate.getNowDate();
      const origin = [
        {
          title: "分类统计",
          date: `${year}-${month.padStart(2, "0")}`,
          range: 1,
          allowRange: ["range_year", "range_month", "range_week", "range_day"],
          type: 0
        },
        {
          title: "日趋势",
          date: `${year}-${month.padStart(2, "0")}`,
          range: 0,
          allowRange: ["range_month", "range_week"],
          type: 0
        },
        {
          title: "月度收支",
          date: `${year}`,
          range: 0,
          allowRange: ["range_year"],
          type: 0
        }
      ];
      if (index > -1) {
        this.panelList.splice(index, 1, { ...origin[index] });
      }
    }
  }
});
exports.panelinfoStore = panelinfoStore;
