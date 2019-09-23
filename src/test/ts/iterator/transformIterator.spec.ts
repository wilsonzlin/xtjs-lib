import {expect} from "chai";
import "mocha";
import {transformIterator} from "../../../main/ts/iterator/transformIterator";

describe("transformIterator", () => {
  it(
    "should create an iterator that results in numbers from an iterator of a number strings array using parseInt as the transformer",
    () => {
      let src = ["0", "1", "2", "3", "4", "5"];
      let srcIt = src[Symbol.iterator]();
      let transformer = Number.parseInt;
      let trIt = transformIterator(srcIt, transformer);
      expect([...trIt]).to.deep.equal([
        0, 1, 2, 3, 4, 5,
      ]);
      expect(trIt.next().done);
    });
});
