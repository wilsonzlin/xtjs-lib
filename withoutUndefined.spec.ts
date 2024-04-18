import { expect } from "chai";
import "mocha";
import withoutUndefined from "./withoutUndefined";

describe("withoutUndefined", () => {
  it("should return a new object with undefined properties omitted", () => {
    expect(
      withoutUndefined({
        a: undefined,
        b: 1,
      })
    ).to.deep.equal({
      b: 1,
    });
  });
});
