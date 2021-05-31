import * as crypto from "crypto";

export default () => crypto.randomBytes(6).readUIntBE(0, 6) >= 140737488355328;
