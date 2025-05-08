const dotenv = require('dotenv');
dotenv.config()
// 密匙
const {SECRET} = process.env
//微信配置
const {APP_ID,APP_SECRET} = process.env

module.exports = {
	SECRET,APP_ID,APP_SECRET
}
