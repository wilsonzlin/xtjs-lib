import { values } from "./values";
import { Obj } from "./obj";

export function hasKey<T extends Obj>(obj: T, key: string | number | Symbol): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

export function hasValue<T extends Obj>(obj: T, value: any): boolean {
  return values(obj).indexOf(value) > -1;
}
