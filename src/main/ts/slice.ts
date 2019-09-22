import {Key, keys} from "./keys";
import {Obj} from "./obj";

export type Partial<T extends Obj> = {
  [P in keyof T]?: T[P];
}

export function slice<T extends Obj> (obj: T): T;
export function slice<T extends Obj> (obj: T, from: Key<T>): Partial<T>;
export function slice<T extends Obj> (obj: T, from: Key<T>, to: Key<T>): Partial<T>;
export function slice<T extends Obj> (obj: T, from: Key<T>, to: Key<T>, inclusive: boolean): Partial<T>;
export function slice<T extends Obj> (obj: T, from?: Key<T>, to?: Key<T>, inclusive: boolean = true): Partial<T> {
  let k = keys(obj).sort();
  let start = from && k.indexOf(from);
  let end = to && (k.indexOf(to) + (inclusive ? 1 : 0));
  let subsetKeys = k.slice(start, end);
  let partial = Object.create(null);
  for (let s of subsetKeys) {
    partial[s] = obj[s];
  }
  return partial;
}
