import { DataOperationObj } from "./cloudObject";

export const updataBudget = async (args) =>{
	try{
		const updataBudgetRes = await DataOperationObj.call('updataBudget',args)
		return updataBudgetRes
	}catch(e){
		throw new Error(e)
	}
}