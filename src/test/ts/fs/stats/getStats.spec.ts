import chai, { expect } from "chai";
import { statSync } from "fs";
import { nullStat } from "fs/stats/getStats";
import chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe("nullStat", () => {
  it("should resolve to null for non-existent files", () => {
    return expect(nullStat("./non.existent.file")).to.eventually.equal(null);
  });
  it("should reject for errors other than ENOENT", () => {
    return expect(nullStat("\0")).to.eventually.be.rejected;
  });
  it("should resolve to a Stats object for an existing file", () => {
    return expect(nullStat(__filename)).to.eventually.deep.equal(
      statSync(__filename)
    );
  });
});
