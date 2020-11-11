import { expect } from "chai";
import "mocha";
import findAndRemove from "./findAndRemove";

describe("findAndRemove", () => {
  it("should return undefined if the predicate doesn't match any element", () => {
    const array = ["5", 7, 8, "5", true, Math.PI, () => void 0, false, ""];
    expect(findAndRemove(array, (val) => val === 5)).to.equal(undefined);
  });

  it("should remove and return the match with the lowest index", () => {
    const fn = () => void 0;
    const array = ["5", 7, 8, "5", true, Math.PI, fn, false, ""];
    expect(findAndRemove(array, (val) => val === "5")).to.equal("5");
    expect(array).to.deep.equal([7, 8, "5", true, Math.PI, fn, false, ""]);
  });
});
