import { Obj } from "./obj";

export function dig<T extends Obj<any>, R>(obj: T, path: string): R {
  let components: string[] = path.split('.');
  let val: any = obj;
  while (components.length) {
    val = val[components.shift() as string];
  }
  return val;
}

export function digSafe<T extends Obj<any>, R>(obj: T, path: string): R | undefined {
  let components: string[] = path.split('.');
  let val: any = obj;
  while (components.length) {
    val = val[components.shift() as string];
    if (val === undefined) {
      return undefined;
    }
  }
  return val;
}
  return val;
}

export function digSafe<T extends Obj, R>(obj: T, path: string): R | undefined {
  let components = path.split('.');
  let val: any = obj;
  while (components.length) {
    val = val[components.shift()!];
    if (val === undefined) {
      return undefined;
    }
  }
  return val;
}

export function digNullSafe<T extends Obj, R>(obj: T, path: string): R | null {
  let components = path.split('.');
  let val: any = obj;
  while (components.length) {
    val = val[components.shift()!];
    if (val == undefined) {
      return null;
    }
  }
  return val;
}
