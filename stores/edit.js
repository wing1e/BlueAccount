import {
	defineStore
} from 'pinia'
export const editStore = defineStore('edit', {
	state: () => {
		return {
			pop: false,
			data: {}
		}
	},
	getters: {
		getPop() {
			return this.pop
		},
		getData() {
			return this.data
		}
	},
	actions: {
		setPop(val) {
			this.pop = val
		},

		setData(obj) {
			
			this.data = {
				...obj,type:obj.type==='expense'?'支出':'收入'
			}
		},

	}
})