import {
	defineStore
} from "pinia";
import {PICKER_INFO} from '../utils/constants'

export const panelinfoStore = defineStore('panelinfo', {
	state: () => {
		return {
			panelList: [
				{
					title: '分类统计',
					date: '2023-03',
					range:1,
					allowRange: ['range_year', 'range_month', 'range_week', 'range_day']
				},
				{
					title: '日趋势',
					date: '2023-03',
					range:1,
					allowRange: ['range_year', 'range_month', 'range_week']
				},
				{
					title: '月度收支',
					date: '2023',
					range:0,
					allowRange: ['range_year']
				}
			]
		}
	},
	getters:{
		getPanelInfo:(state)=>(title)=>{
			const item = state.panelList.find(item => item.title === title);
			const range = item ? item.allowRange.map(range => PICKER_INFO.picker_range[range]) : [];
			return item ? {...item,allowRange:range} : undefined;
		}
	},
	actions: {
		setPanel(title, data) {
			const index = this.panelList.findIndex(item => item.title === title);
			if (index > -1) {
				// 创建新对象替换原对象，保证响应性
				this.panelList.splice(index, 1, {
					...this.panelList[index],
					...data
				});
			}
		}
	}
})