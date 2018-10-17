import {Value} from "./values";
import {Key} from "./keys";

export type Obj = {
  [key: string]: any;
};

export type Callback<T extends Obj, R> = (val: Value<T>, key: Key<T>, obj: T) => R;
