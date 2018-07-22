import { keys, Key } from "./keys";
import { Value } from "./values";
import { Obj } from "./obj";

export type Pair<T extends Obj<any>> = [Key<T>, Value<T>];

export function pairs<T extends Obj<any>>(obj: T): Pair<T>[] {
  return keys(obj).map(k => [k, obj[k]] as Pair<T>);
}
