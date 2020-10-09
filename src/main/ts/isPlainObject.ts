export default (obj: unknown): obj is object => {
  if (typeof obj != 'object' || !obj) {
    return false;
  }
  const proto = Object.getPrototypeOf(obj);
  return proto == Object.prototype || proto == null;
}
