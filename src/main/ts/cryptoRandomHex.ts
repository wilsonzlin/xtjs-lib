import * as crypto from "crypto";

export default (entropy: number = 8) =>
  entropy < 1 ? "" : crypto.randomBytes(entropy).toString("hex");
