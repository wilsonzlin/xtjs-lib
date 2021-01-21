import { expect } from "chai";
import "mocha";
import take from "./take";

describe("take", () => {
  it("should return a generator that yields n values", () => {
    const vals = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const it = vals[Symbol.iterator]();
    expect(it.next().value).to.equal(0);
    expect(it.next().value).to.equal(1);
    const taken = take(it, 5);
    expect([...taken]).to.deep.equal([2, 3, 4, 5, 6]);
  });
});
