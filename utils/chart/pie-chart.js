import {
	getNodeInfo
} from "../node-info.js";

export const EXPENSE_TYPE = [{
		"category": "购物",
		"color": "#00B6E6"
	},
	{
		"category": "餐饮",
		"color": "#FF6B6B"
	},
	{
		"category": "交通",
		"color": "#4CAF50"
	},
	{
		"category": "住房",
		"color": "#FFA726"
	},
	{
		"category": "娱乐",
		"color": "#9C27B0"
	},
	{
		"category": "医疗",
		"color": "#F44336"
	},
	{
		"category": "教育",
		"color": "#2196F3"
	},
	{
		"category": "投资",
		"color": "#FFD700"
	},
	{
		"category": "工资",
		"color": "#4CAF50"
	},
	{
		"category": "旅行",
		"color": "#E91E63"
	},
	{
		"category": "礼物",
		"color": "#FF4081"
	},
	{
		"category": "其他",
		"color": "#9E9E9E"
	}
]

export const INCOME_TYPE = [{
		"category": "工资",
		"color": "#4CAF50"
	},
	{
		"category": "奖金",
		"color": "#9C27B0"
	},
	{
		"category": "兼职",
		"color": "#E91E63"
	},
	{
		"category": "理财",
		"color": "#FFC107"
	},
	{
		"category": "其他收入",
		"color": "#9E9E9E"
	}
]

const LABEL_CONFIG = {
    LINE_OFFSET: 20,   // 折线延伸长度
    LABEL_OFFSET: 30  // 标签与折线拐点间距
};

export const pieCharInit = async (instance, chartData, className, canvasId) => {
	try {
		const canvasNode = await getNodeInfo(instance, className)
		const {
			height: ctxH,
			width: ctxW
		} = canvasNode[0]
		const ctx = uni.createCanvasContext(canvasId, instance)

		const centerX = ctxW / 2 //圆心X坐标
		const centerY = ctxH / 2 //圆心Y坐标
		const outerR = ctxH / 3 //外圆半径 
		const innerR = ctxH / 4 //内圆半径


		const expense = new Map(Object.entries(chartData.expense)); // 支出数据
		// const income = new Map(Object.entries(chartData.income)); // 收入数据

		let startAngle = -Math.PI / 2; // 起始角度从12点方向开始

		expense.forEach((val, key) => {

			const sliceAngle = val / 100 * 2 * Math.PI;
			const endAngle = startAngle + sliceAngle;

			// 绘制路径
			ctx.beginPath();
			// 外圆弧（顺时针）
			ctx.arc(centerX, centerY, outerR, startAngle, endAngle, false);
			// 内圆弧（逆时针返回，形成闭合环）
			ctx.arc(centerX, centerY, innerR, endAngle, startAngle, true);
			ctx.closePath();
			// 设置填充颜色
			ctx.setFillStyle(EXPENSE_TYPE.find(item => item.category === key).color);
			ctx.fill();

			// 百分比大于5显示标签
			if (Number(val) >= 5) {
				const midAngle = startAngle + sliceAngle / 2;
				const isRight = Math.cos(midAngle) > 0;// 判断扇形是否在右侧
				// 计算折线起点（外圆弧中点）
				const lineStartX = centerX + outerR * Math.cos(midAngle);
				const lineStartY = centerY + outerR * Math.sin(midAngle);

				// 计算折线拐点 
				const lineBreakX = centerX + (outerR + LABEL_CONFIG.LINE_OFFSET) * Math.cos(midAngle);
				const lineBreakY = centerY + (outerR + LABEL_CONFIG.LINE_OFFSET) * Math.sin(midAngle);
				
				// 标签
				const labelX = isRight 
				? lineBreakX + LABEL_CONFIG.LABEL_OFFSET
				: lineBreakX - LABEL_CONFIG.LABEL_OFFSET;
				const labelY = lineBreakY
				// 绘制折线
				ctx.beginPath();
				ctx.moveTo(lineStartX, lineStartY); // 起点：扇形边缘中点
				if (Math.cos(midAngle) > 0) {
					// 右侧扇区：向右水平延伸
					ctx.lineTo(lineBreakX, lineBreakY); // 水平转折
					ctx.lineTo(lineBreakX + LABEL_CONFIG.LINE_OFFSET, lineBreakY); // 向右延伸
				} else {
					// 左侧扇区：向左水平延伸
					ctx.lineTo(lineBreakX, lineBreakY); // 水平转折
					ctx.lineTo(lineBreakX - LABEL_CONFIG.LINE_OFFSET, lineBreakY);// 向左延伸

				}
				
				ctx.setStrokeStyle('#282C35'); // 折线颜色与扇区一致
				ctx.setLineWidth(1);
				ctx.stroke();

				const colorMap = new Map(EXPENSE_TYPE.map(item => [item.category, item.color]));
				const textAlign = isRight ? 'left' : 'right'; // 文本对齐方式
				// 绘制文本
				drawLabelText(ctx, `${key} ${Number(val).toFixed(1)}%`, labelX, labelY, textAlign, colorMap.get(key));
			}

			startAngle = endAngle; // 更新起始角度
		});

		// 执行绘制
		ctx.draw();

	} catch (error) {
		console.log(error);
	}
}
const drawLabelText = (ctx, text, x, y, align, color) => {
    ctx.save();
    ctx.setFontSize(12);
    ctx.setFillStyle(color);
    ctx.setTextAlign(align);
    ctx.setTextBaseline('middle');
    ctx.fillText(text, x, y);
    ctx.restore();
};
