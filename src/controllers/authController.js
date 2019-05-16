import jwt from 'jsonwebtoken';
import User from '../model/user';
import {TOKEN_LIFETIME_HOURS, TOKEN_SECRET} from '../../config.json'

const authConroller = {
	login: async ctx => {
		const obj = ctx.request.body;
		const { email, password } = obj;
		const user = await User.findOne({ email });
		if (user.password === password) {
			const token = jwt.sign(
				{ id: user._id.toString() },
				TOKEN_SECRET,
				{ expiresIn: TOKEN_LIFETIME_HOURS + 'h' },
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
