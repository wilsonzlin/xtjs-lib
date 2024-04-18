import { expect } from "chai";
import "mocha";
import slices from "./slices";

describe("slices", () => {
  it("should slice", () => {
    const str = "01234567890123456789012";
    expect(slices(str, 6)).to.deep.equal([
      "012345",
      "678901",
      "234567",
      "89012",
    ]);
  });
});
