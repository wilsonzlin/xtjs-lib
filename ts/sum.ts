export default (vals: Iterable<number>) => {
  let total = 0;
  for (const v of vals) {
    total += v;
  }
  return total;
};
