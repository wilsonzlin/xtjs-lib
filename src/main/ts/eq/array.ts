export function shallowArrayEquals (a: ArrayLike<any>, b: ArrayLike<any>): boolean {
  return a.length === b.length && Array.prototype.every.call(a, (v: any, i: number) => v === b[i]);
}

export function stringsArrayEquals(a: ArrayLike<string>, b: ArrayLike<string>): boolean {
  if (a.length !== b.length) {
    return false;
  }
  let A: string[] = Array.prototype.slice.call(a).sort();
  let B: string[] = Array.prototype.slice.call(b).sort();
  return A.every((str, i) => B[i] === str);
}
