export const loadDataset = async (id) => {
  const res = await fetch('/api/v1/datasets/' + id);
  const rawDataset = await res.json();

  return rawDataset.reduce(
    (acc, dt) => {
      acc.y.push(dt.buyingPrice);
      acc.x.push(dt.sellingPrices.flat());
    },
    { x: [], y: [] }
  );
};
