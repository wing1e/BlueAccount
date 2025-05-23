import {DataOperationObj} from './cloudObject.js'
// 查找用户数据
export const query = async () =>{
	try{
		const queryRes = await DataOperationObj.call('query')
		return queryRes
	}catch(e){
		throw new Error(e)
	}
}