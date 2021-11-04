import chai, { expect } from "chai";
import "mocha";
import concatBytes from "./concatBytes";
import chaiArrays = require("chai-arrays");

chai.use(chaiArrays);

describe("concatBytes", () => {
  it("should concatenate underlying ArrayBuffer bytes of various typed arrays", () => {
    const res = concatBytes([
      new Uint8Array([1, 2, 3]),
      new Uint8Array([4, 5, 6]),
      new ArrayBuffer(1),
      [7, 8, 9],
      new Uint16Array([10, 11, 12]),
      new Uint32Array([13]),
      new DataView(new Int16Array([-1]).buffer).buffer,
      [256, 257, 511, 512, 513],
      new Int32Array(),
      new Int32Array([-1, -2, 0]),
      [],
      Buffer.from([31, 42, 53]),
      new Uint8Array(new Uint8Array([0, 1, 2, 3, 4]).buffer, 2, 2),
    ]);

    // WARNING: The byte order is platform dependent, but this test assumes LE!
    expect([...new Uint8Array(res)]).to.be.equalTo([
      1,
      2,
      3,
      4,
      5,
      6,
      0,
      7,
      8,
      9,
      10,
      0,
      11,
      0,
      12,
      0,
      13,
      0,
      0,
      0,
      255,
      255,
      0,
      1,
      255,
      0,
      1,
      255,
      255,
      255,
      255,
      254,
      255,
      255,
      255,
      0,
      0,
      0,
      0,
      31,
      42,
      53,
      2,
      3,
    ]);
  });
});
