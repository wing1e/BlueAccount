import {
	userInfoStore
} from "../stores/userinfo"
const store = userInfoStore()
///检查日期是否在范围内
export const OptionsActionExaminer = (nextDate) => {
	const originData = JSON.parse(JSON.stringify(store.getDataList))
	const startItem = originData.find(item => item.records.length > 0) //用户第一条记录日期
	const endItem = [...originData].reverse().find(item => item.records.length > 0) //用户最后一条记录日期

	const userMinDate = originData[0].date //用户数据的最小日期
	const userMaxDate = originData[originData.length - 1].date //用户数据的最大日期

	///将日期字符串转换为Date对象
	const originMinDate = parseDate(startItem.date)
	const originMaxDate = parseDate(endItem.date)
	const minDate = parseDate(userMinDate)
	const maxDate = parseDate(userMaxDate)

	//日期类型是字符串('YYYY-MM-DD')
	if (typeof nextDate === 'string') {
		const parseNextDate = parseDate(nextDate)
		//年类型
		if (nextDate.split('-').length === 1) {
			const minYear = minDate.getFullYear()
			const maxYear = new Date(maxDate).getFullYear()
			const year = parseInt(nextDate)
			return (year >= minYear && year <= maxYear)
			// 日类型
		} else if (nextDate.split('-').length === 3) {
			return (parseNextDate >= originMinDate && parseNextDate <= originMaxDate)
		}
		return parseNextDate >= minDate && parseNextDate <= maxDate
		//如果是对象类型({start:'YYYY-MM-DD',end:'YYYY-MM-DD'})/周类型
	} else if (typeof nextDate === 'object') {
		const nextStart = parseDate(nextDate?.start)
		const nextEnd = parseDate(nextDate?.start)
		const edgeStart = getEdgeOfWeek(originMinDate).startOfWeek()
		const edgeEnd = getEdgeOfWeek(originMaxDate).endOfWeek()
		return (nextStart >= edgeStart && nextStart <= edgeEnd) && (nextEnd >= edgeStart && nextEnd <= edgeEnd)
	} else {
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

const getEdgeOfWeek = (dateVal) => {
	const date = new Date(dateVal)
	const dayVal = date.getDate()
	const dayOfWeek = date.getDay()
	const startOfWeek = () => {
		date.setDate(dayVal - dayOfWeek)
		return date
	}
	const endOfWeek = () => {
		date.setDate(dayVal + (6 - dayOfWeek))
		return date
	}

	return {
		startOfWeek,
		endOfWeek
	}
}