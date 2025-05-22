class CloudObject {
	constructor(name) {
		this.instance = uniCloud.importObject(name);
		
	}
	async call(method,...args) {
		try {
			const userinfo = uni.getStorageSync('userinfo')
			// 请求携带token
			const res = await this.instance[method]({...args[0],token:userinfo?.token})
			return res
		} catch (e) {
			throw new Error(e)
		}
	}
}

export const userObj = new CloudObject('userObj')

export const DataOperationObj = new CloudObject('DataOperationObj')