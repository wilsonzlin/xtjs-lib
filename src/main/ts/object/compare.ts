import {subsetArray, supersetArray} from "array/compare";
import {stringArrayEquals} from "array/equals";

// Can't create compareKeys function as keys may not be
// direct subsets/supersets of each other
export function sameKeys (a: any, b: any): boolean {
  let A = Object.keys(a);
  let B = Object.keys(b);

  return stringArrayEquals(A, B);
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
