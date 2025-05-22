import {DataOperationObj} from './cloudObject.js'

export const add = async (args) =>{
	try{
		const addRes = await DataOperationObj.call('add',args)
		return addRes
	}catch(e){
		throw new Error(e)
	}
}