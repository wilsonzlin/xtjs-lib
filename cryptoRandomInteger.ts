import assertState from "./assertState";

// Inspired by https://stackoverflow.com/a/10984975/6249022, is uniform.
// WARNING: If changing, ensure it remains uniform!
export default (minInc: number, maxInc: number) => {
  const RAND_MAX = 2 ** 32;
  const n = maxInc - minInc + 1;
  assertState(n < RAND_MAX);

  let x;
  do {
    x = globalThis.crypto.getRandomValues(new Uint32Array(1))[0];
  } while (x >= RAND_MAX - (RAND_MAX % n));
  x %= n;

  return minInc + x;
};
