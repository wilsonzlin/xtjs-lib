import { expect } from "chai";
import "mocha";
import tokeniseForNaturalOrdering from "./tokeniseForNaturalOrdering";

describe("tokeniseForNaturalOrdering", () => {
  it("should segment into substrings and integers", () => {
    expect(tokeniseForNaturalOrdering("a12e34")).to.deep.equal([
      { segment: "a", tiebreaker: "a" },
      { segment: 12n, tiebreaker: 0n },
      { segment: "e", tiebreaker: "e" },
      { segment: 34n, tiebreaker: 0n },
    ]);
  });

  it("should normalise substrings into lowercase words and use original substring as tiebreaker", () => {
    expect(tokeniseForNaturalOrdering("Hello - World! ! 11")).to.deep.equal([
      { segment: "helloworld", tiebreaker: "Hello - World! ! " },
      { segment: 11n, tiebreaker: 0n },
    ]);
  });

  it("should only yield nonempty substrings post-normalisation even if original is nonempty", () => {
    expect(tokeniseForNaturalOrdering(" a,1: 2b3-")).to.deep.equal([
      { segment: "a", tiebreaker: " a," },
      { segment: 1n, tiebreaker: 0n },
      { segment: 2n, tiebreaker: 0n },
      { segment: "b", tiebreaker: "b" },
      { segment: 3n, tiebreaker: 0n },
    ]);
  });

  it("should use amount of leading zeroes as tiebreaker for integers", () => {
    expect(
      tokeniseForNaturalOrdering("11 00 011 0011 00011-1100")
    ).to.deep.equal([
      { segment: 11n, tiebreaker: 0n },
      { segment: 0n, tiebreaker: 2n },
      { segment: 11n, tiebreaker: 1n },
      { segment: 11n, tiebreaker: 2n },
      { segment: 11n, tiebreaker: 3n },
      { segment: 1100n, tiebreaker: 0n },
    ]);
  });
});
