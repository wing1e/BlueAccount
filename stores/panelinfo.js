import {
	defineStore
} from "pinia";
import {
	PICKER_INFO
} from '../utils/constants'
import {getNowDate} from '../utils/get-date.js'

export const panelinfoStore = defineStore('panelinfo', {
	state: () => {
		return {
			panelList: [{
					title: '分类统计',
					date: '2023-03',
					range: 1,
					allowRange: ['range_year', 'range_month', 'range_week', 'range_day'],
					type: 0
				},
				{
					title: '日趋势',
					date: '2023-03',
					range: 0,
					allowRange: ['range_month', 'range_week'],
					type: 0
				},
				{
					title: '月度收支',
					date: '2023',
					range: 0,
					allowRange: ['range_year'],
					type: 0
				}
			]
		}
	},
	getters: {
		getPanelInfo: (state) => (title) => {
			const item = state.panelList.find(item => item.title === title);
			const range = item ? item.allowRange.map(range => PICKER_INFO.picker_range[range]) : [];
			return item ? {
				...item,
				allowRange: range
			} : undefined;
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
		},
		reset(title) {
			const index = this.panelList.findIndex(item => item.title === title);
			const {year,month,day} = getNowDate()
			const origin = [{
					title: '分类统计',
					date: `${year}-${month.padStart(2,'0')}`,
					range: 1,
					allowRange: ['range_year', 'range_month', 'range_week', 'range_day'],
					type: 0
				},
				{
					title: '日趋势',
					date: `${year}-${month.padStart(2,'0')}`,
					range: 0,
					allowRange: ['range_month', 'range_week'],
					type: 0
				},
				{
					title: '月度收支',
					date: `${year}`,
					range: 0,
					allowRange: ['range_year'],
					type: 0
				}
			]
			if (index > -1) {
				// 创建新对象替换原对象，保证响应性
				this.panelList.splice(index, 1,{...origin[index]});
			}
		}
	}
})