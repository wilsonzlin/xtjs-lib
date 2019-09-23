import {Key} from "object/keys";
import {Value} from "object/values";

export type Obj = {
  [key: string]: any;
};

export type Callback<T extends Obj, R> = (val: Value<T>, key: Key<T>, obj: T) => R;
