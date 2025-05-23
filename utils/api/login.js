import {userObj} from './cloudObject.js'
// 登录
export const login =async (args)=>{
	try{
		const loginRes = await userObj.call('login',args)
		return loginRes
	}catch(e){
		throw new Error(e)
	}
	
}