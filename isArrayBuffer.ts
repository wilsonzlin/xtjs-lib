// We use duck typing `instanceof ArrayBuffer` doesn't always work.
// See https://github.com/nodejs/node/issues/20978 and https://github.com/feross/buffer/issues/166.
export default (val: unknown): val is ArrayBuffer =>
  typeof val == "object" &&
  !!val &&
  (val instanceof ArrayBuffer ||
    (val.constructor?.name === "ArrayBuffer" &&
      typeof (val as ArrayBuffer)["byteLength"] == "number"));
