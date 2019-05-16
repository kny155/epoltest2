import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';

import User from '../model/user';

dotenv.config();

export default passport => {
	const jwtOptions = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
		secretOrKey: process.env.TOKEN_SECRET,
	};

	passport.use(
		'jwt',
		new JwtStrategy(jwtOptions, (payload, done) => {
			User.findById(payload.id)
				.then(user => {
					return done(null, user);
				})
				.catch(error => {
					return done(error, false);
				});
		}),
	);
};
