const jwt = require('jsonwebtoken')

const secret = '123@abcABC'

// 生成token
const getToken = (value) =>{
	//sign(加密数据，加密辅助，过期时间(s))
	return jwt.sign({openid:value},secret,{expiresIn:20})
}

// 解密token
const verifyToken = async (token) =>{
	try{
		return jwt.verify(token,secret)
	}catch(e){
		return false
	}
}
module.exports = {
	getToken,verifyToken
}
