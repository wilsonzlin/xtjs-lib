import chai, { expect } from "chai";
import "mocha";
import { EOL } from "os";
import asyncTimeout from "./asyncTimeout";
import exec from "./exec";
import ExecError from "./ExecError";
import chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe("exec", () => {
  it("should return only stdout as string when called with .output()", async () => {
    expect(
      await exec(
        "node",
        "-e",
        `console.log("a"); console.error("b"); console.log("c");`
      ).output()
    ).to.equal(["a", "c", ""].join(EOL));
  });

  it("should return stdout and stderr interleaved as string when called with .output(true)", async () => {
    // TODO This suffers from race conditions and ordering cannot be guaranteed.
    expect(
      await exec(
        "node",
        "-e",
        `console.log("a"); console.error("b"); console.log("c");`
      )
        .text()
        .output(true)
    ).to.equal(["a", "b", "c", ""].join(EOL));
  });

  it("should call onStdout when a handler is provided, even when printing or collecting output of stdout", async () => {
    let onStdoutInvokeNo = 0;
    expect(
      await exec(
        "node",
        "-e",
        `console.log("a"); console.error("b"); console.log("c");`
      )
        .printStdout(true)
        .onStdout((chunk) =>
          expect(chunk).to.equal((onStdoutInvokeNo++ == 0 ? "a" : "c") + EOL)
        )
        .output()
    ).to.equal(["a", "c", ""].join(EOL));
    await asyncTimeout(1000);
    expect(onStdoutInvokeNo).to.equal(2);
  });

  it("should work with multiple concurrent calls", async () => {
    expect(
      await Promise.all([
        exec("/bin/true").status(),
        exec("/bin/false").status(),
        exec("head", "-c", 10, "/dev/zero").output(),
        exec("head").stdin("abcdef").output(),
        exec("printenv", "A").env("A", "b").output(),
        exec("sleep", 1).run(),
        exec("sleep", 2).run(),
        exec("sleep", 4).run(),
      ])
    ).to.deep.equal([
      0,
      1,
      "\0".repeat(10),
      "abcdef",
      "b\n",
      undefined,
      undefined,
      undefined,
    ]);
  }).timeout(10000);

  it("should throw an error if killOnStderr and throwOnSignal are both true", async () => {
    await expect(
      exec("node", "-e", "console.error('error')")
        .killOnStderr()
        .throwOnSignal()
        .run()
    ).to.eventually.be.rejectedWith(ExecError);
  }).timeout(10000);
});
