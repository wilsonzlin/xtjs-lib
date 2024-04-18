import { expect } from "chai";
import AssertionError from "./AssertionError";
import assertLength from "./assertLength";

describe("assertLength", () => {
  it("should throw when length does not match expectation", () => {
    expect(() => assertLength([1, 2], 1)).to.throw(AssertionError);
    expect(() => assertLength([1], 2)).to.throw(AssertionError);
    expect(() => assertLength([1], 0)).to.throw(AssertionError);
    expect(() => assertLength([], 1)).to.throw(AssertionError);
    expect(() => assertLength([1], 1)).to.not.throw(AssertionError);
    expect(() => assertLength([], 0)).to.not.throw(AssertionError);
  });
});
