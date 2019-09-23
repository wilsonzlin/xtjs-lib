import {Obj} from "object/obj";
import {values} from "object/values";

export function hasKey<T extends Obj> (obj: T, key: any): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

export function hasValue<T extends Obj> (obj: T, value: any): boolean {
  return values(obj).indexOf(value) > -1;
}
