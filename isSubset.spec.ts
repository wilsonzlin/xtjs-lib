import { expect } from "chai";
import "mocha";
import isSubset from "./isSubset";

describe("isSubset", () => {
  it("should return true if array is a subset of other", () => {
    const subset = ["5", true, Math.PI, () => void 0];
    const full = ["5", 7, 8, ...subset, false, ""];
    expect(isSubset(subset, full)).to.equal(true);
  });

  it("should return false if array is not a subset of other", () => {
    const notSubset = ["5", true, Math.PI, () => void 0];
    const full = [7, 8, ...notSubset.slice(1), false, ""];
    expect(isSubset(notSubset, full)).to.equal(false);
  });
});
