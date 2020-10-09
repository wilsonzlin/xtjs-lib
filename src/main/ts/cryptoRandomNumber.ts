import * as crypto from "crypto";

export default () => {
  let float: number;
  do {
    let bytes = crypto.randomBytes(8);
    float = new DataView(bytes.buffer).getFloat64(0);
  } while (!Number.isFinite(float));
  return float;
};
