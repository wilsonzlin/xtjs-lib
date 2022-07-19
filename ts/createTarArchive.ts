import concatBuffers from "./concatBuffers";
import encodeUtf8 from "./encodeUtf8";
import { roundUp } from "./roundUp";
import splitString from "./splitString";
import sum from "./sum";

// Implementation derived from https://github.com/porsager/tarts
// and with help from https://en.wikipedia.org/wiki/Tar_(computing).

const headers = Object.entries({
  name: 100,
  mode: 8,
  uid: 8,
  gid: 8,
  size: 12,
  mtime: 12,
  chksum: 8,
  typeflag: 1,
  linkname: 100,
  magic: 6,
  version: 2,
  uname: 32,
  gname: 32,
  devmajor: 8,
  devminor: 8,
  prefix: 155,
});

const offsets: {
  [headerName: string]: number;
} = {};
headers.reduce((offset, [headerName, headerWidth]) => {
  offsets[headerName] = offset;
  return offset + headerWidth;
}, 0);

const BLKSIZE = 512;

export default (
  files: Array<{
    content: Uint8Array;
    gid?: number;
    gname?: string;
    mode?: number;
    mtime?: Date;
    name: string;
    typeflag?: string;
    uid?: number;
    uname?: string;
  }>
) =>
  concatBuffers(
    files.map((f) => {
      // TODO Check file name length after encoding.
      // TODO Other separators?
      const nameSuffixParts = splitString(f.name, "/");
      const namePrefixParts = [];
      let namePrefixCharCount = 0;
      while (
        nameSuffixParts.length > 1 &&
        namePrefixCharCount +
          (namePrefixParts.length ? 1 : 0) +
          nameSuffixParts[0].length <=
          155
      ) {
        const p = nameSuffixParts.shift()!;
        namePrefixCharCount += (namePrefixParts.length ? 1 : 0) + p.length;
        namePrefixParts.push(p);
      }

      const entry: {
        [name: string]: string | number;
      } = {
        chksum: "        ",
        gid: f.gid ?? 0,
        gname: f.gname ?? "",
        magic: "ustar",
        mode: f.mode ?? 0o777,
        mtime: Math.floor((f.mtime ?? new Date()).getTime() / 1000),
        name: nameSuffixParts.join("/"),
        prefix: namePrefixParts.join("/"),
        size: f.content.byteLength,
        typeflag: f.typeflag ?? "0",
        uid: f.uid ?? 0,
        uname: f.uname ?? "",
        version: "00",
      };

      const b = new Uint8Array(
        BLKSIZE + roundUp(f.content.byteLength, BLKSIZE)
      );

      const checksum = sum(
        headers.map(([headerName, headerWidth]) => {
          const entryVal = entry[headerName];
          if (entryVal === undefined) {
            return 0;
          }

          const value = encodeUtf8(
            typeof entryVal == "string"
              ? entryVal
              : entryVal.toString(8).padStart(headerWidth, "0")
          );

          b.set(value, offsets[headerName]);
          return sum(value);
        })
      );

      b.set(
        encodeUtf8(`${checksum.toString(8).padStart(6, "0")}\0 `),
        offsets.chksum
      );
      b.set(f.content, BLKSIZE);

      return b;
    })
  );
