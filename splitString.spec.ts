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

    expect(
      splitString("  a \t  b  c  \v\r   d   e \n", /\s+/, 0)
    ).to.deep.equal([]);
    expect(
      splitString("  a \t  b  c  \v\r   d   e \n", /\s+/, 1)
    ).to.deep.equal(["  a \t  b  c  \v\r   d   e \n"]);
    expect(
      splitString("  a \t  b  c  \v\r   d   e \n", /\s+/, 2)
    ).to.deep.equal(["", "a \t  b  c  \v\r   d   e \n"]);
    expect(
      splitString("  a \t  b  c  \v\r   d   e \n", /\s+/, 3)
    ).to.deep.equal(["", "a", "b  c  \v\r   d   e \n"]);
    expect(
      splitString("  a \t  b  c  \v\r   d   e \n", /\s+/, 4)
    ).to.deep.equal(["", "a", "b", "c  \v\r   d   e \n"]);
    expect(
      splitString("  a \t  b  c  \v\r   d   e \n", /\s+/, 5)
    ).to.deep.equal(["", "a", "b", "c", "d   e \n"]);
    expect(
      splitString("  a \t  b  c  \v\r   d   e \n", /\s+/, 6)
    ).to.deep.equal(["", "a", "b", "c", "d", "e \n"]);
    expect(
      splitString("  a \t  b  c  \v\r   d   e \n", /\s+/, 7)
    ).to.deep.equal(["", "a", "b", "c", "d", "e", ""]);
    expect(
      splitString("  a \t  b  c  \v\r   d   e \n", /\s+/, 8)
    ).to.deep.equal(["", "a", "b", "c", "d", "e", ""]);
    expect(splitString("  a \t  b  c  \v\r   d   e \n", /\s+/)).to.deep.equal([
      "",
      "a",
      "b",
      "c",
      "d",
      "e",
      "",
    ]);
  });
});
