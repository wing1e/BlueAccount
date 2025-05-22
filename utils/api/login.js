import {userObj} from './cloudObject.js'

export const login =async (args)=>{
	try{
		const loginRes = await userObj.call('login',args)
		return loginRes
	}catch(e){
		throw new Error(e)
	}
	
}