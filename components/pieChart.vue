<template>
  <view class="container">
    <canvas :canvas-id="canvasInfo.id" :class="canvasInfo.className"></canvas>
  </view>
</template>

<script setup>
import { onShow } from "@dcloudio/uni-app";
import { getCurrentInstance, onMounted, computed, watch } from "vue";
import { pieCharInit } from "../utils/chart/pie-chart";
import { userInfoStore } from "../stores/userinfo";
import { getWeek } from "../utils/get-date";
import { panelinfoStore } from "../stores/panelinfo";
onMounted(() => {
  drawChart();
});
onShow(() => {
  drawChart();
});

const instance = getCurrentInstance();
const canvasInfo = { className: ".pieChart", id: "pieChart" };
const { getCategoryInfo } = userInfoStore();
const panelinfo = panelinfoStore();

const chartData = computed(() => {
  const typeVal = panelinfo.panelList[0].type === 0 ? "expense" : "income";
  const pickDate = panelinfo.panelList[0].date;
  return getCategoryInfo(pickDate)[typeVal];
});

const drawChart = () => {
  pieCharInit(instance, chartData.value, canvasInfo.className, canvasInfo.id);
};

watch(
  () => panelinfoStore().panelList[0],
  () => {
    drawChart();
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  .pieChart {
    width: 100%;
    height: 100%;
  }
}
</style>
