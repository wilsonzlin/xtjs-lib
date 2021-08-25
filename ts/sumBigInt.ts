// NOTE: This can't simply be overloaded with the `sum` function. Consider: what should the return value be if iterable is empty?
export default (vals: Iterable<bigint>) => {
  let total = 0n;
  for (const v of vals) {
    total += v;
  }
  return total;
};
