import { expect } from "chai";
import maybeParseBigInt from "./maybeParseBigInt";

describe("maybeParseBigInt", () => {
  it("should parse for well-formed values", () => {
    expect(maybeParseBigInt("+32")).to.equal(32n);
    expect(maybeParseBigInt("-32")).to.equal(-32n);
    expect(maybeParseBigInt("-7860  ")).to.equal(-7860n);
    expect(maybeParseBigInt("0")).to.equal(0n);
    expect(maybeParseBigInt("01")).to.equal(1n);
    expect(maybeParseBigInt("\f\t\v \n\r-7860  ")).to.equal(-7860n);
    expect(maybeParseBigInt("\n166\t\f\v ")).to.equal(166n);
  });

  it("should return undefined for malformed values", () => {
    expect(maybeParseBigInt("- 7860  ")).to.be.undefined;
    expect(maybeParseBigInt("0 1")).to.be.undefined;
    expect(maybeParseBigInt("1e10")).to.be.undefined;
    expect(maybeParseBigInt("3.")).to.be.undefined;
    expect(maybeParseBigInt("3.0")).to.be.undefined;
    expect(maybeParseBigInt("3.1415")).to.be.undefined;
    expect(maybeParseBigInt("4.2  ")).to.be.undefined;
    expect(maybeParseBigInt("a")).to.be.undefined;
  });
});
