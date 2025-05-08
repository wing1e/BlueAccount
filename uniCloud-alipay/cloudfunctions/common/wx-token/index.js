const {SECRET} = require('cloud-config')

const jwt = require('jsonwebtoken')

// 生成token
const getToken = (value) =>{
	//sign(加密数据，加密辅助，过期时间(s))
	return jwt.sign({openid:value},SECRET,{expiresIn:20})
}

// 解密token
const verifyToken = async (token) =>{
	try{
		return jwt.verify(token,SECRET)
	}catch(e){
		return false
	}
}
module.exports = {
	getToken,verifyToken
}
