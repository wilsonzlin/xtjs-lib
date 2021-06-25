import { expect } from "chai";
import "mocha";
import cryptoRandomInteger from "./cryptoRandomInteger";

describe("cryptoRandomInteger", () => {
  it("should generate values in the range inclusively", () => {
    for (let i = 0; i < 1e5; i++) {
      expect(cryptoRandomInteger(-2, 4)).at.least(-2).at.most(4);
    }
  }).timeout(60000);
});
