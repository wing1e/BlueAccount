import { defineStore } from "pinia";

const DATE_FORMAT = {
	
}
export const chartInterval = defineStore('chartInterval',{
    state:()=>{
        return {
            status:{
				pieChart:"2023-03",lineChart:"2023-03",barChart:"2023"}
        }
    }
})