import {expect} from "chai";
import "mocha";
import {secureShuffle} from "array/shuffle";
import {compareNatively} from "primitive/compareNatively";

function shuffle<T> (a: Array<T>): Array<T> {
  return secureShuffle(a.slice());
}

describe("compareNatively", () => {
  it("should sort strings using lexicographical order", () => {
    let expected = [
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
      "\u{10FFFF}"
    ];
    let shuffled = shuffle(expected);
    expect(shuffled.sort(compareNatively)).to.deep.equal(expected);
  });
});
