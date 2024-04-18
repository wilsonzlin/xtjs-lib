import { expect } from "chai";
import "mocha";
import cryptoShuffleArray from "./cryptoShuffleArray";
import naturalOrdering from "./naturalOrdering";
import propertyComparator from "./propertyComparator";
import tokeniseForNaturalOrdering from "./tokeniseForNaturalOrdering";

const shuffle = <T>(a: T[]): T[] => cryptoShuffleArray(a.slice());

// Use .map so that tokenisation only occurs once per value, instead of on each comparator call.
const sort = (vals: string[]) =>
  vals
    .map((str) => ({ str, tokens: tokeniseForNaturalOrdering(str) }))
    .sort(propertyComparator("tokens", naturalOrdering))
    .map(({ str }) => str);

describe("naturalOrdering", () => {
  it("should order the greater amount of leading zeros first for numeric substrings with equal values", () => {
    const expected = ["0010", "010", "10"];
    const shuffled = shuffle(expected);
    expect(sort(shuffled)).to.deep.equal(expected);
  });

  it("should not consider decimal places", () => {
    const expected = ["1.01", "1.1", "1.09"];
    const shuffled = shuffle(expected);
    expect(sort(shuffled)).to.deep.equal(expected);
  });

  it("should only consider alphabetic characters case-insensitively", () => {
    const expected = ["a  a", "aB", "a\t, C", "A-cc"];
    const shuffled = shuffle(expected);
    expect(sort(shuffled)).to.deep.equal(expected);
  });

  it("should not collapse separated numbers", () => {
    const expected = ["x 01", "x 1", "x 1-3", "X-12"];
    const shuffled = shuffle(expected);
    expect(sort(shuffled)).to.deep.equal(expected);
  });

  it("should order numbers before other characters", () => {
    const expected = [
      // Since non-alphabetic characters are ignored,
      // the following two are considered as "a", which is why they're ahead.
      "a_",
      "a\u{10FFFF}",
      "a0",
      "a1",
      "a9",
      "a020",
      "a20",
      "a9999999999999999999999",
      "A_a",
      "Aa",
      "aa",
    ];
    const shuffled = shuffle(expected);
    expect(sort(shuffled)).to.deep.equal(expected);
  });

  it("should compare using original substring of last segment only if all segments are equal", () => {
    const expected = [
      "123AAA",
      "123AAa",
      "000123A_AA",
      " 123A_Aa",
      "123A_aA",
      "0123Aa A",
      "???123Aa_A",
      "123Aa_a",
    ];
    const shuffled = shuffle(expected);
    expect(sort(shuffled)).to.deep.equal(expected);
  });

  it("should sort strings using numerical order", () => {
    const expected = [
      "a",
      "a1",
      "a2",
      "a2a001",
      "a2a1",
      "a2a2",
      "a2a0010",
      "a2a010",
      "a2a10",
      "a2a10.0",
      "a2a10.01",
      "a2a10.1",
      "a2a10.09",
      "a2a10.9",
      "a2a10.10",
      "a2a10.89",
      "a2a11",
      "a2a20",
      "a2a100",
      "a2a101",
      "a2aa",
      "a10",
      "a11",
    ];
    const shuffled = shuffle(expected);
    expect(sort(shuffled)).to.deep.equal(expected);
  });
});
