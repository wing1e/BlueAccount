export const examiner = (data) =>{
	data.forEach(item =>{
		if(item.records){
			return true
		}else{
			return false
		}
	})
}