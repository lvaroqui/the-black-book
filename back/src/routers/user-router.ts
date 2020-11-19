import Router from 'koa-router';

import { me } from '../controllers/user-controller';

const router = new Router({ prefix: '/user' });

router.get('/me', me);

export default router;
