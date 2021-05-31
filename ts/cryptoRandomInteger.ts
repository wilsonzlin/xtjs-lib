import crypto from "crypto";

// Inspired by https://stackoverflow.com/a/10984975/6249022, is uniform.
// WARNING: If changing, ensure it remains uniform!
export default (minInc: number, maxInc: number) => {
  const RAND_MAX = 2 ** 48;
  const n = maxInc - minInc + 1;

  let x;
  do {
    x = crypto.randomBytes(6).readUIntBE(0, 6);
  } while (x >= RAND_MAX - (RAND_MAX % n));
  x %= n;

  return minInc + x;
};
