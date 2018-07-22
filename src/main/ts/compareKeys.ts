import { keys } from "./keys";
import { Obj } from "./obj";

// Can't create compareKeys function as keys may not be
// direct subsets/supersets of each other

export function sameKeys(a: Obj<any>, b: Obj<any>): boolean {
  // TODO Use external library
  let A = keys(a).sort();
  let B = keys(b).sort();
  return A.length === B.length &&
    A.every((ka, i) => B[i] === (ka as any));
}

export function subsetKeys(a: Obj<any>, b: Obj<any>): boolean {
  let A = keys(a);
  let B = keys(b);

  return A.every(ka => B.indexOf(ka) > -1);
}

export function supersetKeys(a: Obj<any>, b: Obj<any>): boolean {
  let A = keys(a);
  let B = keys(b);

  return B.every(kb => A.indexOf(kb) > -1);
}
