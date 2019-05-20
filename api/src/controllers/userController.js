import { User } from '../model';

const userConroller = {
	read: async ctx => {
		ctx.body = await User.find();
	},
	readById: async ctx => {
		ctx.status = 200;
		ctx.body = await User.findById(ctx.params.id);
	},
	create: async ctx => {
		const user = new User(ctx.request.body);
		await user.save();
		ctx.body = user;
	},
	update: async ctx => {
		ctx.body = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body);
		ctx.status = 200;
	},
	delete: async ctx => {
		ctx.status = 200;
		ctx.body = await User.findByIdAndDelete(ctx.params.id);
	},
};

export default userConroller;
