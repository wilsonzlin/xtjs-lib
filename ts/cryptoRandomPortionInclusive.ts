import * as crypto from "crypto";

export default () => crypto.randomBytes(4).readUInt32BE(0) / 4294967295;
