import hasSameKeys from "./hasSameKeys";

export default (a: any, b: any) =>
  hasSameKeys(a, b) && Object.keys(a).every((k) => a[k] === b[k]);
