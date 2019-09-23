import * as crypto from "crypto";

export const cryptoRandom = (): number => {
  // Highest value is 2 ** 32 - 1, but the upper bound is 1 exclusive,
  // so make denominator slightly higher
  return crypto.randomBytes(4).readUInt32BE(0) / 4294967296;
};
