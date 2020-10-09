export default (obj: object, ...keys: string[]) => {
  let count = 0;
  for (const k of keys) {
    count += delete obj[k] ? 1 : 0;
  }
  return count;
};
