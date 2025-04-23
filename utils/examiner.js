import { userInfoStore } from "../stores/userinfo"
///检查日期是否在范围内
export const OptionsActionExaminer = (nextDate) =>{
	const userMinDate = userInfoStore().datalist[0].date
	const minDate = parseDate(userMinDate)
	const maxDate = Date.now()
	//日期类型是字符串('YYYY-MM-DD')
	if(typeof nextDate === 'string'){
		const date = parseDate(nextDate)
		//如果是年
		if(nextDate.split('-').length === 1){
		 	const minYear = minDate.getFullYear()
			const maxYear = new Date(maxDate).getFullYear()
			const year = parseInt(nextDate)
			return (year >= minYear && year <= maxYear)
		}
		return date >= minDate && date <= maxDate
		//如果是对象类型({start:'YYYY-MM-DD',end:'YYYY-MM-DD'})
	}else if(typeof nextDate === 'object'){
		const start = parseDate(nextDate?.start)
		const end = parseDate(nextDate?.end)
		return (start >= minDate && start <= maxDate) && (end >= minDate && end <= maxDate)
	}else{
		throw new Error('Invalid date format')	
	}
}
///将日期字符串转换为Date对象
const parseDate = (date) => {
	const parts = date.split('-')
	let year, month, day
	switch (parts.length) {
		case 3:
			[year, month, day] = parts.map(Number)
			return new Date(year, month - 1, day)
		case 2:
			[year, month] = parts.map(Number)
			return new Date(year, month - 1, 1)
		case 1:
			[year] = parts.map(Number)
			return new Date(year, 0, 1)
		default:
			throw new Error('Invalid date format')
	}
	
}