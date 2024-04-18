import isSubset from "./isSubset";

export default (sub: object, full: object) =>
  isSubset(Object.keys(sub), Object.keys(full));
