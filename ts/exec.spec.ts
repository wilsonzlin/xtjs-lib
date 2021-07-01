import { expect } from "chai";
import "mocha";
import { EOL } from "os";
import asyncTimeout from "./asyncTimeout";
import exec from "./exec";

describe("exec", () => {
  it("should return only stdout as string when called with .text().output()", async () => {
    expect(
      await exec(
        "node",
        "-e",
        `console.log("a"); console.error("b"); console.log("c");`
      )
        .text()
        .output()
    ).to.equal(["a", "c", ""].join(EOL));
  });

  it("should return stdout and stderr interleaved as string when called with .text().output(true)", async () => {
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
        .text()
        .printStdout(true)
        .onStdout((chunk) =>
          expect(chunk).to.equal((onStdoutInvokeNo++ == 0 ? "a" : "c") + EOL)
        )
        .output()
    ).to.equal(["a", "c", ""].join(EOL));
    await asyncTimeout(1000);
    expect(onStdoutInvokeNo).to.equal(2);
  });
});
