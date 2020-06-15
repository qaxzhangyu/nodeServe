/* eslint-disable */

const Controller = require('egg').Controller;
class BaseController extends Controller {
	//注册
	async Register() {
		const { ctx, service } = this;

		// 校验规则
		const createRule = {
			userName: { type: 'string' },
			password: { type: 'string' }
		};
		try {
			// 校验
			ctx.validate(createRule);
			const request = ctx.request.body;
			let result = await ctx.service.gobang.baserService.Register(request);
			ctx.status = 200;
			ctx.body = { ...result };
		} catch (e) {
			console.error(e);
			const err = {
				err_code: 500,
				err_msg: e.message
			};
			ctx.body = err;
			ctx.status = 500; //请求参数错误
		}
	}
	//登录
	async Signin() {
		const { ctx, service } = this;

		// 校验规则
		const createRule = {
			userName: { type: 'string' },
			password: { type: 'string' }
		};
		try {
			// 校验
			ctx.validate(createRule);
			const request = ctx.request.body;
			let result = await ctx.service.gobang.baserService.Signin(request);
			ctx.status = 200;
			ctx.body = { ...result };
		} catch (e) {
			console.error(e);
			const err = {
				err_code: 500,
				err_msg: e.message
			};
			ctx.body = err;
			ctx.status = 500; //请求参数错误
		}
	}
}
module.exports = BaseController;
