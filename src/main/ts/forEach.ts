import { Value } from "./values";
import { Key } from "./keys";
import { pairs } from "./pairs";
import { Obj } from "./obj";

export type Iterator<T extends Obj<any>> = (val: Value<T>, key: Key<T>, obj: T) => void;

export function forEach<T extends Obj<any>>(obj: T, iterator: Iterator<T>): void {
  pairs(obj).forEach(([key, value]) => {
    iterator(value, key, obj);
  });
}
