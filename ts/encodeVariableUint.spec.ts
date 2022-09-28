import { expect } from "chai";
import "mocha";
import decodeVariableUint from "./decodeVariableUint";
import encodeVariableUint from "./encodeVariableUint";

describe("encodeVariableUint", () => {
  it("encodes and decodes variably to same unsigned integer", () => {
    for (const val of [
      0,
      1,
      5,
      33,
      63,
      64,
      127,
      128,
      190,
      191,
      192,
      73000,
      248567,
      1234567,
      4294967295,
      4294967296,
      Number.MAX_SAFE_INTEGER,
    ]) {
      expect(decodeVariableUint(encodeVariableUint(val))).to.equal(val);
    }
  });
});
