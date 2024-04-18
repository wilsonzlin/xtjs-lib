import { expect } from "chai";
import "mocha";
import decodeVariableBigInt from "./decodeVariableBigInt";
import encodeVariableBigInt from "./encodeVariableBigInt";

describe("encodeVariableBigInt", () => {
  it("encodes and decodes variably to same bigint", () => {
    for (const val of [
      -18446744073709551620n,
      -18446744073709551616n,
      -18446744073709551615n,
      -3200n,
      -1n,
      0n,
      1n,
      5n,
      33n,
      63n,
      64n,
      127n,
      128n,
      190n,
      191n,
      192n,
      73000n,
      340282366920938463463374607431768211456n,
    ]) {
      expect(decodeVariableBigInt(encodeVariableBigInt(val))).to.equal(val);
    }
  });
});
