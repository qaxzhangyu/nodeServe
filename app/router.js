/* eslint-disable */

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
	const { router, controller, io } = app;
	router.get('/', controller.home.index);
	router.post('/api/gobang/featchRegister', controller.gobang.base.Register);
	router.post('/api/gobang/featchSignin', controller.gobang.base.Signin);

	// router.get('/api/Gobang/getBaseInfo',  app.controller.home.index);
	router.get('/user/:id', controller.user.info);
	// socket.io
	// app.io.of('/')
	io.route('default', io.controller.default.index);
	io.route('creatRoom', io.controller.default.creatRoom);
	io.route('signin', io.controller.default.signin);
	io.route('joinRoom', io.controller.default.joinRoom);
	io.route('leaveRoom', io.controller.default.leaveRoom);


	// app.io.of('/chat')
	// io.of('/default').route('default', io.controller.default.index);
	// io.of('/creatRoom').route('creatRoom', io.controller.default.creatRoom);

};
