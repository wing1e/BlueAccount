import {DataOperationObj} from './cloudObject.js'

export const remove = async (args) =>{
	try{
		const removeRes = await DataOperationObj.call('remove',args)
		return removeRes
	}catch(e){
		throw new Error(e)
	}
}