import { Middleware } from 'koa';

export const me: Middleware = async (ctx, _next) => {
  ctx.status = 200;
  const user = ctx.user;
  delete user.passwordHash;
  ctx.body = user;
};
