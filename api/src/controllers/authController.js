import jwt from 'jsonwebtoken';
import User from '../model/user';
import { TOKEN_LIFETIME_HOURS, TOKEN_SECRET } from '../../config.json';

const authConroller = {
	login: async ctx => {
		const obj = ctx.request.body;
		const { email, password } = obj;
		const user = await User.findOne({ email });
		if (user && user.password === password) {
			const token = jwt.sign({ id: user._id.toString() }, TOKEN_SECRET, {
				expiresIn: TOKEN_LIFETIME_HOURS + 'h',
			});
			ctx.body = {
				token: 'JWT ' + token,
				user: {
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					organizationName: user.organizationName,
				},
			};
		} else {
			ctx.status = 401;
		}
	},
	relogin: async ctx => {
		const token = getToken(ctx.headers);
		const { id } = await jwt.verify(token, TOKEN_SECRET);
		const user = await User.findById(id);
		if (user) {
			ctx.body = {
				user: {
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					organizationName: user.organizationName,
				},
			};
		} else {
			ctx.status = 401;
		}
	},
};

const getToken = headers => {
	if (headers && headers.authorization) {
		const parted = headers.authorization.split(' ');
		if (parted.length === 2) {
			return parted[1];
		} else {
			return null;
		}
	} else {
		return null;
	}
};

export default authConroller;
