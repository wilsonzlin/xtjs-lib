import { expect } from "chai";
import "mocha";
import bounded from "./bounded";

describe("bounded", () => {
  it("should return a value between a range inclusively", () => {
    expect(bounded(3.999, 1, 4)).to.equal(3.999);
    expect(bounded(4.00000001, 1, 4)).to.equal(4);
    expect(bounded(6, 1, 4)).to.equal(4);
    expect(bounded(5, 1, 4)).to.equal(4);
    expect(bounded(4, 1, 4)).to.equal(4);
    expect(bounded(Math.PI, 1, 4)).to.equal(Math.PI);
    expect(bounded(2, 1, 4)).to.equal(2);
    expect(bounded(0, 1, 4)).to.equal(1);
    expect(bounded(1, 1, 4)).to.equal(1);
    expect(bounded(0.999, 1, 4)).to.equal(1);
    expect(bounded(1.00001, 1, 4)).to.equal(1.00001);
    expect(bounded(1.00001, 1, 1)).to.equal(1);
  });
});
