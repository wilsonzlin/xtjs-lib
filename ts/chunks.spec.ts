import { expect } from "chai";
import "mocha";
import chunks from "./chunks";

describe("chunks", () => {
  it("should chunk", () => {
    const vals = "01234567890123456789012".split("");
    expect(chunks(vals, 6)).to.deep.equal(
      ["012345", "678901", "234567", "89012"].map((s) => s.split(""))
    );
  });
});
