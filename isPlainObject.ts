export default (obj: unknown) => {
  if (typeof obj != "object" || !obj) {
    return false;
  }
  const proto = Object.getPrototypeOf(obj);
  return proto == Object.prototype || proto == null;
};
