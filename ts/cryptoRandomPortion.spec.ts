import { expect } from "chai";
import "mocha";
import cryptoRandomPortion from "./cryptoRandomPortion";

describe("cryptoRandomPortion", () => {
  it("should generate values in the range [0, 1)", () => {
    for (let i = 0; i < 1e5; i++) {
      expect(cryptoRandomPortion()).at.least(0).lessThan(1);
    }
  }).timeout(60000);
});
