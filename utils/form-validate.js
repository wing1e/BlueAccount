// 表单验证
export const formValidate = (data) => {
	if (data.amount === '') {
		uni.showToast({
			title: '请选择金额',
			icon: 'error'
		});
		return false;
	} else if (!/^\d+$/.test(data.amount)) {
		uni.showToast({
			title: '请输入正确金额',
			icon: 'error'
		});
		return false;
	} else if (data.category === '') {
		uni.showToast({
			title: '请选择种类',
			icon: 'error'
		});
		return false;
	}

	return true;
};