import { defineStore } from "pinia";
export const tabBarStore = defineStore('tabbar',{
	state:()=>{
		return {status:0,pop:false}
	}
})