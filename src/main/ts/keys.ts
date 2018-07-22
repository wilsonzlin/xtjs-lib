import { Obj } from "./obj";

export type Key<T extends Obj<any>> = keyof T;

export function keys<T extends Obj<any>>(obj: T): Key<T>[] {
  return Object.keys(obj) as Key<T>[];
}
