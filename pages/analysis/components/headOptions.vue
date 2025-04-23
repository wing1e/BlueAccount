<template>
  <view class="container">
    <!-- 时间选择器 -->
    <view class="date-pick">
      <view class="btn-left" @click="reduceDate">
        <uni-icons type="left" size="14"></uni-icons>
      </view>
      <picker
        style="width: 100%"
        mode="selector"
        :range="range"
        :value="picker.range"
        @change="rangeChange"
      >
        <view class="btn-center">
          <view class="date-input">{{
            formatOptionsDate(picker.date, range[picker.range])
          }}</view>
          <uni-icons type="down"></uni-icons>
        </view>
      </picker>
      <view class="btn-right" @click="addDate">
        <uni-icons type="right" size="14"></uni-icons>
      </view>
    </view>
    <!-- 类型选择器 -->
    <view class="type-picker">
      <picker
        style="width: 100%"
        mode="selector"
        :range="typeArr"
        :value="picker.type"
        @change="typeChange"
      >
        <view class="btn-type">{{ typeArr[picker.type] }}</view>
      </picker>
    </view>
    <!-- 重置 -->
    <view class="reset" @click="reset">
      <text>清空</text>
    </view>
  </view>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { getNowDate, getWeek } from "../../../utils/get-date";
import { timeChain } from "../../../utils/time-chain";
import { panelinfoStore } from "../../../stores/panelinfo";
import { formatOptionsDate } from "../../../utils/format.js";
import { PICKER_INFO } from "../../../utils/constants.js";
import { OptionsActionExaminer } from "../../../utils/examiner.js";
onMounted(() => {
  range.value = panelinfo.getPanelInfo(props.panelTitle).allowRange;
});

const { year, month, date } = getNowDate(); // 获取当前日期
// 接收父组件传递的属性
const props = defineProps(["panelTitle"]);

const panelinfo = panelinfoStore(); // 面板信息
const range = ref([]); // 范围
const typeArr = Object.values(PICKER_INFO.picker_type); // 类型

//根据 panelTitle 获取对应的 picker 信息
const picker = computed(() => {
  const item = panelinfo.panelList.find(
    (item) => item.title === props.panelTitle
  );
  return { ...item };
});

// 范围改变
const rangeChange = (e) => {
  const val = Number(e.detail.value);
  if (picker.value.range !== val) {
    const newDate = setPickerDate(range.value[val]);
    panelChange({ date: newDate, range: val });
  }
};

// 类型改变
const typeChange = (e) => {
  const val = Number(e.detail.value);
  if (picker.value.type !== val) {
    panelChange({ type: val });
  }
};

// 减少时间
const reduceDate = () => {
  const dateType = range.value[picker.value.range];
  const lastDate = timeChain(picker.value.date, dateType, "last");
  if (OptionsActionExaminer(lastDate)) {
    panelChange({ date: lastDate, range: picker.value.range });
  }else{
    uni.showToast({
      title: '超出当前时间范围',
      icon: 'none',
      duration: 2000
    });
  }
};

//增加时间
const addDate = () => {
  const dateType = range.value[picker.value.range];
  const nextDate = timeChain(picker.value.date, dateType, "next");
  if (OptionsActionExaminer(nextDate)) {
    panelChange({ date: nextDate, range: picker.value.range });
  }else{
    uni.showToast({
      title: '超出当前时间范围',
      icon: 'none',
      duration: 2000
    });
  }
};

// 修改时间范围
const setPickerDate = (rangeValue) => {
  const { range_year, range_month, range_week, range_day } =
    PICKER_INFO.picker_range;
  let newDate;
  switch (rangeValue) {
    case range_year:
      newDate = String(year);
      break;
    case range_month:
      newDate = `${year}-${month}`;
      break;
    case range_week:
      const { start, end } = getWeek(date);
      newDate = { start: start, end: end };
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

// 面板信息改变
const panelChange = (data) => {
  panelinfo.setPanel(props.panelTitle, data);
  console.log(picker.value);
};
</script>

<style scoped lang="scss">
@mixin wh100 {
  width: 100%;
  height: 100%;
}
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  @include wh100;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  padding: 25rpx 0;
  .date-pick {
    height: 100%;
    min-width: 35%;
    display: flex;
    background-color: #fff;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 10rpx;
    border-radius: 20rpx;
    filter: $shadow;
    font-size: $text-size-med;
    font-weight: 600;
    $border-side: 1rpx solid #8b97a9;
    $width-side: 100rpx;
    .btn-left {
      @include flex-center;
      border-right: $border-side;
      width: $width-side;
    }
    .btn-center {
      @include flex-center;
      .date-input {
        @include flex-center;
        white-space: nowrap;
        letter-spacing: 2rpx;
      }
    }
    .btn-right {
      @include flex-center;
      border-left: $border-side;
      width: $width-side;
    }
  }
  .type-picker {
    height: 100%;
    width: 15%;
    display: flex;
    background-color: #fff;
    filter: $shadow;
    box-sizing: border-box;
    padding: 10rpx;
    border-radius: 20rpx;
    margin-left: 20rpx;
    .btn-type {
      @include flex-center;
      font-size: $text-size-med;
      font-weight: 600;
    }
  }
  .reset {
    @extend .type-picker;
    justify-content: center;
    align-items: center;
    font-size: $text-size-med;
    font-weight: 600;
  }
}
</style>
