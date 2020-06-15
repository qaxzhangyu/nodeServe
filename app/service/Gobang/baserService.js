/* eslint-disable */

const BaseGoBangService = require('./../BaseGoBangService');
// const BaseSqlService = require('./baseSqlService');
// const Service = require('egg').Service;

// import BaseGoBangService from '../BaseGoBangService';
class BaseService extends BaseGoBangService {
	async Register(request) {
		let userName = request.userName;
		let password = request.password;
		//查询是否注册过
		let sql = `SELECT COUNT(*) AS total FROM user_info WHERE user_name = ${userName}`;
		let userCount = await this.selectOne(sql);
		if (userCount['total'] > 0) {
			return {
				code: 201,
				msg: '请不要重复注册'
			};
		}
		sql = `INSERT INTO user_info (
			user_name,
			password,
			md_psword
		)
		VALUES
			(
				${userName},
				${password},
				${password}
			);
		`;
		await this.execSql(sql);
		return {
			code: 200,
			msg: '注册成功'
		};
	}
	async Signin(request) {
		let userName = request.userName;
		let password = request.password;
		//查询用户名密码是否正确
		let sql = `SELECT  user_id FROM user_info WHERE user_name = ${userName} AND password = ${password}`;
		let userId = await this.selectOne(sql);
		if (userId) {
			// console.log('userId=>', userId['user_id']);
			return {
				code: 200,
				msg: '登录成功',
				data:{
					userId:userId['user_id']
				}
			};
		}
		return {
			code: 201,
			msg: '用户名或密码不正确'
		};
	}
}

// export default BaseService;
module.exports = BaseService;
