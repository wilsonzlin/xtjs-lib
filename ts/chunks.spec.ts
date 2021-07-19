import { expect } from "chai";
import "mocha";
import chunks from "./chunks";

describe("chunks", () => {
  it("should chunk", () => {
    const str = "01234567890123456789012";
    expect(chunks(str, 6)).to.deep.equal([
      "012345",
      "678901",
      "234567",
      "89012",
    ]);
  });
});
