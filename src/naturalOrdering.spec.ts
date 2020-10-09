import { expect } from "chai";
import "mocha";
import cryptoShuffleArray from "./cryptoShuffleArray";
import naturalOrdering from "./naturalOrdering";

const shuffle = <T>(a: T[]): T[] => cryptoShuffleArray(a.slice());

describe("naturalOrdering", () => {
  it("should order the greater amount of leading zeros first for numeric substrings with equal values", () => {
    const expected = ["0010", "010", "10"];
    const shuffled = shuffle(expected);
    expect(shuffled.sort(naturalOrdering)).to.deep.equal(expected);
  });

  it("should not consider decimal places", () => {
    const expected = ["1.01", "1.1", "1.09"];
    const shuffled = shuffle(expected);
    expect(shuffled.sort(naturalOrdering)).to.deep.equal(expected);
  });

  it("should order numbers before other characters", () => {
    const expected = [
      "a0",
      "a1",
      "a9",
      "a20",
      "a9999999999999999999999",
      "a_",
      "aa",
      "a\u{10FFFF}",
    ];
    const shuffled = shuffle(expected);
    expect(shuffled.sort(naturalOrdering)).to.deep.equal(expected);
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
    expect(shuffled.sort(naturalOrdering)).to.deep.equal(expected);
  });
});
