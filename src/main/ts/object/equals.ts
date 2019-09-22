import {sameKeys} from "./compare";
import {subsetArray} from "../array/compare";

export function shallowObjectEquals (a: any, b: any): boolean {
  return sameKeys(a, b) &&
    Object.keys(a).every(k => a[k] === b[k]);
}

export function shallowSubsetObjectEquals (a: any, b: any, keys: any[]): boolean {
  let A = Object.keys(a);
  let B = Object.keys(b);

  return subsetArray(keys, A) &&
    subsetArray(keys, B) &&
    keys.every(k => a[k] === b[k]);
}
