import { keys, Key } from "./keys";
import { Value } from "./values";
import { Obj } from "./obj";

export type Finder<T extends Obj> = (val: Value<T>, key: Key<T>, obj: T) => boolean;

export function findKey<T extends Obj>(obj: T, finder: Finder<T>): Key<T> | undefined {
  return keys(obj).find(key => {
    return finder(obj[key], key, obj);
  });
}

export function find<T extends Obj>(obj: T, finder: Finder<T>) : Value<T> | undefined {
  let key = findKey(obj, finder);
  if (key === undefined) {
    return undefined;
  }
  return obj[key];
}
