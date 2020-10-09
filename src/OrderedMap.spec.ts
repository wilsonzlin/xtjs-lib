import { expect } from "chai";
import "mocha";
import OrderedMap from "./OrderedMap";

describe("OrderedMap", () => {
  it("should iterate entries in the order they were added", () => {
    const expected = [
      ["b", 3],
      ["a", 1],
      [true, 4],
      [
        function() {
          console.log("hello");
        },
        () => {
          console.error("bye");
        }
      ],
      ["_", { a: console.log }],
      [3.14, Number.MAX_SAFE_INTEGER]
    ];

    const map = new OrderedMap();
    for (const pair of expected) {
      map.set(pair[0], pair[1]);
    }

    expect(Array.from(map.entries())).to.deep.equal(expected);
  });

  it("should take initial values via constructor", () => {
    const expected: Array<any> = [
      ["b", 3],
      ["a", 1],
      [true, 4],
      [
        function() {
          console.log("hello");
        },
        () => {
          console.error("bye");
        }
      ],
      ["_", { a: console.log }],
      [3.14, Number.MAX_SAFE_INTEGER]
    ];

    const map = new OrderedMap<any, any>(expected);

    expect(Array.from(map.entries())).to.deep.equal(expected);
  });

  it("should not reorder keys for setting existing keys", () => {
    const values = [
      ["b", 3],
      ["a", 1],
      ["b", 2]
    ];

    const expected = [
      ["b", 2],
      ["a", 1]
    ];

    const map = new OrderedMap();
    for (const pair of values) {
      map.set(pair[0], pair[1]);
    }

    expect(Array.from(map.entries())).to.deep.equal(expected);
  });

  it("should be a subtype of Map", () => {
    const map = new OrderedMap();
    expect(map).to.be.an.instanceOf(Map);
  });
});
