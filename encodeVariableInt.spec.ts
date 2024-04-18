import { expect } from "chai";
import "mocha";
import decodeVariableInt from "./decodeVariableInt";
import encodeVariableInt from "./encodeVariableInt";

describe("encodeVariableInt", () => {
  it("encodes and decodes variably to same integer", () => {
    for (const val of [
      Number.MIN_SAFE_INTEGER,
      -4294967296,
      -4294967295,
      -3200,
      -1,
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
      4294967295,
      4294967296,
      Number.MAX_SAFE_INTEGER,
    ]) {
      expect(decodeVariableInt(encodeVariableInt(val))).to.equal(val);
    }
  });
});
