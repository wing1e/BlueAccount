'use strict';
const {verifyToken}  = require('wx-token')
exports.main = async (event, context) => {
	const token = event.token
	const result = await verifyToken(token)
	if(result!==false){
		return true
	}else{
		return false
	}
	
};
