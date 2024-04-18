import { expect } from "chai";
import "mocha";
import zip from "./zip";

describe("zip", () => {
  it("should return a generator with the correct elements every iteration", () => {
    const z = zip([1, 2], ["a", "b"]);
    expect(z.next()).to.deep.equal({
      done: false,
      value: [1, "a"],
    });
    expect(z.next()).to.deep.equal({
      done: false,
      value: [2, "b"],
    });
    expect(z.next()).to.deep.equal({
      done: true,
      value: undefined,
    });
  });
});
