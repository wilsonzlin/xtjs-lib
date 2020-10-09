import { expect } from "chai";
import "mocha";
import isSuperset from "./isSuperset";

describe("isSuperset", () => {
  it("should return true if array is a superset of other", () => {
    const superset = ["5", true, Math.PI, () => void 0, "", Symbol("cool")];
    const full = superset.slice(1, 4);
    expect(isSuperset(superset, full)).to.equal(true);
  });

  it("should return false if array is not a superset of other", () => {
    const notSuperset = ["5", true, Math.PI, () => void 0, "", Symbol("cool")];
    const full = [1, ...notSuperset, false];
    expect(isSuperset(notSuperset, full)).to.equal(false);
  });
});
