import { ApolloServer } from 'apollo-server-koa';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import { createConnection } from 'typeorm';

// import { authenticate } from './controller/auth-controller';
import resolvers from './resolver';
import AuthRouter from './router/AuthRouter';
import typeDefs from './schema';

(async function () {
  await createConnection();
})();

const app = new Koa();
app.proxy = true;

if (app.env != 'development') {
  app.use(helmet());
}

app.use(bodyParser());

// Authentication
app.use(AuthRouter.routes());
app.use(AuthRouter.allowedMethods());

// app.use(authenticate);

// GraphQL
const server = new ApolloServer({ typeDefs, resolvers: resolvers as any });
app.use(server.getMiddleware({ path: '/graphql' }));

app.listen(3001, async () => {
  console.log('Listening on port 3001');
});
