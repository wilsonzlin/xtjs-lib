import {pairs} from "./pairs";
import {Key} from "./keys";
import {Obj} from "./obj";
import {hasKey} from "./has";

export function update<T extends Obj, U extends Obj> (obj: T, upd: U): T & U {
  pairs(upd).forEach(([key, value]) => {
    if (value === undefined) {
      delete obj[key];
    } else {
      obj[key] = value;
    }
  });
  return obj as (T & U);
}

export function setIfExists<T extends Obj> (obj: T, key: Key<T>, value: any): boolean {
  if (hasKey(obj, key)) {
    obj[key] = value;
    return true;
  }
  return false;
}

export function setIfNotExists<T extends Obj> (obj: T, key: Key<T>, value: any): boolean {
  if (!hasKey(obj, key)) {
    obj[key] = value;
    return true;
  }
  return false;
}
