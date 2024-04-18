import { expect } from "chai";
import isTypeof from "./isTypeof";

describe("isTypeof", () => {
  it("should return true if typeof value matches provided type", () => {
    expect(isTypeof(1, "number")).to.equal(true);
    expect(isTypeof(NaN, "number")).to.equal(true);
    expect(isTypeof(-Infinity, "number")).to.equal(true);
    expect(isTypeof(-0, "number")).to.equal(true);
    expect(isTypeof("", "string")).to.equal(true);
    expect(isTypeof("0", "string")).to.equal(true);
    expect(isTypeof("true", "string")).to.equal(true);
    expect(isTypeof("number", "string")).to.equal(true);
    expect(isTypeof(true, "boolean")).to.equal(true);
    expect(isTypeof(false, "boolean")).to.equal(true);
    expect(isTypeof(null, "object")).to.equal(true);
    expect(isTypeof(new Object(), "object")).to.equal(true);
    expect(isTypeof(Object.create(null), "object")).to.equal(true);
    expect(isTypeof([], "object")).to.equal(true);
    expect(isTypeof([][Symbol.iterator](), "object")).to.equal(true);
    expect(isTypeof({}, "object")).to.equal(true);
    expect(isTypeof(Object.prototype, "object")).to.equal(true);
    expect(isTypeof(Array.prototype, "object")).to.equal(true);
    expect(isTypeof(String.prototype, "object")).to.equal(true);
    expect(isTypeof(Number.prototype, "object")).to.equal(true);
    expect(isTypeof(Function.prototype, "function")).to.equal(true);
    expect(isTypeof(Function, "function")).to.equal(true);
    expect(isTypeof(new Function(), "function")).to.equal(true);
    expect(isTypeof(Function(), "function")).to.equal(true);
    expect(isTypeof(Function.prototype.call, "function")).to.equal(true);
    expect(isTypeof(Function.prototype.prototype, "undefined")).to.equal(true);
    expect(isTypeof(undefined, "undefined")).to.equal(true);
    expect(isTypeof(void 0, "undefined")).to.equal(true);
    expect(isTypeof([]["contains"], "undefined")).to.equal(true);
    expect(isTypeof(""["leftPad"], "undefined")).to.equal(true);
    expect(isTypeof(0n, "bigint")).to.equal(true);
  });
});
