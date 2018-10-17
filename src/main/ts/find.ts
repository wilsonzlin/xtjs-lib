import {Key, keys} from "./keys";
import {Value} from "./values";
import {Callback, Obj} from "./obj";

export type Finder<T extends Obj> = Callback<T, boolean>;

export function findKey<T extends Obj> (obj: T, finder: Finder<T>): Key<T> | undefined {
  return keys(obj).find(key => {
    return finder(obj[key], key, obj);
  });
}

export function find<T extends Obj> (obj: T, finder: Finder<T>): Value<T> | undefined {
  let key = findKey(obj, finder);
  if (key === undefined) {
    return undefined;
  }
  return obj[key];
}
