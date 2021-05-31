import * as crypto from "crypto";

// Inspired by drand48.
// Alternative way is crypto_rand_inc_exc(0, 2 ** 53) / 2 ** 53, but 2 ** 53 is greater than MAX_SAFE_INTEGER.
// See more: https://lemire.me/blog/2017/02/28/how-many-floating-point-numbers-are-in-the-interval-01/
// WARNING: If changing, ensure distribution remains uniform!
export default () => {
  const out = Buffer.alloc(8);
  const rand = crypto.randomBytes(6);
  for (let i = 0; i < rand.length; i++) {
    out[i + 1] = out[i + 1] | (rand[i] >>> 4);
    out[i + 2] = out[i + 2] | (rand[i] << 4);
  }
  out[0] = 0x3f;
  out[1] |= 0xf0;
  return out.readDoubleBE(0) - 1.0;
};
