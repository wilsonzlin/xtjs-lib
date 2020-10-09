import { stringArrayEquals } from "array/equals";
import { secureShuffle } from "array/shuffle";
import { expect } from "chai";
import "mocha";

function shuffle<T>(a: Array<T>): Array<T> {
  return secureShuffle(a.slice());
}

describe("stringArrayEquals", () => {
  it("should return true if both arrays have same strings", () => {
    let a = ["5", "", "", "adsf dfag", "  <script> "];
    let b = shuffle(a);
    expect(stringArrayEquals(a, b)).to.equal(true);
  });

  it("should return false if arrays have different lengths", () => {
    let a = ["5", "", "", "adsf dfag", "  <script> "];
    let b = a.slice(1);
    expect(stringArrayEquals(a, b)).to.equal(false);
  });

  it("should return false if arrays have different strings", () => {
    let a = ["5", "", "", "adsf dfag", "  <script> "];
    let b = ["5", "", "", "adsf dfag", " <script> "];
    expect(stringArrayEquals(a, b)).to.equal(false);
  });

  it("should return false if arrays don't have exactly the same strings and frequencies of them", () => {
    let a = ["5", "", "", "adsf dfag", "  <script> "];
    let b = ["5", "", "adsf dfag", "  <script> "];
    expect(stringArrayEquals(a, b)).to.equal(false);
  });
});
