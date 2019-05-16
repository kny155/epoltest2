import Router from 'koa-router';

import passport from 'koa-passport';

import { authController, userController } from '../controllers';

const router = new Router();
const auth = passport.authenticate('jwt', { session: false });

router
	.get('/users', auth, userController.read)
	.get('/users/:id', userController.readById)
	.post('/users', userController.create)
	.put('/users/:id', auth, userController.update)
	.delete('/users/:id', auth, userController.delete)
	.post('/login', authController.login);

export const routes = () => router.routes();
export const allowedMethods = () => router.allowedMethods();
