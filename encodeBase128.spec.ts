import { expect } from "chai";
import "mocha";
import encodeBase128 from "./encodeBase128";

const b = (...bytes: number[]) => new Uint8Array(bytes);

describe("encodeBase128", () => {
  it("should encode correctly", () => {
    expect(encodeBase128(b())).to.deep.equal(b());
    expect(encodeBase128(b(0))).to.deep.equal(b(0, 0));
    expect(encodeBase128(b(63))).to.deep.equal(b(31, 64));
    expect(encodeBase128(b(64))).to.deep.equal(b(32, 0));
    expect(encodeBase128(b(127))).to.deep.equal(b(63, 64));
    expect(encodeBase128(b(128))).to.deep.equal(b(64, 0));
    expect(encodeBase128(b(255))).to.deep.equal(b(127, 64));
    expect(encodeBase128(b(0, 0))).to.deep.equal(b(0, 0, 0));
    expect(
      encodeBase128(b(0b0000_0011, 0b0000_1110, 0b0000_1111))
    ).to.deep.equal(
      b(0b0_0000_001, 0b0_1_0000_11, 0b0_10_0000_1, 0b0_111_0000)
    );
    expect(encodeBase128(b(255, 255, 255, 255, 255))).to.deep.equal(
      b(127, 127, 127, 127, 127, 0b0_11111_00)
    );
  });
});
