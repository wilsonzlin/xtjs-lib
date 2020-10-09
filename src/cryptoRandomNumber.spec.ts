import { expect } from "chai";
import "mocha";
import cryptoRandomNumber from "./cryptoRandomNumber";

describe("cryptoRandomNumber", () => {
  it("should generate DP FP bit patterns that are not NaN or +/-Infinity", () => {
    for (let i = 0; i < 1e5; i++) {
      const number = cryptoRandomNumber();
      expect(number).to.not.be.NaN;
      expect(Number.isFinite(number)).to.be.true;
    }
  });

  it("should generate numbers that are absolute between MIN_VALUE and MAX_VALUE (inclusive)", () => {
    for (let i = 0; i < 1e5; i++) {
      const number = Math.abs(cryptoRandomNumber());
      expect(number)
        .to.be.gte(Number.MIN_VALUE)
        .and.to.be.lte(Number.MAX_VALUE);
    }
  });
});
