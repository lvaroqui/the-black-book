import Router from 'koa-router';

import { authenticate } from '../controllers/auth-controller';

import authRouter from './auth-router';

const router = new Router({ prefix: '/api' });

// Authentication routes
router.use(authRouter.routes());
router.use(authRouter.allowedMethods());

// Authenticate requests
router.use(authenticate);

const routers: ReadonlyArray<Router> = [];

// All other routes (require authentication)
routers.forEach((router) => {
  router.use(router.routes());
  router.use(router.allowedMethods());
});

export default router;
