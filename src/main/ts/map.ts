import {Callback, Obj} from "./obj";
import {Value} from "./values";
import {Pair} from "./pairs";
import {Key, keys} from "./keys";
import {regular} from "./create";

export type PairMapper<T extends Obj> = Callback<T, Pair<any>>;
export type KeyMapper<T extends Obj> = Callback<T, Value<any>>;
export type ValueMapper<T extends Obj> = Callback<T, Key<any>>;

export function map<T extends Obj> (obj: T, mapper: PairMapper<T>): Obj {
  return keys(obj).reduce((res, sk) => {
    let [rk, rv] = mapper(obj[sk], sk, obj);
    res[rk] = rv;
    return res;
  }, regular());
}

export function mapKeys<T extends Obj> (obj: T, mapper: KeyMapper<T>): Obj {
  return keys(obj).reduce((res, sk) => {
    let rv = mapper(obj[sk], sk, obj);
    res[sk] = rv;
    return res;
  }, regular());
}

export function mapValues<T extends Obj> (obj: T, mapper: ValueMapper<T>): Obj {
  return keys(obj).reduce((res, sk) => {
    let rk = mapper(obj[sk], sk, obj);
    res[rk] = obj[sk];
    return res;
  }, regular());
}
