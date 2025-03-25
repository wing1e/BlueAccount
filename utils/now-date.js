export const getNowDate = () =>{
	let date = new Date(); 
	
	let year = date.getFullYear(); // 获取年份
	
	let month = (date.getMonth() + 1).toString().padStart(2, '0'); // 获取月份（0-11），所以需要+1
	
	let day = date.getDate().toString().padStart(2, '0'); // 获取日
	
	const ymdDate = [year,month,day].join('-')
	
	let hours = date.getHours().toString().padStart(2, '0');
	
	let minutes = date.getMinutes().toString().padStart(2, '0');
	
	const time = [hours,minutes].join(':')

	return {year:year,month:month,day:day,date:ymdDate,time:time}
}