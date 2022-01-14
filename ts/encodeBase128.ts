import last from "./last";

export default (data: Uint8Array) => {
  const encoded = new Uint8Array(Math.ceil((8 / 7) * data.byteLength));
  let next = 0;
  let carryBits = 0;
  for (let i = 0; i < data.byteLength; i++) {
    carryBits = i % 7;
    encoded[next++] =
      ((data[i - 1] << (7 - carryBits)) & 0x7f) | (data[i] >>> (carryBits + 1));
    if (carryBits == 6) {
      encoded[next++] = data[i] & 0x7f;
    }
  }
  if (carryBits != 6) {
    encoded[next] = (last(data) << (7 - carryBits - 1)) & 0x7f;
  }
  return encoded;
};
