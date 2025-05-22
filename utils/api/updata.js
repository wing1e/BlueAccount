import {DataOperationObj} from './cloudObject.js'

export const updata = async (args) =>{
	try{
		const updataRes = await DataOperationObj.call('updata',args)
		return updataRes
	}catch(e){
		throw new Error(e)
	}
}