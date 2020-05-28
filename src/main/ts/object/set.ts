import {hasKey} from 'object/has';
import {Key} from 'object/keys';
import {Obj} from 'object/obj';
import {pairs} from 'object/pairs';

export function update<T extends Obj, U extends Obj> (obj: T, upd: U): T & U {
  const updated = obj as (T & U);
  pairs(upd).forEach(([key, value]) => {
    if (value === undefined) {
      delete updated[key];
    } else {
      updated[key] = value;
    }
  });
  return updated;
}

export function set<T extends Obj> (obj: T, key: Key<T>, value: any): void {
  obj[key] = value;
}

export function setIfExists<T extends Obj> (obj: T, key: Key<T>, value: any): boolean {
  if (hasKey(obj, key)) {
    obj[key] = value;
    return true;
  }
  return false;
}

export function computeIfAbsent<T extends Obj> (obj: T, key: Key<T>, value: (k: Key<T>, obj: T) => any): boolean {
  if (!hasKey(obj, key)) {
    obj[key] = value(key, obj);
    return true;
  }
  return false;
}

export function setIfAbsent<T extends Obj> (obj: T, key: Key<T>, value: any): boolean {
  if (!hasKey(obj, key)) {
    obj[key] = value;
    return true;
  }
  return false;
}
