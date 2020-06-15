/* eslint-disable */

/** @type Egg.EggPlugin */
module.exports = {
	// had enabled by egg
	// static: {
	//   enable: true,
	// }
	//启动规则校验
	validate: {
		enable: true,
		package: 'egg-validate'
	},
	mysql: {
		enable: true,
		package: 'egg-mysql'
	}
};
module.exports.io = {
	enable: true,
	package: 'egg-socket.io',
	// 配置 redis
	redis: {
		host: '127.0.0.23',
		port: 6379
	}
};
