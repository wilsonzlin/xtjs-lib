export default (v: unknown): Function | null | undefined => {
  switch (typeof v) {
    case "bigint":
      return BigInt;

    case "boolean":
      return Boolean;

    case "function":
      return Function;

    case "number":
      return Number;

    case "object":
      return v && (Object.getPrototypeOf(v)?.constructor ?? Object);

    case "string":
      return String;

    case "symbol":
      return Symbol;

    case "undefined":
      return undefined;
  }
};
