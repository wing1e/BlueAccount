import {userObj} from './cloudObject.js'
// 修改用户基本信息
export const updataUser= async (args) =>{
	try{
		const updataRes = await userObj.call('updataUser',args)
		return updataRes
	}catch(e){
		throw new Error(e)
	}
}