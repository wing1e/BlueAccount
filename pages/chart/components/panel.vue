<template>
  <view class="container">
    <view class="header">
      <text style="font-size: 28rpx; font-weight: 600; letter-spacing: 2rpx">{{
        props.title
      }}</text>
      <view class="count">
        <text>{{ panelData.type === 0 ? "-" : "" }}</text>
        <text>{{ panelData.amount }}</text>
        <text>{{
          formatOptionsDate(panelData.date, panelData.rangeVal) +
          " · " +
          panelData.typeText
        }}</text>
      </view>
      <view class="btn" @click="toAnalysis">
        <RightButtonVue></RightButtonVue>
      </view>
    </view>
    <view class="chart">
      <slot name="chart"></slot>
    </view>
  </view>
</template>

<script setup>
import { computed } from "vue";
import RightButtonVue from "../../../components/RightButton.vue";
import { userInfoStore } from "../../../stores/userinfo";
import { formatOptionsDate } from "../../../utils/format";
import { panelinfoStore } from "../../../stores/panelinfo";
const { getTotal } = userInfoStore();
const panelinfo = panelinfoStore();
const props = defineProps({
  title: String,
});
const panelData = computed(() => {
  const { date, allowRange, range, type } = panelinfo.getPanelInfo(props.title);
  return {
    date,
    rangeVal: allowRange[range],
    type,
    typeText: type === 0 ? "支出" : "收入",
    amount: type === 0 ? getTotal(date).expense : getTotal(date).income,
  };
});

const toAnalysis = () => {
  uni.navigateTo({
    url: `/pages/analysis/index?title=${props.title}`,
  });
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: $space;
  background-color: $bg-color-white;
  border-radius: 30rpx;
  filter: $shadow;
  .header {
    width: 100%;
    height: 20%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    position: relative;
    .count {
      width: 100%;
      font-size: $text-size-med;
      color: #8b97a9;
      text {
        margin-right: 15rpx;
      }
    }
    .btn {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  .chart {
    width: 100%;
    height: 100%;
    display: flex;
  }
}
</style>
