export default async <V>(it: AsyncIterable<V>) => {
  const res = [];
  for await (const v of it) {
    res.push(v);
  }
  return res;
};
