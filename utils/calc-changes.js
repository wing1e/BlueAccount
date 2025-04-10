import { formatAmount } from "./format";


export const calcQOQ = (current, last) => {
	const diff = current - last;
	return formatAmount(diff);
};

export const calcPercentage = (current, last) => {
	if (last === 0) return current === 0 ? '0%' : '100%';
	return ((current / last - 1) * 100).toFixed(1) + '%';
};