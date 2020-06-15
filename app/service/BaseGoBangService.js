/*
 * @Description: Service基础类
 * @version: 1.0.0
 * @Company: sdbean
 * @Author: hammercui
 * @Date: 2020-03-17 11:24:20
 * @LastEditors: hammercui
 * @LastEditTime: 2020-04-11 19:10:30
 */
const Service = require('egg').Service;

class BaseGoBangService extends Service {
	/**
     * @name: 执行insert,update，delete等操作
     * @msg: 
     * @param {type} 
     * @return: 
     */
	async execSql(sqlStr, params, dbName = 'gobang') {
		try {
			const db = this.app.mysql;
			const result = await db.query(sqlStr, params);
			return result;
		} catch (error) {
			throw error;
		}
	}

	/**
     * @name: 查询一个对象
     * @msg: 
     * @param {type} 
     * @return: 
     */
	async selectOne(sqlStr, params, dbName = 'gobang') {
		try {
			const db = this.app.mysql;
			const result = await db.query(sqlStr, params);
			if (result && result.length > 0) {
				let dataString = JSON.stringify(result);
				let data = JSON.parse(dataString);
				return data[0];
			} else {
				return null;
			}
		} catch (error) {
			throw error;
		}
	}

	/**
     * @name: 查询一个列表
     * @msg: 
     * @param {type} 
     * @return: 
     */
	async selectList(sqlStr, params, dbName = 'gobang') {
		try {
			const db = this.app.mysql;
			const result = await db.query(sqlStr, params);
			if (result && result.length > 0 && result[0]) {
				let dataString = JSON.stringify(result);
				let data = JSON.parse(dataString);
				return data;
			} else {
				return null;
			}
		} catch (error) {
			throw error;
		}
	}
}
module.exports = BaseGoBangService;
