import Router from 'koa-router';
import passport from 'koa-passport';

import { authController, userController } from '../controllers';

const auth = (ctx, next) =>
	passport.authenticate('jwt', { session: false }, async (err, user) => {
		if (user === false) {
			ctx.throw(401);
		}
		await next(ctx);
	})(ctx);

const router = new Router();

router
	.get('/users', auth, userController.read)
	.get('/users/:id', auth, userController.readById)
	.post('/users', auth, userController.create)
	.put('/users/:id', auth, userController.update)
	.delete('/users/:id', auth, userController.delete)
	.post('/login', authController.login)
	.get('/relogin', authController.relogin);

export const routes = () => router.routes();
export const allowedMethods = () => router.allowedMethods();
