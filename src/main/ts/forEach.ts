import {pairs} from "./pairs";
import {Callback, Obj} from "./obj";

export type Iterator<T extends Obj> = Callback<T, void>;

export function forEach<T extends Obj> (obj: T, iterator: Iterator<T>): void {
  pairs(obj).forEach(([key, value]) => {
    iterator(value, key, obj);
  });
}
