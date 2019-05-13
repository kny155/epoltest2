import Router from 'koa-router';
import convert from 'koa-convert';
import KoaBody from 'koa-body';

import users from '../models/users';

const router = new Router();
const koaBody = convert(KoaBody());

router
  .get('/users', async ctx => {
    ctx.body = await users.getAll();
  })
  .get('/users/:id', async ctx => {
    const user = await users.get(ctx.params.id);
    if (user) {
      ctx.body = user;
    } else {
      ctx.status = 204;
    }
  })
  .post('/users', koaBody, async ctx => {
    const result = await users.create(ctx.request.body);
    if (result.success) {
      ctx.status = 201;
      ctx.body = result.user;
    } else {
      ctx.status = 400;
      ctx.body = {
        message: result.message,
      };
    }
  })
  .put('/users/:id', koaBody, async ctx => {
    const result = await users.update(ctx.params.id, ctx.request.body);

    if (result.success) {
      ctx.status = 204;
    } else {
      ctx.status = 400;
      ctx.body = {
        message: result.message,
      };
    }
  })
  .delete('/users/:id', async ctx => {
    const result = await users.delete(ctx.params.id);
    if (result.success) {
      ctx.status = 204;
    } else {
      ctx.status = 400;
      ctx.body = {
        message: result.message,
      };
    }
  });

export const routes = () => router.routes();
export const allowedMethods = () => router.allowedMethods();
