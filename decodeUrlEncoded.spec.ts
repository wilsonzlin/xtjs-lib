import { expect } from "chai";
import "mocha";
import decodeUrlEncoded from "./decodeUrlEncoded";

describe("decodedUrlEncoded", () => {
  it("should decode percent-encoded pluses to literal pluses", () => {
    expect(decodeUrlEncoded("%2b")).to.deep.equal("+");
  });

  it("should decode literal pluses to spaces", () => {
    expect(decodeUrlEncoded("+")).to.deep.equal(" ");
  });
});
