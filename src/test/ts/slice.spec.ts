import {slice} from "../../main/ts/slice";
import {expect} from "chai";
import "mocha";

describe("slice", () => {
  it("should create a shallow copy when no range arguments are provided", () => {
    let src = {
      a: 1,
      b: "2",
      c: false,
      d: undefined,
      e: {
        e1: Math.PI,
        e2: function () {},
      },
      f: [1, 2, 3],
    };

    let copy = slice(src);

    expect(copy != src);
    expect(copy).to.deep.equal(src);
    expect(copy.f != [1, 2, 3]);
    expect(copy.e == src.e);
  });

  it("should create a new object containing a subset of keys when range arguments are provided", () => {
    let src = {
      a: 1,
      b: "2",
      c: false,
      d: undefined,
      e: {
        e1: Math.PI,
        e2: function () {},
      },
      f: [1, 2, 3],
    };

    let copy = slice(src, "c", "e");

    expect(copy != src);
    expect(copy).to.deep.equal({
      c: false,
      d: undefined,
      e: {
        e1: Math.PI,
        e2: src.e.e2,
      },
    });
    expect(copy.a).to.be.undefined;
    expect(copy.b).to.be.undefined;
    expect(copy.f).to.be.undefined;
    expect(copy.e == src.e);
  });
});
