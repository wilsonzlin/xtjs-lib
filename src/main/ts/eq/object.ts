import { sameKeys } from "../cmp/keys";

export function shallowObjectEquals(a: any, b: any): boolean {
  return sameKeys(a, b) &&
    Object.keys(a).every(k => a[k] === b[k]);
}
