import { expect } from "chai";
import "mocha";
import deepEquals from "./deepEquals";

describe("deepEquals", () => {
  it("should return true if same primitive value regardless of argument order", () => {
    for (const [a, b] of [
      [1, 1],
      [NaN, NaN],
      [0, -0],
      [null, null],
      [undefined, undefined],
      ["", ""],
    ]) {
      expect(deepEquals(a, b)).to.be.true;
      expect(deepEquals(b, a)).to.be.true;
    }

    for (const [a, b] of [
      [1, 2],
      [0, "0"],
      [0, ""],
      [null, undefined],
      [null, {}],
      [{}, undefined],
      [true, false],
      [true, 1],
      [false, 0],
    ]) {
      expect(deepEquals(a, b)).to.be.false;
      expect(deepEquals(b, a)).to.be.false;
    }
  });

  it("should return true if same reference", () => {
    const fn = Function("console.log()");
    for (const [a, b] of [
      [Math, Math],
      [Function, Function],
      [fn, fn],
    ]) {
      expect(deepEquals(a, b)).to.be.true;
      expect(deepEquals(b, a)).to.be.true;
    }
  });

  it("should return true if same properties with deeply same values", () => {
    for (const [a, b] of [
      [{ a: 1 }, { a: 1 }],
      [
        [3, 5, 8],
        [3, 5, 8],
      ],
      [[1], [1]],
      // prettier-ignore
      [
        {a: 1, b: [2, [3, 4, {5: [6]}]], c: {7: true, 8: {9: {10: null}}}},
        {a: 1, b: [2, [3, 4, {5: [6]}]], c: {7: true, 8: {9: {10: null}}}},
      ],
    ]) {
      expect(deepEquals(a, b)).to.be.true;
      expect(deepEquals(b, a)).to.be.true;
    }

    for (const [a, b] of [
      [{ a: 1 }, { a: "1" }],
      [{ a: 1 }, {}],
      [{ a: 1 }, { a: 1, b: 1 }],
      [
        [3, 5],
        [3, 5, 8],
      ],
      // Double comma intentional.
      [["a", "b", , "c"], { 0: "a", 1: "b", 3: "c" }],
      [[, , , , ,], {}],
      // Triple comma intentional.
      [[, , ,], { length: 3 }],
      // prettier-ignore
      [
        {a: 1, b: [2, [3, 4, {5: [6]}]], c: {7: true, 8: {9: {10: null}}}},
        {a: 1, b: [2, [3, 4, {5: [6]}]], c: {7: true, 8: {9: {10: undefined}}}},
      ],
    ]) {
      expect(deepEquals(a, b)).to.be.false;
      expect(deepEquals(b, a)).to.be.false;
    }
  });
});
