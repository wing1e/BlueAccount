import { PICKER_INFO } from "./constants.js";
import { getNowDate, getWeek } from "./get-date.js";

export const formatDate = (date) => {
  if (!date) return "";
  const parts = date.split("-");
  const { year: currentYear } = getNowDate();
  // 处理不同格式的日期
  switch (parts.length) {
    case 1: // YYYY'格式
      return `${parseInt(parts[0])}年`;
    case 2: // 'YYYY-MM'格式
      return parseInt(parts[0]) === currentYear
        ? `${parseInt(parts[1])}月`
        : `${parseInt(parts[0])}.${parseInt(parts[1])}`;
    case 3: // 'YYYY-MM-DD'格式
      return parseInt(parts[0]) === currentYear
        ? `${parseInt(parts[1])}.${parseInt(parts[2])}`
        : `${parseInt(parts[0])}.${parseInt(parts[1])}.${parseInt(parts[2])}`;
    default:
      return date;
  }
};

export const formatAmount = (num) => {
  const sign = num >= 0 ? "+" : "-";
  return sign + Math.abs(num).toFixed(2);
};

export const formatOptionsDate = (targetDate, rangeVal) => {
  const { range_year, range_month, range_week, range_day } =
    PICKER_INFO.picker_range;
  switch (rangeVal) {
    case range_year:
      return targetDate;
    case range_month:
      return formatDate(targetDate);
    case range_week:
      const { start, end } = getWeek(targetDate.start);
      return `${formatDate(start)}-${formatDate(end)}`;
    case range_day:
      return formatDate(targetDate);
    default:
      return targetDate;
  }
};
