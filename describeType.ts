export default function describeType(val: unknown): string {
  const typ = typeof val;
  if (typ != "object") {
    return typ;
  }
  if (val === null) {
    return "null";
  }
  const proto = Object.getPrototypeOf(val);
  if (proto === null || typeof proto != "object") {
    return `object with ${describeType(proto)} prototype`;
  }
  const clsName = proto.constructor?.name;
  if (typeof clsName == "string") {
    return clsName;
  }
  return `object`;
}
