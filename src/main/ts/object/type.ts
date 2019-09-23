import {Obj} from "object/obj";

export function isInstance<T extends Function> (type: T, obj: Obj): obj is T {
  return obj instanceof type;
}

export function getPrototype (obj: Obj): Function | null {
  return Object.getPrototypeOf(obj);
}

export function isPlain (obj: Obj): boolean {
  let proto = getPrototype(obj);
  return proto == Object.prototype || proto == null;
}
