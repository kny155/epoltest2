import Router from 'koa-router';
import convert from 'koa-convert';
import KoaBody from 'koa-body';

import userController from '../controllers/userController'

const router = new Router();
const koaBody = convert(KoaBody());


router
  .get('/users', userController.read)
  .get('/users/:id', userController.readById)
  .post('/users', koaBody, userController.create)
  .put('/users/:id', koaBody, userController.update)
  .delete('/users/:id', userController.delete);

export const routes = () => router.routes();
export const allowedMethods = () => router.allowedMethods();
