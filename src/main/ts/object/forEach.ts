import {Callback, Obj} from "object/obj";
import {pairs} from "object/pairs";

export type Iterator<T extends Obj> = Callback<T, void>;

export function forEach<T extends Obj> (obj: T, iterator: Iterator<T>): void {
  pairs(obj).forEach(([key, value]) => {
    iterator(value, key, obj);
  });
}
