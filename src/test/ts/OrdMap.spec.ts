import {expect} from "chai";
import "mocha";
import {OrdMap} from "../../main/ts/OrdMap";

describe("OrdMap", () => {
  it("should iterate entries in the order they were added", () => {
    let expected = [
      ["b", 3],
      ["a", 1],
      [true, 4],
      [function () {
        console.log("hello");
      }, () => {
        console.error("bye");
      }],
      ["_", {a: console.log}],
      [3.14, Number.MAX_SAFE_INTEGER],
    ];

    let map = new OrdMap();
    for (let pair of expected) {
      map.set(pair[0], pair[1]);
    }

    expect(Array.from(map.entries())).to.deep.equal(expected);
  });

  it("should take initial values via constructor", () => {
    let expected: Array<any> = [
      ["b", 3],
      ["a", 1],
      [true, 4],
      [function () {
        console.log("hello");
      }, () => {
        console.error("bye");
      }],
      ["_", {a: console.log}],
      [3.14, Number.MAX_SAFE_INTEGER],
    ];

    let map = new OrdMap<any, any>(expected);

    expect(Array.from(map.entries())).to.deep.equal(expected);
  });

  it("should not reorder keys for setting existing keys", () => {
    let values = [
      ["b", 3],
      ["a", 1],
      ["b", 2],
    ];

    let expected = [
      ["b", 2],
      ["a", 1],
    ];

    let map = new OrdMap();
    for (let pair of values) {
      map.set(pair[0], pair[1]);
    }

    expect(Array.from(map.entries())).to.deep.equal(expected);
  });

  it("should be a subtype of Map", () => {
    let map = new OrdMap();
    expect(map).to.be.an.instanceOf(Map);
  });
});
