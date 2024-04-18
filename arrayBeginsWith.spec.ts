import { expect } from "chai";
import "mocha";
import arrayBeginsWith from "./arrayBeginsWith";

describe("arrayBeginsWith", () => {
  it("should correctly match prefixes", () => {
    expect(arrayBeginsWith([], [])).to.be.true;
    expect(arrayBeginsWith([], [1])).to.be.false;
    expect(arrayBeginsWith([1, 2, 3], [])).to.be.true;
    expect(arrayBeginsWith([1, 2, 3], [1])).to.be.true;
    expect(arrayBeginsWith([1, 2, 3], [1, 2])).to.be.true;
    expect(arrayBeginsWith([1, 2, 3], [1, 2, 3])).to.be.true;
    expect(arrayBeginsWith([1, 2, 3], [1, "2", 3])).to.be.false;
    expect(arrayBeginsWith([1, 2, 3], [1, 2, 4])).to.be.false;
    expect(arrayBeginsWith([1, 2, 3], [1, 2, 3, 4])).to.be.false;
    expect(arrayBeginsWith([1, 2, 3], [1, 3, 4])).to.be.false;
    expect(arrayBeginsWith([1, 2, 3], [1, 3])).to.be.false;
    expect(arrayBeginsWith([1, 2, 3], [2, 3])).to.be.false;
  });
});
