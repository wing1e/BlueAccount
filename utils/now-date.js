export const getNowDate = () =>{
	let date = new Date(); 
	
	let year = date.getFullYear(); // 获取年份
	
	let month = date.getMonth() + 1; // 获取月份（0-11），所以需要+1
	
	let day = date.getDate(); // 获取日
	
	let ymdDate = [year,month,day].join('-')
	
	return {year:year,month:month,day:day,date:ymdDate}
}