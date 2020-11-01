import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import { createConnection } from 'typeorm';

import router from './routers';

(async function () {
  await createConnection();
})();

const app = new Koa();

app.proxy = true;

app.use(helmet());

app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3001);
