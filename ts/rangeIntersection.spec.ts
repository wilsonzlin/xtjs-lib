import { expect } from "chai";
import rangeIntersection from "./rangeIntersection";

describe("rangeIntersection", () => {
  it("should determine inclusive intersection correctly", () => {
    expect(rangeIntersection([0, 1], [0, 0])).to.deep.equal([0, 0]);
    expect(rangeIntersection([0, 1], [1, 0])).to.deep.equal([0, 1]);
    expect(rangeIntersection([1, 1], [0, 0])).to.deep.equal(undefined);
    expect(rangeIntersection([-1, 5], [Infinity, 2.5])).to.deep.equal([2.5, 5]);
    expect(rangeIntersection([-1, 5], [2.5, -Infinity])).to.deep.equal([
      -1,
      2.5,
    ]);
    expect(rangeIntersection([2.501, 5], [2.5, -Infinity])).to.deep.equal(
      undefined
    );
  });
});
