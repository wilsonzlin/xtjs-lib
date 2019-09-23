import * as crypto from "crypto";

export function cryptoRandom01 (): boolean {
  return crypto.randomBytes(4).readUInt32BE(0) >= 2147483648;
}
