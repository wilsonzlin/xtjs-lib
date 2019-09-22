import {Obj} from "./obj";

export function clean (): Obj {
  return Object.create(null);
}

export function regular (): Obj {
  return {};
}
