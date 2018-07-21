import * as fs from "fs";
import {jogTree} from "../../main/ts/Jogger";
import chai, {expect} from "chai";
import "mocha";
import chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const TREE_DIR = __dirname + "/../resources/tree";

const TREE = {
  a: {
    aa: {
      aaa: fs.lstatSync(TREE_DIR + "/a/aa/aaa"),
      aab: fs.lstatSync(TREE_DIR + "/a/aa/aab"),
      aac: {
        aaca: fs.lstatSync(TREE_DIR + "/a/aa/aac/aaca"),
      },
    },
    ab: {
      aba: fs.lstatSync(TREE_DIR + "/a/ab/aba"),
      abb: {
        abba: {
          abbaa: fs.lstatSync(TREE_DIR + "/a/ab/abb/abba/abbaa"),
        },
      },
    },
  },
  b: fs.lstatSync(TREE_DIR + "/b"),
  c: {
    ca: fs.lstatSync(TREE_DIR + "/c/ca"),
    cb: {
      cba: {
        cbaa: fs.lstatSync(TREE_DIR + "/c/cb/cba/cbaa"),
      },
      cbb: fs.lstatSync(TREE_DIR + "/c/cb/cbb"),
    },
  },
  d: {
    da: {
      daa: fs.lstatSync(TREE_DIR + "/d/da/daa"),
    },
  },
};

describe("jogTree", () => {
  it("should traverse tree recursively and completely", () => {
    return expect(jogTree({dir: TREE_DIR})).to.eventually.deep.equal(TREE);
  });

  it("should use null as tips for folders when depth is non-infinite", () => {
    return expect(jogTree({dir: TREE_DIR, depth: 2})).to.eventually.deep.equal({
      a: {
        aa: null,
        ab: null,
      },
      b: fs.lstatSync(TREE_DIR + "/b"),
      c: {
        ca: fs.lstatSync(TREE_DIR + "/c/ca"),
        cb: null,
      },
      d: {
        da: null,
      },
    });
  });
});
