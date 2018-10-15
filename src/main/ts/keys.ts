import { Obj } from "./obj";

export type Key<T extends Obj> = keyof T;

export function keys<T extends Obj>(obj: T): Key<T>[] {
  return Object.keys(obj) as Key<T>[];
}
