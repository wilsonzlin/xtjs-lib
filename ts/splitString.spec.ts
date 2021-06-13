import { expect } from "chai";
import splitString from "./splitString";

describe("splitString", () => {
  it("should return an empty array if string is empty, regardless of split", () => {
    expect(splitString("", "a")).to.deep.equal([]);
  });
  it("should have any leftover characters in the last part when a limit is specified", () => {
    expect(splitString("ab.cde.fg.h..", ".", 0)).to.deep.equal([]);
    expect(splitString("ab.cde.fg.h..", ".", 1)).to.deep.equal([
      "ab.cde.fg.h..",
    ]);
    expect(splitString("ab.cde.fg.h..", ".", 2)).to.deep.equal([
      "ab",
      "cde.fg.h..",
    ]);
    expect(splitString("ab.cde.fg.h..", ".", 3)).to.deep.equal([
      "ab",
      "cde",
      "fg.h..",
    ]);
    expect(splitString("ab.cde.fg.h..", ".", 4)).to.deep.equal([
      "ab",
      "cde",
      "fg",
      "h..",
    ]);
    expect(splitString("ab.cde.fg.h..", ".", 5)).to.deep.equal([
      "ab",
      "cde",
      "fg",
      "h",
      ".",
    ]);
    expect(splitString("ab.cde.fg.h..", ".", 6)).to.deep.equal([
      "ab",
      "cde",
      "fg",
      "h",
      "",
      "",
    ]);
    expect(splitString("ab.cde.fg.h..", ".", 7)).to.deep.equal([
      "ab",
      "cde",
      "fg",
      "h",
      "",
      "",
    ]);
    expect(splitString("ab.cde.fg.h..", ".", 8)).to.deep.equal([
      "ab",
      "cde",
      "fg",
      "h",
      "",
      "",
    ]);
    expect(splitString("ab.cde.fg.h..", ".")).to.deep.equal([
      "ab",
      "cde",
      "fg",
      "h",
      "",
      "",
    ]);
  });
});
