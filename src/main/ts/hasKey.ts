export default (obj: object, key: string) =>
  Object.prototype.hasOwnProperty.call(obj, key);
