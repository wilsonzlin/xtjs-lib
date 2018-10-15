import { stringsArrayEquals } from "../eq/array";

// Can't create compareKeys function as keys may not be
// direct subsets/supersets of each other
export function sameKeys(a: any, b: any): boolean {
  let A = Object.keys(a);
  let B = Object.keys(b);

  return stringsArrayEquals(A, B);
}

export function subsetKeys(a: any, b: any): boolean {
  let A = Object.keys(a);
  let B = Object.keys(b);

  return A.every(ka => B.indexOf(ka) > -1);
}

export function supersetKeys(a: any, b: any): boolean {
  let A = Object.keys(a);
  let B = Object.keys(b);

  return B.every(kb => A.indexOf(kb) > -1);
}
