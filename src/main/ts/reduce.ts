import {Key, keys} from "./keys";
import {Value} from "./values";
import {Obj} from "./obj";

export type Reducer<T extends Obj, R> = (result: R, val: Value<T>, key: Key<T>, obj: T) => R;

export function reduce<T extends Obj> (obj: T, reducer: Reducer<T, Value<T>>): Value<T>;
export function reduce<T extends Obj, R> (obj: T, reducer: Reducer<T, R>, initial: R): R;
export function reduce<T extends Obj> (obj: T, reducer: Reducer<T, any>, initial?: any): any {
  return keys(obj).reduce((result, key) => {
    return reducer(result, obj[key], key, obj);
  }, initial);
}
