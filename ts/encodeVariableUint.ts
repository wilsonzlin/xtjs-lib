import assertState from "./assertState";

export default (val: number) => {
  assertState(Number.isSafeInteger(val) && val >= 0);
  const bytes = [];
  while (val > 127) {
    bytes.push(128 | val % 128);
    val = Math.floor(val / 128);
  }
  bytes.push(val);
  return new Uint8Array(bytes);
};
