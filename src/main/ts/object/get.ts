import {Obj} from "./obj";
import {hasKey} from "./has";
import {Key} from "./keys";

export function get<T extends Obj, K extends Key<T>> (obj: T, key: K): T[K];
export function get<T extends Obj, K extends Key<T>, D> (obj: T, key: K, def: D): T[K] | D;
export function get<T extends Obj, K extends Key<T>, D> (obj: T, key: K, def?: D): T[K] | D {
  if (!hasKey(obj, key)) {
    if (arguments.length > 2) {
      return def!;
    }
    throw new ReferenceError(`${key} does not exist`);
  }
  return obj[key];
}

export function dig<T extends Obj, R> (obj: T, path: string): R {
  let components = path.split(".");
  let val: any = obj;
  while (components.length) {
    val = val[components.shift()!];
  }
  return val;
}

export function digSafe<T extends Obj, R> (obj: T, path: string): R | undefined {
  let components = path.split(".");
  let val: any = obj;
  while (components.length) {
    val = val[components.shift()!];
    if (val === undefined) {
      return undefined;
    }
  }
  return val;
}

export function digNullSafe<T extends Obj, R> (obj: T, path: string): R | null {
  let components = path.split(".");
  let val: any = obj;
  while (components.length) {
    val = val[components.shift()!];
    if (val == undefined) {
      return null;
    }
  }
  return val;
}
