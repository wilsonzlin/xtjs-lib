import { expect } from "chai";
import asyncTimeout from "./asyncTimeout";
import Batcher from "./Batcher";

describe("Batcher", () => {
  it("should batch", async () => {
    const ops = Array<string | number>();
    const batcher = new Batcher(async (vals) => {
      await asyncTimeout(100);
      return vals;
    });
    batcher.execute(0).then(() => ops.push(0));
    batcher.execute(1).then(() => ops.push(1));
    batcher.execute(2).then(() => ops.push(2));
    await asyncTimeout(100);
    ops.push("cp0");
    await asyncTimeout(500);
    ops.push("cp1");
    batcher.execute(3).then(() => ops.push(3));
    batcher.execute(4).then(() => ops.push(4));
    batcher.execute(5).then(() => ops.push(5));
    ops.push("cp2");
    await asyncTimeout(500);
    ops.push("cp3");
    expect(ops).to.deep.equal([0, "cp0", 1, 2, "cp1", "cp2", 3, 4, 5, "cp3"]);
  });
});
