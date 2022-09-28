import assertByte from "./assertByte";

export default (encoded: Iterable<number>) => {
  const it = encoded[Symbol.iterator]();
  const firstByte = assertByte(it.next().value);
  const isNegative = !!(firstByte & 128);
  let val = firstByte & 63;
  // Don't use bitwise operators, as they only support 32-bit integers.
  let multiplier = 64;
  if (!!(firstByte & 64)) {
    while (true) {
      const byte = assertByte(it.next().value);
      val += (byte & 127) * multiplier;
      multiplier *= 128;
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
