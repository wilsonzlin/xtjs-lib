import {Key, keys} from "./keys";
import {Obj} from "./obj";

export function keep<T extends Obj> (obj: T, ...exc: Key<T>[]): number {
  let toRemove = keys(obj).filter(k => !exc.includes(k));
  return remove(obj, ...toRemove);
}

export function clear<T extends Obj> (obj: T): T {
  return obj;
}

export function remove<T extends Obj> (obj: T, ...keys: Key<T>[]): number {
  let count = 0;
  for (let k of keys) {
    count += delete obj[k] ? 1 : 0;
  }
  return count;
}
