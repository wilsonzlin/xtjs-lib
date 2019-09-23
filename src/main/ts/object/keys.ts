import {Obj} from "object/obj";

export type Key<T extends Obj> = (keyof T) & string;

export function keys<T extends Obj> (obj: T): Key<T>[] {
  return Object.keys(obj) as Key<T>[];
}
