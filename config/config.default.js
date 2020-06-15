/* eslint valid-jsdoc: "off" */
/* eslint-disable */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
	/**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
	const config = (exports = {});

	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + '_1589421838456_8560';

	// add your middleware config here
	config.middleware = [];

	// add your user config here
	const userConfig = {
		// myAppName: 'egg',
	};
	config.security = {
		csrf: {
			enable: false
		}
	};
	config.io = {
		init: {}, // passed to engine.io
		namespace: {
			// '/': {
			// 	connectionMiddleware: [ 'connection' ],
			// 	packetMiddleware: [ 'packet' ]
			// },
			// '/default': {
			// 	connectionMiddleware: [ 'connection' ],
			// 	packetMiddleware: []
			// },
			// '/creatRoom': {
			// 	connectionMiddleware: [],
			// 	packetMiddleware: []
			// }
		}
	};
	const mysqlConfig = {
		mysql: {
			client: {
				// host
				host: '132.232.32.14',
				// 端口号
				port: '3306',
				// 用户名
				user: 'root',
				// 密码
				password: '123456',
				//设置字符集
				charset: 'utf8mb4',
				// 数据库名
				database: 'gobang'

				// werewolf: {
				// 	// 数据库名
				// 	database: 'gobang'
				// }
				// aiim: {
				//   // 数据库名
				//   database: "aiim"
				// }
			},
			// 开发库数据库
			default: {
				host: '132.232.32.14',
				// 端口号
				port: '3306',
				// 用户名
				user: 'root',
				// 密码
				password: '123456',
				//设置字符集
				charset: 'utf8mb4'
			},
			// 是否加载到 app 上，默认开启
			app: true,
			// 是否加载到 agent 上，默认关闭
			agent: false
		}
	};
	return {
		...config,
		...userConfig,
		...mysqlConfig
	};
};
