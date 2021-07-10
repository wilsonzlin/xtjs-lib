type JsonValue =
  | boolean
  | null
  | number
  | string
  | { [name: string]: JsonValue }
  | JsonValue[];

const isJsonValue = (
  val: unknown,
  cfg?: {
    rejectNonFiniteNumbers?: boolean;
    useToJSON?: boolean;
  }
): val is JsonValue => {
  if (val === null) {
    return true;
  }
  const type = typeof val;
  if (type == "boolean" || type == "string") {
    return true;
  }
  if (type == "number") {
    return !cfg?.rejectNonFiniteNumbers || Number.isFinite(val);
  }
  if (Array.isArray(val)) {
    return val.every((v) => isJsonValue(v, cfg));
  }
  if (type == "object") {
    if (cfg?.useToJSON && typeof (val as any).toJSON == "function") {
      val = (val as any).toJSON();
    }
    return Object.entries(val as any).every(
      ([k, v]) => typeof k == "string" && isJsonValue(v, cfg)
    );
  }
  return false;
};

export default isJsonValue;
