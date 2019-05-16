import jwt from 'jsonwebtoken';
import User from '../model/user';
import dotenv from 'dotenv';
dotenv.config();

const authConroller = {
	login: async ctx => {
		console.log(ctx);
		const obj = ctx.request.body;
		const { email, password } = obj;
		const user = await User.findOne({ email });
		if (user.password === password) {
			const token = jwt.sign(
				{ id: user._id.toString() },
				process.env.TOKEN_SECRET,
				{ expiresIn: process.env.TOKEN_LIFETIME_HOURS + 'h' },
			);
			ctx.body = {
				token: 'JWT ' + token,
			};
		} else {
			ctx.status = 401;
		}
	},
};

export default authConroller;
