import {getNodeInfo} from "../node-info.js"

const ACCOUNT_TYPE = [
  {"category": "购物", "color": "#00B6E6"},
  {"category": "餐饮", "color": "#FF6B6B"},
  {"category": "交通", "color": "#4CAF50"},
  {"category": "住房", "color": "#FFA726"},
  {"category": "娱乐", "color": "#9C27B0"},
  {"category": "医疗", "color": "#F44336"},
  {"category": "教育", "color": "#2196F3"},
  {"category": "投资", "color": "#FFD700"},
  {"category": "工资", "color": "#4CAF50"},
  {"category": "旅行", "color": "#E91E63"},
  {"category": "礼物", "color": "#FF4081"},
  {"category": "其他", "color": "#9E9E9E"}
]

export const pieCharInit = async (instance, chartData, className, canvasId) =>{
		
		try {
			const canvasNode =await getNodeInfo(instance,className)
			const {height:ctxH,width:ctxW} = canvasNode[0]
			const ctx = uni.createCanvasContext(canvasId,instance)
			
			const centerX = ctxW/2 //圆形X坐标
			const centerY = ctxH/2 //圆形Y坐标
			const outerR = (ctxH-10)/2 //外圆半径 
			const innerR = (ctxH-40)/2 //内圆半径

			const expense = new Map(Object.entries(chartData.expense)); // 支出数据
			// const income = new Map(Object.entries(chartData.income)); // 收入数据

			let startAngle = -Math.PI / 2; // 起始角度从12点方向开始
			
			expense.forEach((val,key)=> {
					
			        const sliceAngle = val/100 * 2 * Math.PI;
			        const endAngle = startAngle + sliceAngle;
			
			        // 绘制路径
			        ctx.beginPath();
			        // 外圆弧（顺时针）
			        ctx.arc(centerX, centerY, outerR, startAngle, endAngle, false);
			        // 内圆弧（逆时针返回，形成闭合环）
			        ctx.arc(centerX, centerY, innerR, endAngle, startAngle, true);
			        ctx.closePath();	
			        // 设置填充颜色
			        ctx.setFillStyle(ACCOUNT_TYPE.find(item=>item.category == key).color);
			        ctx.fill();
						
			        startAngle = endAngle; // 更新起始角度
			      });
			
			      // 执行绘制
			      ctx.draw();
			
			
		} catch (error) {
			console.log(error);
		}
	}