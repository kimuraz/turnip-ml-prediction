const consola = require('consola');
const Hapi = require('@hapi/hapi');
const HapiNuxt = require('@nuxtjs/hapi');
const HapiJwtAuth = require('hapi-auth-jwt2');
const models = require('./models');

const userRoutes = require('./controllers/user.controller');
const datasetRoutes = require('./controllers/dataset.controller');

const validateUser = async (decoded, request, h) => {
  const user = await models.User.findByPk(decoded.id);
  return { isValid: !!user, credentials: { id: user ? user.id : null } };
};

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
        return { message: 'API running' };
      },
      options: {
        auth: 'jwt'
      }
    });

  userRoutes.forEach((r) => {
    server.route(r);
  });

  datasetRoutes.forEach((r) => {
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
