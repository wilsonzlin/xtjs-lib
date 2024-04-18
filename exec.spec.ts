import chai, { expect } from "chai";
import "mocha";
import { PassThrough } from "stream";
import asyncTimeout from "./asyncTimeout";
import exec from "./exec";
import ExecError from "./ExecError";
import chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe("exec", () => {
  it("writes string stream to stdin and reads stdout correctly", async () => {
    const stdin = new PassThrough();
    stdin.write("a");
    stdin.write("b");
    stdin.write("cde");
    const outPromise = exec("cat").stdin(stdin).output();
    stdin.write("fg");
    stdin.end();
    expect(await outPromise).to.equal("abcdefg");
  });

  it("writes Buffer stream to stdin and reads stdout correctly", async () => {
    const stdin = new PassThrough();
    stdin.write(Buffer.from([0, 1]));
    stdin.write(Buffer.from([2]));
    const outPromise = exec("cat").stdin(stdin).output();
    stdin.write(Buffer.from([3, 4]));
    stdin.write(Buffer.from(Buffer.from([5])));
    stdin.end();
    expect(await outPromise).to.equal(
      Buffer.from([0, 1, 2, 3, 4, 5]).toString()
    );
  });

  it("writes string to stdin and reads stdout correctly", async () => {
    const outPromise = exec("cat").stdin("hello").output();
    expect(await outPromise).to.equal("hello");
  });

  it("writes bytes to stdin and reads stdout correctly", async () => {
    const bytes = [0, 1, 2, 128, 150, 177, 200, 247, 255];
    const outPromise = exec(
      "node",
      "-e",
      "process.stdout.write(fs.readFileSync(0))"
    )
      .stdin(new Uint8Array(bytes))
      .output();
    expect(await outPromise).to.equal(Buffer.from(bytes).toString());
  });

  it("writes bytes to stdin and receives status correctly", async () => {
    const outPromise = exec(
      "sh",
      "-c",
      'bytes="$(cat)"; if [ "$bytes" = "!-E" ]; then exit 23; fi'
    )
      .stdin(new Uint8Array([33, 45, 69]))
      .status();
    expect(await outPromise).to.equal(23);
  });

  it("should return only stdout as string when called with .output()", async () => {
    expect(
      await exec(
        "node",
        "-e",
        `console.log("a"); console.error("b"); console.log("c");`
      ).output()
    ).to.equal(["a", "c", ""].join("\n"));
  });

  it("should return stdout and stderr interleaved as string when called with .output(true)", async () => {
    expect(
      await exec(
        "node",
        "-e",
        // Use setTimeout to prevent race conditions.
        `console.log("a"); setTimeout(() => console.error("b"), 500); setTimeout(() => console.log("c"), 1000);`
      )
        .text()
        .output(true)
    ).to.equal(["a", "b", "c", ""].join("\n"));
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
          expect(chunk).to.equal((onStdoutInvokeNo++ == 0 ? "a" : "c") + "\n")
        )
        .output()
    ).to.equal(["a", "c", ""].join("\n"));
    await asyncTimeout(1000);
    expect(onStdoutInvokeNo).to.equal(2);
  });

  it("should work with multiple concurrent calls", async () => {
    expect(
      await Promise.all([
        // Can't use /bin/true because it doesn't exist on macOS.
        exec("bash", "-c", "exit 0").status(),
        // Can't use /bin/false because it doesn't exist on macOS.
        exec("bash", "-c", "exit 2").status(),
        exec("head", "-c", 10, "/dev/zero").output(),
        exec("head").stdin("abcdef").output(),
        exec("printenv", "A").env("A", "b").output(),
        exec("sleep", 1).run(),
        exec("sleep", 2).run(),
        exec("sleep", 4).run(),
      ])
    ).to.deep.equal([
      0,
      2,
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
