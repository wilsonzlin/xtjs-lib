export default (it: Iterable<any>): number => {
  let count = 0;
  for (const _ of it) {
    count++;
  }
  return count;
};
