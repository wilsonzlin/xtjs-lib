import { expect } from "chai";
import "mocha";
import map from "./map";

describe("map", () => {
  it("should create an iterator that results in numbers from an iterator of a number strings array using parseInt as the map function", () => {
    const src = ["0", "1", "2", "3", "4", "5"];
    const srcIt = src[Symbol.iterator]();
    const transformer = Number.parseInt;
    const trIt = map(srcIt, transformer);
    expect([...trIt]).to.deep.equal([0, 1, 2, 3, 4, 5]);
    expect(trIt.next().done);
  });
});
