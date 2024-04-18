import { expect } from "chai";
import "mocha";
import cryptoShuffleArray from "./cryptoShuffleArray";
import stringArrayEquals from "./stringArrayEquals";

const shuffle = <T>(a: Array<T>): Array<T> => cryptoShuffleArray(a.slice());

describe("stringArrayEquals", () => {
  it("should return true if both arrays have same strings", () => {
    const a = ["5", "", "", "adsf dfag", "  <script> "];
    const b = shuffle(a);
    expect(stringArrayEquals(a, b)).to.equal(true);
  });

  it("should return false if arrays have different lengths", () => {
    const a = ["5", "", "", "adsf dfag", "  <script> "];
    const b = a.slice(1);
    expect(stringArrayEquals(a, b)).to.equal(false);
  });

  it("should return false if arrays have different strings", () => {
    const a = ["5", "", "", "adsf dfag", "  <script> "];
    const b = ["5", "", "", "adsf dfag", " <script> "];
    expect(stringArrayEquals(a, b)).to.equal(false);
  });

  it("should return false if arrays don't have exactly the same strings and frequencies of them", () => {
    const a = ["5", "", "", "adsf dfag", "  <script> "];
    const b = ["5", "", "adsf dfag", "  <script> "];
    expect(stringArrayEquals(a, b)).to.equal(false);
  });
});
