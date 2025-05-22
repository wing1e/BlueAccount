'use strict';
const {checkLogin} = require('middleware')
exports.main = async (event, context) => {
	try{
		console.log(event);
		const tokenRes = await checkLogin(event)
		console.log(tokenRes);
		if(tokenRes){
			return {errCode:0,msg:'yes'}
		}
	}catch(e){
			return {errCode:'VERIFYTOKEN_FAILED',errMsg:e.message}
	}
};
