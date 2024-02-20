import { expect } from "chai";
import "mocha";
import binarySearchIndex from "./binarySearchIndex";

describe("binarySearchIndex", () => {
  it("should search correctly", () => {
    expect(binarySearchIndex([5, 13, 27], 0)).to.deep.equal([false, 0]);
    expect(binarySearchIndex([5, 13, 27], 4.99)).to.deep.equal([false, 0]);
    expect(binarySearchIndex([5, 13, 27], 5)).to.deep.equal([true, 0]);
    expect(binarySearchIndex([5, 13, 27], 6)).to.deep.equal([false, 1]);
    expect(binarySearchIndex([5, 13, 27], 12)).to.deep.equal([false, 1]);
    expect(binarySearchIndex([5, 13, 27], 13)).to.deep.equal([true, 1]);
    expect(binarySearchIndex([5, 13, 27], 13.0001)).to.deep.equal([false, 2]);
    expect(binarySearchIndex([5, 13, 27], 27)).to.deep.equal([true, 2]);
    expect(binarySearchIndex([5, 13, 27], 27.0001)).to.deep.equal([false, 3]);
    expect(binarySearchIndex([5, 13, 27], 28)).to.deep.equal([false, 3]);
    expect(
      binarySearchIndex([5, 13, 27], Number.MAX_SAFE_INTEGER)
    ).to.deep.equal([false, 3]);

    expect(binarySearchIndex([], Number.MIN_SAFE_INTEGER)).to.deep.equal([
      false,
      0,
    ]);
    expect(binarySearchIndex([], 0)).to.deep.equal([false, 0]);
    expect(binarySearchIndex([], Number.MAX_SAFE_INTEGER)).to.deep.equal([
      false,
      0,
    ]);

    expect(binarySearchIndex([0], Number.MIN_SAFE_INTEGER)).to.deep.equal([
      false,
      0,
    ]);
    expect(binarySearchIndex([0], -1)).to.deep.equal([false, 0]);
    expect(binarySearchIndex([0], 0)).to.deep.equal([true, 0]);
    expect(binarySearchIndex([0], 1)).to.deep.equal([false, 1]);
  });
});
