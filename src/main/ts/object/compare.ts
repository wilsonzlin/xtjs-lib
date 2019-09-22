import {stringsArrayEquals} from "../array/equals";
import {subsetArray, supersetArray} from "../array/compare";

// Can't create compareKeys function as keys may not be
// direct subsets/supersets of each other
export function sameKeys (a: any, b: any): boolean {
  let A = Object.keys(a);
  let B = Object.keys(b);

  return stringsArrayEquals(A, B);
}

export function subsetKeys (a: any, b: any): boolean {
  let A = Object.keys(a);
  let B = Object.keys(b);

  return subsetArray(A, B);
}

export function supersetKeys (a: any, b: any): boolean {
  let A = Object.keys(a);
  let B = Object.keys(b);

  return supersetArray(A, B);
}
