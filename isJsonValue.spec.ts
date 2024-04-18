import { expect } from "chai";
import isJsonValue from "./isJsonValue";

describe("isJsonValue", () => {
  it("should recursively check", () => {
    expect(isJsonValue(1)).to.be.true;
    expect(isJsonValue(NaN)).to.be.true;
    expect(isJsonValue(Infinity)).to.be.true;
    expect(isJsonValue("a")).to.be.true;
    expect(isJsonValue(null)).to.be.true;
    expect(isJsonValue(undefined)).to.be.false;
    expect(isJsonValue(3n)).to.be.false;
    expect(isJsonValue(Symbol())).to.be.false;
    expect(isJsonValue(Function)).to.be.false;
    expect(isJsonValue(() => void 0)).to.be.false;
    expect(isJsonValue([1])).to.be.true;
    expect(isJsonValue([1, 3n])).to.be.false;
    expect(isJsonValue({ a: 1 })).to.be.true;
    expect(
      isJsonValue({
        a: {
          b: [
            "",
            {
              c: {
                toJSON() {
                  return 3;
                },
              },
            },
          ],
        },
      })
    ).to.be.false;
  });

  it("should reject +/-Infinity and NaN when configured to do so", () => {
    expect(isJsonValue([3.14, Infinity], { rejectNonFiniteNumbers: true })).to
      .be.false;
    expect(
      isJsonValue(
        {
          a: {
            b: [
              "",
              {
                c: {
                  NaN,
                },
              },
            ],
          },
        },
        { rejectNonFiniteNumbers: true }
      )
    ).to.be.false;
  });

  it("should use toJSON when available if allowed", () => {
    expect(
      isJsonValue(
        {
          a: {
            b: [
              "",
              {
                c: {
                  toJSON() {
                    return 3;
                  },
                },
              },
            ],
          },
        },
        { useToJSON: true }
      )
    ).to.be.true;
  });
});
