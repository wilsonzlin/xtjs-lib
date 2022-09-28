import assertByte from "./assertByte";

export default (encoded: Iterable<number>) => {
  const it = encoded[Symbol.iterator]();
  const firstByte = assertByte(it.next().value);
  const isNegative = !!(firstByte & 128);
  let val = BigInt(firstByte & 63);
  let ls = 6n;
  if (!!(firstByte & 64)) {
    while (true) {
      const byte = assertByte(it.next().value);
      val |= BigInt(byte & 127) << ls;
      ls += 7n;
      if (!(byte & 128)) {
        break;
      }
    }
  }
  if (isNegative) {
    val = -val;
  }
  return val;
};
