import { expect } from "chai";
import "mocha";
import deepEquals from "./deepEquals";
import lazyMap from "./lazyMap";

describe("lazyMap", () => {
  it("should call compute function only if value has changed", () => {
    const val = { x: 1 };
    const l = lazyMap<{ x: number }, number>();
    expect(l.map(val, (v) => v.x + 1)).to.equal(2);
    expect(l.map(val, (v) => v.x + 500)).to.equal(2);
    expect(l.map({ x: 1 }, (v) => v.x + 500)).to.equal(501);
  });

  it("should use provided function to determine if value has changed", () => {
    const val = { x: 1 };
    const l = lazyMap(deepEquals);
    expect(l.map(val, (v) => v.x + 1)).to.equal(2);
    expect(l.map(val, (v) => v.x + 500)).to.equal(2);
    expect(l.map({ x: 1 }, (v) => v.x + 500)).to.equal(2);
    expect(l.map({ x: 0 }, (v) => v.x + 500)).to.equal(500);
  });
});
