export default () =>
  globalThis.crypto.getRandomValues(new Uint32Array(1))[0] >= 2147483648;
