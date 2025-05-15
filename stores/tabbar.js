import {
	defineStore
} from "pinia";
export const tabBarStore = defineStore('tabbar', {
	state: () => {
		return {
			status: 0,
			pup: false, //弹窗状态
			pupSign:false //弹窗信号
		}
	},
	getters: {
		getPup() {
			return this.pup
		},
		getPupSign(){
			return this.pupSign
		}
	},
	actions: {
		setPup(flag) {
			this.pupSign = flag
			if(flag){
				setTimeout(()=>{
					this.pup = flag
				},200)
			}else{
				this.pup = flag
			}
			
			
		},
		
	}
})