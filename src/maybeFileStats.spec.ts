import chai, { expect } from "chai";
import { statSync } from "fs";
import maybeFileStats from "./maybeFileStats";
import chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe("maybeFileStats", () => {
  it("should resolve to null for non-existent files", () => {
    return expect(maybeFileStats("./non.existent.file")).to.eventually.equal(undefined);
  });
  it("should reject for errors other than ENOENT", () => {
    return expect(maybeFileStats("\0")).to.eventually.be.rejected;
  });
  it("should resolve to a Stats object for an existing file", () => {
    return expect(maybeFileStats(__filename)).to.eventually.deep.equal(
      statSync(__filename)
    );
  });
});
