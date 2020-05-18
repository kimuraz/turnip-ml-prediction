const consola = require('consola');
const Hapi = require('@hapi/hapi');
const HapiNuxt = require('@nuxtjs/hapi');
const HapiJwtAuth = require('hapi-auth-jwt2');

const userRoutes = require('./controllers/user.controller');
const { validateUser } = require('./controllers/user.controller');

async function start() {
  const server = new Hapi.Server({
    host: process.env.HOST || '127.0.0.1',
    port: process.env.PORT || 3000
  });

  await server.register({
    plugin: HapiNuxt,
    options: {}
  });

  await server.register(HapiJwtAuth);

  server.auth.strategy('jwt', 'jwt', {
    key: process.env.JWT_SECRET,
    validate: validateUser
  });

  process.env.NODE_ENV === 'development' &&
    server.route({
      method: 'GET',
      path: '/api/v1',
      handler: (request, h) => {
        return { message: 'API up' };
      }
    });

  userRoutes.forEach((r) => {
    server.route(r);
  });

  await server.start();

  consola.ready({
    message: `Server running at: ${server.info.uri}`,
    badge: true
  });
}

process.on('unhandledRejection', (error) => consola.error(error));

start();
