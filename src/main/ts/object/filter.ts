import {keys} from "./keys";
import {Callback, Obj} from "./obj";

export type Filter<T extends Obj> = Callback<T, boolean>;

export function filter<T extends Obj> (obj: T, finder: Filter<T>): Partial<T> {
  let filtered: Partial<T> = {};
  keys(obj).forEach(k => {
    if (finder(obj[k], k, obj)) {
      filtered[k] = obj[k];
    }
  });
  return filtered;
}
