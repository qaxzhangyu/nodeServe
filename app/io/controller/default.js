/* eslint-disable */

const Controller = require('egg').Controller;
const roomServe = {};
const allClients = [];
class DefaultController extends Controller {
	async index() {
		const { ctx, app } = this;
		const message = ctx.args[0];
		console.log('chat :', message + ' : ' + process.pid);
		console.log('ctx :', ctx.socket.id);
		await ctx.socket.emit('res', `userNo:${message.userNo}HasConnected`);
		await ctx.app.io.emit('res', `userNo:${message.userNo}HasConnected`);
	}

	async creatRoom() {
		const { ctx, app } = this;
		const message = ctx.args[0];
		console.log('收到创建房间请求', message);

		//roomServe 创建房间
		roomServe[message.userNo] = {
			name: `${message.userName}的房间`,
			roomNo: message.userNo,
			userList: [ message.userNo ]
		};
		console.log('roomServe=>', roomServe);
		//socket 加入房间
		ctx.socket.join(roomServe[message.userNo].roomNo);

		//房间内发布用户进入房间pei

		ctx.app.io
			.of('/')
			.to(roomServe[message.userNo].roomNo)
			.emit('joinRoom', { msg: 'welcome', id: message.userName });

		//广播所有用户，有新建房间
		ctx.app.io.emit('roomInfo', roomServe);

		// await ctx.socket.emit('res', `Hi! I've got your message: ${message}`);
	}

	async joinRoom() {
		const { ctx, app } = this;
		const message = ctx.args[0];
		console.log('加入房间', message);

		//roomServe 加入房间
		// if (roomServe[message.roomNo].userList.indexOf(message.userNo) >= 0) {
		// 	return;
		// }
		roomServe[message.roomNo].userList.push(message.userNo);
		console.log('roomServe=>', roomServe);

		//socket 加入房间
		ctx.socket.join(roomServe[message.roomNo].roomNo);

		//房间内发布用户进入房间
		console.log('message.roomNo=>', message.roomNo);
		console.log('roomServe[message.userNo]=>', roomServe);
		ctx.app.io.of('/').to(message.roomNo).emit('joinRoom', { msg: 'welcome', id: message.userName });
	}

	async leaveRoom() {
		const { ctx, app } = this;
		const message = ctx.args[0];
		console.log('离开房间', message);

		//roomServe 离开房间
		// if (roomServe[message.roomNo].userList.indexOf(message.userNo) == -1) {
		// 	return;
		// }
		roomServe[message.roomNo].userList.splice(roomServe[message.roomNo].userList.indexOf(message.userNo), 1);
		console.log('roomServe=>', roomServe);

		//socket 离开房间
		ctx.socket.leave(roomServe[message.roomNo].roomNo);

		//房间内发布用户离开房间
		console.log('message.roomNo=>', message.roomNo);
		console.log('roomServe[message.userNo]=>', roomServe);
		console.log('roomServe[message.roomNo].userList.length=>', roomServe[message.roomNo].userList.length);
		ctx.app.io.of('/').to(message.roomNo).emit('leaveRoom', { msg: 'bye', id: message.userName });

		//销毁房间
		if (roomServe[message.roomNo].userList.length == 0) {
			delete roomServe[message.roomNo];
		}
		//广播所有用户 房间信息
		ctx.app.io.emit('roomInfo', roomServe);

		console.log('message.roomNo=>', message.roomNo);
		console.log('roomServe[message.userNo]=>', roomServe);
	}

	async signin() {
		const { ctx, app } = this;
		const message = ctx.args[0];
		console.log('接收登录请求', message);

		//给登录用户下发房间信息
		ctx.socket.emit('roomInfo', roomServe);

		//广播用户上线信息
		ctx.app.io.emit('welcome', message.userNo);

		allClients.push(message.userNo);

		console.log('allClients=>', allClients);
		//监听用户下线操作
		ctx.socket.on('disconnect', function() {
			console.log(`${message.userNo}is disconnect`);
			//从在线用户中移除
			let i = allClients.indexOf(message.userNo);
			allClients.splice(i, 1);
		});
	}
}

module.exports = DefaultController;
