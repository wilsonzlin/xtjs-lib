import {expect} from "chai";
import "mocha";
import {nullwrap} from "null/nullwrap";

function fnThatThrowsException (_: string, __: number): string {
  throw new Error();
}

function fnThatNeverThrowsException (_: string, __: number): string {
  return "abcdefg";
}

function fnThatThrowsENOENT (_: string, __: number): string {
  throw {
    code: "ENOENT",
  };
}

function fnThatThrows42_31415 (_: string, __: number): string {
  throw {
    code: 42.31415,
  };
}

describe("nullwrap", () => {
  it("should return a function that returns null instead of throwing an exception", () => {
    let wrapped = nullwrap(fnThatThrowsException);
    expect(wrapped("", 0)).to.be.null;
  });

  it("should return a function that behaves like normal when it doesn't throw an exception", () => {
    let wrapped = nullwrap(fnThatNeverThrowsException);
    expect(wrapped("", 0)).to.equal("abcdefg");
  });

  it(
    "should return a function that returns null when it throws an error object with a string `code` property when a relevant matcher is provided",
    () => {
      let wrapped = nullwrap(fnThatThrowsENOENT, "ENOENT");
      expect(wrapped("", 0)).to.be.null;
    });

  it(
    "should return a function that returns null when it throws an error object with a number `code` property when a relevant matcher is provided",
    () => {
      let wrapped = nullwrap(fnThatThrows42_31415, 42.31415);
      expect(wrapped("", 0)).to.be.null;
    });

  it("should return a function that still throws an exception when it doesn't match the provided matcher", () => {
    let wrapped = nullwrap(fnThatThrowsException, "ENOENT");
    expect(() => wrapped("", 0)).to.throw();

    expect(() => wrapped("", 0)).to.throw();
  });
});
