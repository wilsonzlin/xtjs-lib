import { expect } from "chai";
import "mocha";
import cryptoRandomFloat from "./cryptoRandomFloat";

describe("cryptoRandomFloat", () => {
  it("should generate DP FP bit patterns that are not NaN or +/-Infinity", () => {
    for (let i = 0; i < 1e5; i++) {
      const number = cryptoRandomFloat();
      expect(number).to.not.be.NaN;
      expect(Number.isFinite(number)).to.be.true;
    }
  }).timeout(60000);

  it("should generate numbers that are absolute between MIN_VALUE and MAX_VALUE (inclusive)", () => {
    for (let i = 0; i < 1e5; i++) {
      const number = Math.abs(cryptoRandomFloat());
      expect(number)
        .to.be.gte(Number.MIN_VALUE)
        .and.to.be.lte(Number.MAX_VALUE);
    }
  }).timeout(60000);
});
