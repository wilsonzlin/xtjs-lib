import { expect } from "chai";
import "mocha";
import cryptoShuffleArray from "./cryptoShuffleArray";
import nativeOrdering from "./nativeOrdering";

describe("nativeOrdering", () => {
  it("should sort strings using lexicographical order", () => {
    const expected = [
      "",
      "_",
      "_0",
      "__",
      "a1",
      "a10",
      "a10.01",
      "a10.1",
      "a10.10",
      "a2",
      "before",
      "zebra",
      "\u{10FFFF}",
    ];
    const shuffled = cryptoShuffleArray(expected.slice());
    expect(shuffled.sort(nativeOrdering)).to.deep.equal(expected);
  });
});
