import { expect } from "chai";
import "mocha";
import errorWrapped from "./errorWrapped";

function fnThatThrowsException(_: string, __: number): string {
  throw new Error();
}

function fnThatNeverThrowsException(_: string, __: number): string {
  return "abcdefg";
}

function fnThatThrowsENOENT(_: string, __: number): string {
  throw {
    code: "ENOENT",
  };
}

function fnThatThrows42_31415(_: string, __: number): string {
  throw {
    code: 42.31415,
  };
}

describe("errorWrapped", () => {
  it("should return a function that returns undefined instead of throwing an exception", () => {
    const wrapped = errorWrapped(fnThatThrowsException);
    expect(wrapped("", 0)).to.be.undefined;
  });

  it("should return a function that behaves like normal when it doesn't throw an exception", () => {
    const wrapped = errorWrapped(fnThatNeverThrowsException);
    expect(wrapped("", 0)).to.equal("abcdefg");
  });

  it("should return a function that returns undefined when it throws an error object with a string `code` property when a relevant matcher is provided", () => {
    const wrapped = errorWrapped(fnThatThrowsENOENT, "ENOENT");
    expect(wrapped("", 0)).to.be.undefined;
  });

  it("should return a function that returns undefined when it throws an error object with a number `code` property when a relevant matcher is provided", () => {
    const wrapped = errorWrapped(fnThatThrows42_31415, 42.31415);
    expect(wrapped("", 0)).to.be.undefined;
  });

  it("should return a function that still throws an exception when it doesn't match the provided matcher", () => {
    const wrapped = errorWrapped(fnThatThrowsException, "ENOENT");
    expect(() => wrapped("", 0)).to.throw();
  });
});
