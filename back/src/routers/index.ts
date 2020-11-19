import Router from 'koa-router';

import { authenticate } from '../controllers/auth-controller';

import authRouter from './auth-router';
import userRouter from './user-router';

const router = new Router({ prefix: '/api' });

// Authentication routes
router.use(authRouter.routes());
router.use(authRouter.allowedMethods());

// Authenticate requests
router.use(authenticate);

const routers: ReadonlyArray<Router> = [userRouter];

// All other routes (require authentication)
routers.forEach((r) => {
  router.use(r.routes());
  router.use(r.allowedMethods());
});

export default router;
