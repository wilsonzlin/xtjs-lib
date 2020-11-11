import { expect } from "chai";
import "mocha";
import findAllAndRemove from "./findAllAndRemove";

describe("findAllAndRemove", () => {
  it("should return an empty array if the predicate doesn't match any element", () => {
    const array = ["5", 7, 8, "5", true, Math.PI, () => void 0, false, ""];
    expect(findAllAndRemove(array, (val) => val === 5)).to.deep.equal([]);
  });

  it("should remove and return all matches", () => {
    const fn = () => void 0;
    const array = ["5", 7, 8, "5", true, Math.PI, fn, false, ""];
    expect(
      findAllAndRemove(array, (val) => typeof val == "number")
    ).to.deep.equal([7, 8, Math.PI]);
    expect(array).to.deep.equal(["5", "5", true, fn, false, ""]);
  });
});
