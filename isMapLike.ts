export default (val: unknown): val is Map<unknown, unknown> =>
  typeof val == "object" &&
  !!val &&
  "clear" in val &&
  "delete" in val &&
  "forEach" in val &&
  "get" in val &&
  "has" in val &&
  "set" in val &&
  "size" in val;
