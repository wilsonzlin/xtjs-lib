import { expect } from "chai";
import "mocha";
import cryptoRandomNumber from "./cryptoRandomNumber";

describe("cryptoRandomNumber", () => {
  it("should generate values in the range inclusively", () => {
    for (let i = 0; i < 2e5; i++) {
      expect(cryptoRandomNumber(-2.3, 0.7)).at.least(-2.3).at.most(0.7);
    }
  }).timeout(60000);
});
