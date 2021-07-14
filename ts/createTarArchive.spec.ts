import { expect } from "chai";
import { mkdir, readFile, writeFile } from "fs/promises";
import "mocha";
import { join } from "path";
import createTarAchive from "./createTarArchive";
import cryptoRandomHex from "./cryptoRandomHex";
import encodeUtf8 from "./encodeUtf8";
import exec from "./exec";

describe("createTarArchive", () => {
  it("should create valid .tar files", async () => {
    const outDir = `/tmp/test.${cryptoRandomHex()}`;
    const outTar = `${outDir}.tar`;
    await mkdir(outDir);
    await writeFile(
      outTar,
      createTarAchive([
        { name: "a.txt", content: encodeUtf8("abc") },
        { name: "73.xbm/gz", content: encodeUtf8("123") },
      ])
    );
    await exec("tar", "-xf", outTar, "-C", outDir).run();
    expect(await readFile(join(outDir, "a.txt"), "utf8")).to.equal("abc");
    expect(await readFile(join(outDir, "73.xbm/gz"), "utf8")).to.equal("123");
  }).timeout(1000);
});
