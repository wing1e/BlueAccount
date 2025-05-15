'use strict';
const {checkLogin} = require('middleware')
exports.main = async (event, context) => {
	try{
		const tokenRes = await checkLogin(event)
		if(tokenRes){
			return {errCode:0,msg:'yes'}
		}
	}catch(e){
			return {errCode:'VERIFYTOKEN_FAILED',errMsg:e.message}
	}
};
