import * as crypto from "crypto";

export function cryptoRandom01 (): number {
  let bytes = crypto.randomBytes(4);

  let uint32 = new DataView(bytes.buffer).getUint32(0);

  // Highest value is 2 ** 32 - 1, but the upper bound is 1 exclusive,
  // so make denominator slightly higher
  return uint32 / (2 ** 32);
}
