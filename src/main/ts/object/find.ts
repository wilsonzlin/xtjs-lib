import {Key, keys} from "object/keys";
import {Callback, Obj} from "object/obj";
import {Value} from "object/values";

export type Finder<T extends Obj> = Callback<T, boolean>;

export function findKey<T extends Obj> (obj: T, finder: Finder<T>): Key<T> | undefined;
export function findKey<T extends Obj, D> (obj: T, finder: Finder<T>, def: D): Key<T> | D;
export function findKey<T extends Obj, D> (obj: T, finder: Finder<T>, def?: D): Key<T> | D | undefined {
  let find = keys(obj).find(key => {
    return finder(obj[key], key, obj);
  });
  if (find === undefined) {
    return def;
  }
  return find;
}

export function find<T extends Obj, D> (obj: T, finder: Finder<T>,): Value<T> | undefined;
export function find<T extends Obj, D> (obj: T, finder: Finder<T>, def: D): Value<T> | D;
export function find<T extends Obj, D> (obj: T, finder: Finder<T>, def?: D): Value<T> | D | undefined {
  let key = findKey(obj, finder);
  if (key === undefined) {
    return def;
  }
  return obj[key];
}
