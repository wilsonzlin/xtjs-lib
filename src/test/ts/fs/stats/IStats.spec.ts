import { expect } from "chai";
import { convertFromFS } from "fs/stats/IStats";
import "mocha";

describe("convertFromFS", () => {
  it("should create an object of type IStats from an existing fs.Stats object with correctly copied values", () => {
    let mockFS = {
      isBlockDevice: () => false,
      isCharacterDevice: () => false,
      isDirectory: () => true,
      isFIFO: () => false,
      isFile: () => false,
      isSocket: () => false,
      isSymbolicLink: () => false,
      dev: 64769,
      mode: 16877,
      nlink: 24,
      uid: 0,
      gid: 0,
      rdev: 0,
      blksize: 4096,
      ino: 2,
      size: 4096,
      blocks: 8,
      atimeMs: 1532227616089.6577,
      mtimeMs: 1532227615945.6343,
      ctimeMs: 1532227615945.6343,
      birthtimeMs: 1532227615945.6343,
      atime: new Date("2018-07-22T02:46:56.090Z"),
      mtime: new Date("2018-07-22T02:46:55.946Z"),
      ctime: new Date("2018-07-22T02:46:55.946Z"),
      birthtime: new Date("2018-07-22T02:46:55.946Z "),
    };

    let expected = {
      directory: true,
      file: false,
      blockDevice: false,
      characterDevice: false,
      FIFO: false,
      socket: false,
      symbolicLink: false,

      container: 64769,
      inode: 2,
      links: 24,

      user: 0,
      group: 0,
      device: 0,

      size: 4096,
      blockSize: 4096,
      blocks: 8,

      accessed: 1532227616089.6577,
      modified: 1532227615945.6343,
      changed: 1532227615945.6343,
      created: 1532227615945.6343,
    };

    expect(convertFromFS(mockFS)).to.deep.equal(expected);
  });
});
