import { expect } from "chai";
import "mocha";
import conditionComparator from "./conditionComparator";
import nativeOrdering from "./nativeOrdering";
import reversedComparator from "./reversedComparator";

describe("conditionComparator", () => {
  it("should order values that pass the predicate before values that do not", () => {
    const pred = (x: number) => x >= 3;
    const vals = [0, 5, 1, 4, 4, 2, 1, 3, 2, 3, 0];
    vals.sort(conditionComparator(pred, reversedComparator(nativeOrdering)));
    // Array.prototype.sort does stable sorting as of ES2019.
    expect(vals).to.deep.equal([5, 4, 4, 3, 3, 0, 1, 2, 1, 2, 0]);
  });
});
