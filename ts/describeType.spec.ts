import { expect } from "chai";
import "mocha";
import describeType from "./describeType";

describe("describeType", () => {
  it("should determine class instance type name", () => {
    class AClass {}

    expect(describeType(new AClass())).to.equal("AClass");
    expect(describeType([1, "2", true])).to.equal("Array");
    expect(describeType(Buffer.alloc(4))).to.equal("Buffer");
    expect(describeType(new Date())).to.equal("Date");
    expect(describeType({})).to.equal("Object");
    expect(describeType(new Uint8Array(4))).to.equal("Uint8Array");
  });
  it("should determine primitive type", () => {
    expect(describeType(3n)).to.equal("bigint");
    expect(describeType(true)).to.equal("boolean");
    expect(describeType(() => {})).to.equal("function");
    expect(describeType(null)).to.equal("null");
    expect(describeType(1)).to.equal("number");
    expect(describeType(Object.create(null))).to.equal(
      "object with null prototype"
    );
    expect(describeType("")).to.equal("string");
    expect(describeType(Symbol())).to.equal("symbol");
    expect(describeType(undefined)).to.equal("undefined");
  });
});
