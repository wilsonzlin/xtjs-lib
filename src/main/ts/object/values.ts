import {Key, keys} from "object/keys";
import {Obj} from "object/obj";

export type Value<T extends Obj> = T[keyof T];

export function pluck<T extends Obj, K extends Key<T>> (obj: T, ...keys: K[]): T[K][] {
  return keys.map(k => obj[k]);
}

export function pluckExcept<T extends Obj> (obj: T, ...exc: Key<T>[]): T[Key<T>][] {
  return keys(obj).filter(k => !exc.includes(k)).map(k => obj[k]);
}

export function values<T extends Obj> (obj: T): Value<T>[] {
  return keys(obj).map(k => obj[k]);
}
