import chai, {expect} from "chai";
import "mocha";
import {jogTree} from "../../main/ts/fs/tree/jogTree";
import {jogList} from "../../main/ts/fs/tree/jogList";
import {jogPaths} from "../../main/ts/fs/tree/jogPaths";
import chaiAsPromised = require("chai-as-promised");
import { IStats } from "../../main/ts/fs/IStats";
import { getStatsSync } from "../../main/ts/fs/stats/getStats";

chai.use(chaiAsPromised);

function getStatsOfPath (path: string): IStats {
  return getStatsSync({path});
}

const TEST_DIR = __dirname + "/../resources/tree";

const TREE = {
  a: {
    aa: {
      aaa: getStatsOfPath(TEST_DIR + "/a/aa/aaa"),
      aab: getStatsOfPath(TEST_DIR + "/a/aa/aab"),
      aac: {
        aaca: getStatsOfPath(TEST_DIR + "/a/aa/aac/aaca"),
      },
    },
    ab: {
      aba: getStatsOfPath(TEST_DIR + "/a/ab/aba"),
      abb: {
        abba: {
          abbaa: getStatsOfPath(TEST_DIR + "/a/ab/abb/abba/abbaa"),
        },
      },
    },
  },
  b: getStatsOfPath(TEST_DIR + "/b"),
  c: {
    ca: getStatsOfPath(TEST_DIR + "/c/ca"),
    cb: {
      cba: {
        cbaa: getStatsOfPath(TEST_DIR + "/c/cb/cba/cbaa"),
      },
      cbb: getStatsOfPath(TEST_DIR + "/c/cb/cbb"),
    },
  },
  d: {
    da: {
      daa: getStatsOfPath(TEST_DIR + "/d/da/daa"),
    },
  },
};

const FLAT = {
  "a": getStatsOfPath(TEST_DIR + "/a"),
  "a/aa": getStatsOfPath(TEST_DIR + "/a/aa"),
  "a/aa/aaa": getStatsOfPath(TEST_DIR + "/a/aa/aaa"),
  "a/aa/aab": getStatsOfPath(TEST_DIR + "/a/aa/aab"),
  "a/aa/aac": getStatsOfPath(TEST_DIR + "/a/aa/aac"),
  "a/aa/aac/aaca": getStatsOfPath(TEST_DIR + "/a/aa/aac/aaca"),
  "a/ab": getStatsOfPath(TEST_DIR + "/a/ab"),
  "a/ab/aba": getStatsOfPath(TEST_DIR + "/a/ab/aba"),
  "a/ab/abb": getStatsOfPath(TEST_DIR + "/a/ab/abb"),
  "a/ab/abb/abba": getStatsOfPath(TEST_DIR + "/a/ab/abb/abba"),
  "a/ab/abb/abba/abbaa": getStatsOfPath(TEST_DIR + "/a/ab/abb/abba/abbaa"),
  "b": getStatsOfPath(TEST_DIR + "/b"),
  "c": getStatsOfPath(TEST_DIR + "/c"),
  "c/ca": getStatsOfPath(TEST_DIR + "/c/ca"),
  "c/cb": getStatsOfPath(TEST_DIR + "/c/cb"),
  "c/cb/cba": getStatsOfPath(TEST_DIR + "/c/cb/cba"),
  "c/cb/cba/cbaa": getStatsOfPath(TEST_DIR + "/c/cb/cba/cbaa"),
  "c/cb/cbb": getStatsOfPath(TEST_DIR + "/c/cb/cbb"),
  "d": getStatsOfPath(TEST_DIR + "/d"),
  "d/da": getStatsOfPath(TEST_DIR + "/d/da"),
  "d/da/daa": getStatsOfPath(TEST_DIR + "/d/da/daa"),
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
      b: getStatsOfPath(TEST_DIR + "/b"),
      c: {
        ca: getStatsOfPath(TEST_DIR + "/c/ca"),
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
