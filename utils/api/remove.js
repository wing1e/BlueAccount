import {DataOperationObj} from './cloudObject.js'
// 删除账单数据
export const remove = async (args) =>{
	try{
		const removeRes = await DataOperationObj.call('remove',args)
		return removeRes
	}catch(e){
		throw new Error(e)
	}
}