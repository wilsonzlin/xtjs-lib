import assertByte from "./assertByte";

export default (encoded: Iterable<number>) => {
  const it = encoded[Symbol.iterator]();
  let val = 0;
  let multiplier = 1;
  while (true) {
    const byte = assertByte(it.next().value);
    val += (byte & 127) * multiplier;
    multiplier *= 128;
    if (!(byte & 128)) {
      break;
    }
  }
  return val;
};
