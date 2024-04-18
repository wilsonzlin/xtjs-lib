export default () => {
  let float: number;
  do {
    const buf = new Uint8Array(8);
    globalThis.crypto.getRandomValues(buf);
    float = new Float64Array(buf.buffer, buf.byteOffset, 1)[0];
  } while (!Number.isFinite(float));
  return float;
};
