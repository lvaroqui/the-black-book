import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Middleware } from 'koa';

import User from '../entity/User';
import userRepository from '../repository/UserRepository';

const SECRET = 'secret';

const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 12);
};

export const register: Middleware = async (ctx, _next) => {
  // Register user in database
  const user = new User();
  user.email = ctx.request.body.email;
  user.username = ctx.request.body.username;
  user.passwordHash = await hashPassword(ctx.request.body.password);
  console.log(user.email, user.username);
  await userRepository().save(user);

  ctx.status = 200;
};

export const login: Middleware = async (ctx, _next) => {
  // Check user
  const user = await userRepository().findOne({
    username: ctx.request.body.username,
  });

  if (!user) {
    ctx.status = 400;
    return;
  }

  if (!(await bcrypt.compare(ctx.request.body.password, user.passwordHash))) {
    ctx.status = 400;
    return;
  }

  const token = jwt.sign({ id: user.id }, SECRET);
  ctx.cookies.set('Authorization', token, {
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
  });
  ctx.status = 200;
};

export const authenticate: Middleware = async (ctx, next) => {
  const cookie = ctx.cookies.get('Authorization');

  if (!cookie) {
    ctx.status = 401;
    return;
  }

  let token: { id: string };

  try {
    token = jwt.verify(cookie, SECRET) as { id: string };
  } catch (error) {
    ctx.cookies.set('Authorization');
    ctx.status = 401;
    return;
  }

  const user = await userRepository().findOne(token.id);

  if (!user) {
    ctx.cookies.set('Authorization');
    ctx.status = 401;
    return;
  }

  ctx.user = user;
  await next();
};
