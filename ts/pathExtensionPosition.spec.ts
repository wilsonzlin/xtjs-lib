import { expect } from "chai";
import pathExtensionPosition from "./pathExtensionPosition";

describe("pathExtensionPosition", () => {
  it("returns the index of the dot of the extension", () => {
    expect(pathExtensionPosition(".")).to.equal(0);
    expect(pathExtensionPosition(".c")).to.equal(0);
    expect(pathExtensionPosition("a.")).to.equal(1);
    expect(pathExtensionPosition("a.c")).to.equal(1);
  });

  it("returns -1 when there's no extension", () => {
    expect(pathExtensionPosition("")).to.equal(-1);
    expect(pathExtensionPosition("a")).to.equal(-1);
  });

  it("should get the extension of the last component only", () => {
    expect(pathExtensionPosition("/a.b/")).to.equal(-1);
    expect(pathExtensionPosition("/a.b/..d")).to.equal(6);
    expect(pathExtensionPosition("/a.b/.c.d")).to.equal(7);
    expect(pathExtensionPosition("/a.b/.d")).to.equal(5);
    expect(pathExtensionPosition("/a.b/c")).to.equal(-1);
    expect(pathExtensionPosition("/a.b/c.d")).to.equal(6);
    expect(pathExtensionPosition("/a.b/c.d")).to.equal(6);
    expect(pathExtensionPosition("/a.b/c.d.e")).to.equal(8);
    expect(pathExtensionPosition("a.b/")).to.equal(-1);
    expect(pathExtensionPosition("a.b/.c")).to.equal(4);
    expect(pathExtensionPosition("a.b/c.")).to.equal(5);
    expect(pathExtensionPosition("a.b/c.d")).to.equal(5);
  });
});
