import { formatAmount } from "./format";

// 计算环比值
export const calcQOQ = (current, last) => {
	const diff = current - last;
	return formatAmount(diff);
};
// 计算环比百分比
export const calcPercentage = (current, last) => {
	if (last === 0) return current === 0 ? '0%' : '100%';
	return ((current / last - 1) * 100).toFixed(1) + '%';
};
