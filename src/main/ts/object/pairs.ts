import {Key, keys} from "object/keys";
import {Obj} from "object/obj";
import {Value} from "object/values";

export type Pair<T extends Obj> = [Key<T>, Value<T>];

export function pairs<T extends Obj> (obj: T): Pair<T>[] {
  return keys(obj).map(k => [k, obj[k]] as Pair<T>);
}
