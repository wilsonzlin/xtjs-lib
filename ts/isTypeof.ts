export default <
  T extends
    | "string"
    | "number"
    | "boolean"
    | "bigint"
    | "undefined"
    | "function"
    | "object"
>(
  val: unknown,
  type: T
): val is T extends "string"
  ? string
  : T extends "number"
  ? number
  : T extends "bigint"
  ? bigint
  : T extends "undefined"
  ? undefined
  : T extends "function"
  ? Function
  : T extends "object"
  ? null | object
  : never => typeof val == type;
