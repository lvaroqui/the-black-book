import Router from 'koa-router';

import { login, register } from '../controllers/auth-controller';

const router = new Router({ prefix: '/auth' });

router.post('/register', register);
router.post('/login', login);

export default router;
