export const getNowDate = () =>{
	let date = new Date(); 
	
	let year = date.getFullYear(); // 获取年份
	
	let month = (date.getMonth() + 1).toString().padStart(2, '0'); // 获取月份（0-11），所以需要+1
	
	let day = date.getDate().toString().padStart(2, '0'); // 获取日
	
	const ymdDate = [year,month,day].join('-')
	
	let hours = date.getHours().toString().padStart(2, '0');
	
	let minutes = date.getMinutes().toString().padStart(2, '0');
	let seconds = date.getSeconds().toString().padStart(2, '0');
	
	const time = [hours,minutes,seconds].join(':')

	return {year:year,month:month,day:day,date:ymdDate,time:time}
}

export const getWeek = (targetDate) =>{
	const date = new Date(targetDate)
	const firstDayOfWeek  = new Date(date.setDate(date.getDate() - date.getDay())); // 计算当前周的第一天
	const startYear = firstDayOfWeek.getFullYear();
	const startMonth = String(firstDayOfWeek.getMonth() + 1).padStart(2, '0');
	const startDay = String(firstDayOfWeek.getDate()).padStart(2, '0');
	
	const endDayOfWeek = new Date(firstDayOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000); // 计算当前周的最后一天
	const endYear = endDayOfWeek.getFullYear();
	const endMonth = String(endDayOfWeek.getMonth() + 1).padStart(2, '0');
	const endDay = String(endDayOfWeek.getDate()).padStart(2, '0');
	
	return {start:`${startYear}-${startMonth}-${startDay}`,end:`${endYear}-${endMonth}-${endDay}`};
}

