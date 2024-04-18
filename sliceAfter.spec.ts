import { expect } from "chai";
import sliceAfter from "./sliceAfter";

describe("spliceAfter", () => {
  it("should return the substring after the needle", () => {
    expect(sliceAfter("abcdefg", "cd")).to.equal("efg");
  });
  it("should return an empty string if the needle is not found", () => {
    expect(sliceAfter("abcdefg", "ce")).to.equal("");
  });
});
