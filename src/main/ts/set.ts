import { pairs } from "./pairs";
import { Key } from "./keys";
import { Obj } from "./obj";

export function update<T extends Obj<any>, U extends Obj<any>>(obj: T, upd: U): T & U {
  pairs(upd).forEach(([key, value]) => {
    if (value === undefined) {
      delete obj[key as Key<T>];
    } else {
      obj[key as Key<T>] = value;
    }
  });
  return obj as (T & U);
}
