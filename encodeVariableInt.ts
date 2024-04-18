import assertState from "./assertState";

export default (val: number) => {
  assertState(Number.isSafeInteger(val), `Cannot encode non-integer: ${val}`);
  const isNegative = val < 0;
  if (isNegative) {
    val = -val;
  }
  // Don't use bitwise operators, as they only support 32-bit integers.
  const bytes = [];
  const first6 = val % 64;
  if (val < 64) {
    bytes.push((isNegative ? 128 : 0) | first6);
  } else {
    bytes.push((isNegative ? 128 : 0) | 64 | first6);
    val = Math.floor(val / 64);
    while (val > 127) {
      bytes.push(128 | val % 128);
      val = Math.floor(val / 128);
    }
    bytes.push(val);
  }
  return new Uint8Array(bytes);
};
