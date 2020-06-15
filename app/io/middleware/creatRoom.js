/* eslint-disable */

module.exports = (app) => {
	return async (ctx, next) => {
		ctx.socket.emit('res', 'creatroom!');
		await next();
		console.log('creatroom-disconnection!');
	};
};
