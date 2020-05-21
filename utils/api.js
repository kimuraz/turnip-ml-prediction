const getToken = () => (process.server ? '' : localStorage.getItem('token'));

const headers = {
  'Content-Type': 'application/json',
  Authorization: getToken()
};

export const loadDatasetList = async () => {
  const res = await fetch('/api/v1/datasets', {
    method: 'GET',
    headers
  });

  const { datasets } = await res.json();

  return datasets;
};

export const loadDataset = async (id) => {
  const res = await fetch('/api/v1/datasets/' + id, {
    method: 'GET',
    headers
  });
  const { dataset } = await res.json();

  return dataset.dataset.reduce(
    (acc, dt) => {
      acc.y.push(dt.buyingPrice);
      acc.x.push(dt.sellingPrices.flat());
      return acc;
    },
    { x: [], y: [] }
  );
};

export const newUser = async (newUser) => {
  const res = await fetch('/api/v1/users', {
    method: 'POST',
    headers,
    body: JSON.stringify(newUser)
  });

  const { user, error } = await res.json();
  if (error) throw new Error(error);
  return user;
};

export const login = async (credentials) => {
  const res = await fetch('/api/v1/users/auth', {
    method: 'POST',
    headers,
    body: JSON.stringify(credentials)
  });
  const { token, error } = await res.json();
  if (error) throw new Error(error);
  localStorage.setItem('token', token);
  return token;
};

export const getProfile = async () => {
  const res = await fetch('/api/v1/users/profile', {
    method: 'GET',
    headers
  });
  const { user } = await res.json();

  return user;
};
