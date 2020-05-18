const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');

const basePath = `${process.env.BASE_API_URL}/users`;

const saveUser = async ({ name, email, password, confirmPassword }) => {
  if (password !== confirmPassword) {
    return { code: 422, error: 'Password and confirmation must match' };
  }
  try {
    const encryptedPass = await bcrypt.hash(password, 10);
    const user = await models.User.create({
      name,
      email,
      password: encryptedPass
    });

    delete user.password;

    return { code: 201, user };
  } catch (err) {
    console.error(err);
    return { code: 500, error: err.toString() };
  }
};

const login = async ({ email, password }) => {
  try {
    const users = await models.User.findAll({ limit: 1, where: { email } });
    const user = users && users.length ? users[0] : null;
    if (await bcrypt.compare(password, user.password)) {
      const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET);

      return { code: 200, token };
    }
  } catch (err) {
    console.log(err);
    return { code: 500, error: err.toString() };
  }
};

const userRoutes = [
  {
    method: 'POST',
    path: `${basePath}/new`,
    handler: async (request, h) => {
      const { user, error, code } = await saveUser(request.payload);
      return h.response({ user, error }).code(code);
    },
    options: {
      auth: false
    }
  },
  {
    method: 'POST',
    path: `${basePath}/auth`,
    handler: async (request, h) => {
      const { token, error, code } = await login(request.payload);
      return h.response({ token, error }).code(code);
    },
    options: {
      auth: false
    }
  }
];

module.exports = userRoutes;
