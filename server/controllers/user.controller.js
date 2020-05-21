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
    const user = await models.User.findOne({ limit: 1, where: { email } });

    if (!user) return { code: 401, error: 'Invalid credentials' };

    if (await bcrypt.compare(password, user.password)) {
      const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET);

      return { code: 200, token };
    } else {
      return { code: 401, error: 'Invalid credentials' };
    }
  } catch (err) {
    console.log(err);
    return { code: 500, error: err.toString() };
  }
};

const profile = async (userId) => {
  try {
    const user = await models.User.findByPk(userId);
    if (!user) return { code: 404, error: 'User not found' };

    const { name, email } = user;

    return { code: 200, user: { name, email } };
  } catch (err) {
    console.log(err);
    return { code: 500, error: err.toString() };
  }
};

exports.validateUser = async (decoded, request, h) => {
  const isValid = !!(await models.User.findByPk(decoded.id));
  return { isValid };
};

const userRoutes = [
  {
    method: 'POST',
    path: basePath,
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
  },
  {
    method: 'GET',
    path: `${basePath}/profile`,
    handler: async (request, h) => {
      const { user, error, code } = await profile(request.auth.credentials.id);
      return h.response({ user, error }).code(code);
    },
    options: {
      auth: 'jwt'
    }
  }
];

module.exports = userRoutes;
