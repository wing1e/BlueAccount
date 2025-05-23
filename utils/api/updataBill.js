import {DataOperationObj} from './cloudObject.js'
// 修改账单数据
export const updataBill = async (args) =>{
	try{
		const updataRes = await DataOperationObj.call('updataBill',args)
		return updataRes
	}catch(e){
		throw new Error(e)
	}
}