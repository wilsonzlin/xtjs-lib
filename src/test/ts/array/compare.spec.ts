import {subsetArray, supersetArray} from "array/compare";
import {expect} from "chai";
import "mocha";

describe("subsetArray", () => {
  it("should return true if array is a subset of other", () => {
    let subset = [
      "5",
      true,
      Math.PI,
      () => void 0,
    ];
    let full = ["5", 7, 8, ...subset, false, ""];
    expect(subsetArray(subset, full)).to.equal(true);
  });

  it("should return false if array is not a subset of other", () => {
    let notSubset = [
      "5",
      true,
      Math.PI,
      () => void 0,
    ];
    let full = [7, 8, ...notSubset.slice(1), false, ""];
    expect(subsetArray(notSubset, full)).to.equal(false);
  });
});

describe("supersetArray", () => {
  it("should return true if array is a superset of other", () => {
    let superset = [
      "5",
      true,
      Math.PI,
      () => void 0,
      "",
      Symbol("cool"),
    ];
    let full = superset.slice(1, 4);
    expect(supersetArray(superset, full)).to.equal(true);
  });

  it("should return false if array is not a superset of other", () => {
    let notSuperset = [
      "5",
      true,
      Math.PI,
      () => void 0,
      "",
      Symbol("cool"),
    ];
    let full = [1, ...notSuperset, false];
    expect(supersetArray(notSuperset, full)).to.equal(false);
  });
});
