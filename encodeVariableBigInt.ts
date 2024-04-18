export default (val: bigint) => {
  const isNegative = val < 0;
  if (isNegative) {
    val = -val;
  }
  const bytes = [];
  const first6 = Number(BigInt.asUintN(6, val));
  if (val < 64n) {
    bytes.push((isNegative ? 128 : 0) | first6);
  } else {
    bytes.push((isNegative ? 128 : 0) | 64 | first6);
    val >>= 6n;
    while (val > 127n) {
      bytes.push(128 | Number(BigInt.asUintN(7, val)));
      val >>= 7n;
    }
    bytes.push(Number(val));
  }
  return new Uint8Array(bytes);
};
