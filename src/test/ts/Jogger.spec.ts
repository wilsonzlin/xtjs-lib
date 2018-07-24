import chai, {expect} from "chai";
import "mocha";
import {jogTree} from "../../main/ts/jog/jogTree";
import {jogList} from "../../main/ts/jog/jogList";
import {jogPaths} from "../../main/ts/jog/jogPaths";
import * as normstat from "normstat";
import chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

function getStatsSync (path: string): normstat.IStats {
  return normstat.getStatsSync({path});
}

const TEST_DIR = __dirname + "/../resources/tree";

const TREE = {
  a: {
    aa: {
      aaa: getStatsSync(TEST_DIR + "/a/aa/aaa"),
      aab: getStatsSync(TEST_DIR + "/a/aa/aab"),
      aac: {
        aaca: getStatsSync(TEST_DIR + "/a/aa/aac/aaca"),
      },
    },
    ab: {
      aba: getStatsSync(TEST_DIR + "/a/ab/aba"),
      abb: {
        abba: {
          abbaa: getStatsSync(TEST_DIR + "/a/ab/abb/abba/abbaa"),
        },
      },
    },
  },
  b: getStatsSync(TEST_DIR + "/b"),
  c: {
    ca: getStatsSync(TEST_DIR + "/c/ca"),
    cb: {
      cba: {
        cbaa: getStatsSync(TEST_DIR + "/c/cb/cba/cbaa"),
      },
      cbb: getStatsSync(TEST_DIR + "/c/cb/cbb"),
    },
  },
  d: {
    da: {
      daa: getStatsSync(TEST_DIR + "/d/da/daa"),
    },
  },
};

const FLAT = {
  "a": getStatsSync(TEST_DIR + "/a"),
  "a/aa": getStatsSync(TEST_DIR + "/a/aa"),
  "a/aa/aaa": getStatsSync(TEST_DIR + "/a/aa/aaa"),
  "a/aa/aab": getStatsSync(TEST_DIR + "/a/aa/aab"),
  "a/aa/aac": getStatsSync(TEST_DIR + "/a/aa/aac"),
  "a/aa/aac/aaca": getStatsSync(TEST_DIR + "/a/aa/aac/aaca"),
  "a/ab": getStatsSync(TEST_DIR + "/a/ab"),
  "a/ab/aba": getStatsSync(TEST_DIR + "/a/ab/aba"),
  "a/ab/abb": getStatsSync(TEST_DIR + "/a/ab/abb"),
  "a/ab/abb/abba": getStatsSync(TEST_DIR + "/a/ab/abb/abba"),
  "a/ab/abb/abba/abbaa": getStatsSync(TEST_DIR + "/a/ab/abb/abba/abbaa"),
  "b": getStatsSync(TEST_DIR + "/b"),
  "c": getStatsSync(TEST_DIR + "/c"),
  "c/ca": getStatsSync(TEST_DIR + "/c/ca"),
  "c/cb": getStatsSync(TEST_DIR + "/c/cb"),
  "c/cb/cba": getStatsSync(TEST_DIR + "/c/cb/cba"),
  "c/cb/cba/cbaa": getStatsSync(TEST_DIR + "/c/cb/cba/cbaa"),
  "c/cb/cbb": getStatsSync(TEST_DIR + "/c/cb/cbb"),
  "d": getStatsSync(TEST_DIR + "/d"),
  "d/da": getStatsSync(TEST_DIR + "/d/da"),
  "d/da/daa": getStatsSync(TEST_DIR + "/d/da/daa"),
};

const LIST = Object.keys(FLAT).sort();

const COMPONENTS = LIST.map(l => l.split("/"));

describe("jogTree", () => {
  it("should traverse tree recursively and completely", () => {
    return expect(jogTree({dir: TEST_DIR})).to.eventually.deep.equal(TREE);
  });

  it("should use null as tips for folders when depth is non-infinite", () => {
    return expect(jogTree({dir: TEST_DIR, depth: 2})).to.eventually.deep.equal({
      a: {
        aa: null,
        ab: null,
      },
      b: getStatsSync(TEST_DIR + "/b"),
      c: {
        ca: getStatsSync(TEST_DIR + "/c/ca"),
        cb: null,
      },
      d: {
        da: null,
      },
    });
  });
});

describe("jogList", () => {
  it("should recursively enumerate folder entries completely into a flat list of relative paths", () => {
    return expect(jogList({dir: TEST_DIR})).to.eventually.deep.equal(LIST);
  });

  it("should only return paths to a specific depth when depth is non-infinite", () => {
    return expect(jogList({dir: TEST_DIR, depth: 2})).to.eventually.deep.equal([
      "a",
      "a/aa",
      "a/ab",
      "b",
      "c",
      "c/ca",
      "c/cb",
      "d",
      "d/da",
    ]);
  });
});

describe("jogPaths", () => {
  it("should recursively enumerate folder entries completely into a flat list of components lists", () => {
    return expect(jogPaths({dir: TEST_DIR})).to.eventually.deep.equal(COMPONENTS);
  });

  it("should only return components lists to a specific depth when depth is non-infinite", () => {
    return expect(jogPaths({dir: TEST_DIR, depth: 2})).to.eventually.deep.equal([
      ["a"],
      ["a", "aa"],
      ["a", "ab"],
      ["b"],
      ["c"],
      ["c", "ca"],
      ["c", "cb"],
      ["d"],
      ["d", "da"],
    ]);
  });
});
