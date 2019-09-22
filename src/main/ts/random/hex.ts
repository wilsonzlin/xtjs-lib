import * as crypto from "crypto";

export function cryptoRandomHex (entropy: number = 8): string {
  if (entropy < 1) {
    return "";
  }

  return crypto.randomBytes(entropy).toString("hex");
}
