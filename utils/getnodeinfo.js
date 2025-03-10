// 获得节点信息

import { promise } from "../uni_modules/uview-plus/libs/function/test"

// 单个节点
/* 
 * @param {ComponentInternalInstance} instance
 * @param {string} nodeName
 * @retrun {array}
 */
export const getNodeInfo =async (instance,nodeName)=>{
	return new Promise((res,rej)=>{
		const query = uni.createSelectorQuery().in(instance)
		query.select(nodeName)
		.boundingClientRect()
		.exec((data)=>{
			if(data&&data[0]){
				res(data)
			}else{
				rej(new Error('Element not found'))
			}
		})
	})
}


// 循环节点
/* 
 * @param {ComponentInternalInstance} instance
 * @param {string} nodeName
 * @retrun {array}
 */
export const getNodeAllInfo =async (instance,nodeName)=>{
	return new Promise((res,rej)=>{
		const query = uni.createSelectorQuery().in(instance)
		query.selectAll(nodeName)
		.boundingClientRect()
		.exec((data)=>{
			if(data&&data[0]){
				res(data)
			}else{
				rej(new Error('Element not found'))
			}
		})
	})
	
}