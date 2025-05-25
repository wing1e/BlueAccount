import {
	defineStore
} from "pinia";
let timer = null
export const tabBarStore = defineStore('tabbar', {
	state: () => {
		return {
			status: 0,
			pup: false, //弹窗状态
			pupSign: false //弹窗信号
		}
	},
	getters: {

	},
	actions: {
		setPup(flag) {
			if(timer!==null) clearTimeout(timer)
			this.pupSign = flag
			if (flag) {
				timer =  setTimeout(() => {
					this.pup = flag
				}, 250)
			} else {
				this.pup = flag
			}
		},
		setStatus(status){
			this.status = status
		}
	}
})