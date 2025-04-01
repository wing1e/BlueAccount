import { array } from "../uni_modules/uview-plus/libs/function/test";

export const examiner = (data) =>{
	const result1 = data.some(item => item?.expense)
	const result2 = data.some(item => item?.records&&Array.isArray(item.records)&&item.records.length >0)
	
	
	if(result1 || result2){
		return true
	}else{
		return false
	}
}