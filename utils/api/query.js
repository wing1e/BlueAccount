import {DataOperationObj} from '../cloudObject.js'

export const query = async () =>{
	try{
		const queryRes = await DataOperationObj.call('query')
		return queryRes
	}catch(e){
		throw new Error(e)
	}
}