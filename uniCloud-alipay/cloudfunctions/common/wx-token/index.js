const createConfig = require('uni-config-center')
const commonConfig = createConfig({
	pluginId: 'common-config'
})
const SECRET_KEY = commonConfig.config('TOKEN.SECRET_KEY')
const ExpiresIn = commonConfig.config('TOKEN.ExpiresIn')

const jwt = require('jsonwebtoken')

// 生成token
const getToken = (value) =>{
	//sign(加密数据，加密辅助，过期时间(s))
	return jwt.sign({openid:value},SECRET_KEY,{expiresIn:ExpiresIn})
}

// 解密token
const verifyToken = async (token) =>{
	try{
		return jwt.verify(token,SECRET_KEY)
	}catch(e){
		return false
	}
}
module.exports = {
	getToken,verifyToken
}
