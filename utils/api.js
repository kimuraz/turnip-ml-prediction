const getToken = () => localStorage.getItem('token');

export const loadDataset = async (id) => {
  const res = await fetch('/api/v1/datasets/' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken()
    }
  });
  const rawDataset = await res.json();

  return rawDataset.dataset.reduce(
    (acc, dt) => {
      acc.y.push(dt.buyingPrice);
      acc.x.push(dt.sellingPrices.flat());
    },
    { x: [], y: [] }
  );
};

export const login = async (credentials) => {
  const res = await fetch('/api/v1/users/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });
  const { token, error } = await res.json();
  if (error) throw new Error(error);
  localStorage.setItem('token', token);
  return token;
};
