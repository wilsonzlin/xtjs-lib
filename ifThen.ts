export default (cond: any, fn: Function) => {
  if (cond) {
    fn();
    return true;
  }
  return false;
};
