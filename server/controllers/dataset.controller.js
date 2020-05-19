const models = require('../models');

const basePath = `${process.env.BASE_API_URL}/datasets`;

const getDatasets = async (userId, id = null) => {
  let datasets;
  try {
    if (id) {
      datasets = await models.Dataset.findOne({
        where: { authorId: userId, id }
      });
    } else {
      datasets = await models.Dataset.findAll({
        attributes: { exclude: ['dataset'] },
        where: { authorId: userId }
      });
    }
  } catch (err) {
    console.log(err);
    return { error: err, code: 500 };
  }

  if (!datasets) {
    return { code: 404, error: 'Not found' };
  }

  return { code: 200, datasets };
};

const newDataset = async (payload, userId) => {
  try {
    if (!payload.name) {
      return { code: 422, error: 'Missing field name' };
    }
    const dataset = await models.Dataset.create({
      ...payload,
      authorId: userId
    });
    return { code: 201, dataset };
  } catch (err) {
    return { error: err, code: 500 };
  }
};

const editDataset = async (payload, userId, id) => {
  try {
    const dataset = await models.Dataset.findOne({
      where: { authorId: userId, id }
    });
    dataset && (await dataset.update({ ...payload, authorId: userId }));
    return {
      code: dataset ? 200 : 404,
      dataset,
      error: dataset ? null : 'Not found'
    };
  } catch (err) {
    return { error: err, code: 500 };
  }
};

const deleteDataset = async (userId, id) => {
  try {
    const dataset = await models.Dataset.findOne({
      where: { authorId: userId, id }
    });

    if (!dataset) return { code: 404, error: 'Not found' };

    await dataset.destroy();

    return { code: 200 };
  } catch (err) {
    return { error: err, code: 500 };
  }
};

const datasetRoutes = [
  {
    method: 'POST',
    path: basePath,
    handler: async (request, h) => {
      const { dataset, error, code } = await newDataset(
        request.payload,
        request.auth.credentials.id
      );
      return h.response({ dataset, error }).code(code);
    },
    options: {
      auth: 'jwt'
    }
  },
  {
    method: 'GET',
    path: basePath,
    handler: async (request, h) => {
      const { datasets, error, code } = await getDatasets(
        request.auth.credentials.id
      );
      return h.response({ datasets, error }).code(code);
    },
    options: {
      auth: 'jwt'
    }
  },
  {
    method: 'GET',
    path: `${basePath}/{id}`,
    handler: async (request, h) => {
      const { datasets, error, code } = await getDatasets(
        request.auth.credentials.id,
        request.params.id
      );
      return h.response({ dataset: datasets, error }).code(code);
    },
    options: {
      auth: 'jwt'
    }
  },
  {
    method: 'PATCH',
    path: `${basePath}/{id}`,
    handler: async (request, h) => {
      const { dataset, error, code } = await editDataset(
        request.payload,
        request.auth.credentials.id,
        request.params.id
      );
      return h.response({ dataset, error }).code(code);
    },
    options: {
      auth: 'jwt'
    }
  },
  {
    method: 'DELETE',
    path: `${basePath}/{id}`,
    handler: async (request, h) => {
      const { error, code } = await deleteDataset(
        request.auth.credentials.id,
        request.params.id
      );
      return h.response({ error }).code(code);
    },
    options: {
      auth: 'jwt'
    }
  }
];

module.exports = datasetRoutes;
