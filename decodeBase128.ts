export default (encoded: Uint8Array) => {
  const decoded = new Uint8Array(Math.floor((7 / 8) * encoded.byteLength));
  let next = 0;
  for (let i = 0; i < encoded.byteLength - 1; i++) {
    const carryBits = i % 8;
    if (carryBits != 7) {
      decoded[next++] =
        (encoded[i] << (carryBits + 1)) |
        (encoded[i + 1] >>> (7 - carryBits - 1));
    }
  }
  return decoded;
};
