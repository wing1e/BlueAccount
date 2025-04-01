import { getNowDate } from "./get-date.js"

export const formatDate = (date) => {
	const arr = date.split('-')
	const year = getNowDate().year
	if(arr[0] == year){
		return `${parseInt(arr[1])}月${parseInt(arr[2])}日`
	}else{
		return `${parseInt(arr[0])}年${parseInt(arr[1])}月${parseInt(arr[2])}日`
	}
}

export const formatAmount = (num) => {
	const sign = num >= 0 ? '+' : '-';
	return sign + Math.abs(num).toFixed(2);
};