import { sameKeys } from "./compareKeys";
import { keys } from "./keys";
import { Obj } from "./obj";

export function shallowEquals(a: Obj<any>, b: Obj<any>): boolean {
  return sameKeys(a, b) &&
    keys(a).every(k => a[k] === b[k]);
}
